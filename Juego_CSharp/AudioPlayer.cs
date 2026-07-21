using System;
using System.Collections.Concurrent;
using System.IO;
using System.Threading.Tasks;
using NAudio.Wave;

namespace LaberintoInteractivo
{
    public class DynamicSpeedSampleProvider : ISampleProvider
    {
        private readonly ISampleProvider _sourceProvider;
        public float Speed { get; set; } = 1.0f;
        public WaveFormat WaveFormat => _sourceProvider.WaveFormat;

        private float _position = 0f;
        private float[] _sourceBuffer = new float[0];

        public DynamicSpeedSampleProvider(ISampleProvider sourceProvider)
        {
            _sourceProvider = sourceProvider;
        }

        public int Read(float[] buffer, int offset, int count)
        {
            int channels = WaveFormat.Channels;
            int framesRequired = count / channels;
            
            float currentSpeed = Speed;
            if (currentSpeed < 0.1f) currentSpeed = 0.1f;
            if (currentSpeed > 4.0f) currentSpeed = 4.0f;

            int framesToRead = (int)Math.Ceiling(framesRequired * currentSpeed) + 2;
            int samplesToRead = framesToRead * channels;

            if (_sourceBuffer.Length < samplesToRead)
            {
                _sourceBuffer = new float[samplesToRead];
            }

            int samplesRead = _sourceProvider.Read(_sourceBuffer, 0, samplesToRead);
            int framesRead = samplesRead / channels;

            if (framesRead == 0) return 0; // EOF

            int framesWritten = 0;
            for (int i = 0; i < framesRequired; i++)
            {
                int srcIndex = (int)_position;
                if (srcIndex >= framesRead)
                {
                    break;
                }

                for (int c = 0; c < channels; c++)
                {
                    buffer[offset + (framesWritten * channels) + c] = _sourceBuffer[(srcIndex * channels) + c];
                }
                framesWritten++;
                _position += currentSpeed;
            }

            _position -= framesRead;
            if (_position < 0) _position = 0;

            return framesWritten * channels;
        }
    }

    public class LoopingSampleProvider : ISampleProvider
    {
        private readonly AudioFileReader _source;
        public LoopingSampleProvider(AudioFileReader source) { _source = source; }
        public WaveFormat WaveFormat => _source.WaveFormat;
        public int Read(float[] buffer, int offset, int count)
        {
            int totalRead = 0;
            while (totalRead < count)
            {
                int read = _source.Read(buffer, offset + totalRead, count - totalRead);
                if (read == 0)
                {
                    if (_source.Length == 0) break;
                    _source.Position = 0;
                }
                totalRead += read;
            }
            return totalRead;
        }
    }

    public static class AudioPlayer
    {
        private static ConcurrentDictionary<string, WaveOutEvent> _activeDevices = new ConcurrentDictionary<string, WaveOutEvent>();
        private static ConcurrentDictionary<string, DynamicSpeedSampleProvider> _speedProviders = new ConcurrentDictionary<string, DynamicSpeedSampleProvider>();

        public static void PlaySound(string filePath, string soundId, bool loop = false)
        {
            if (!File.Exists(filePath)) return;

            StopSound(soundId);

            Task.Run(() =>
            {
                try
                {
                    var audioFile = new AudioFileReader(filePath);
                    ISampleProvider provider = audioFile;
                    if (loop) provider = new LoopingSampleProvider(audioFile);
                    
                    var speedProvider = new DynamicSpeedSampleProvider(provider);
                    _speedProviders[soundId] = speedProvider;

                    using (audioFile)
                    using (var outputDevice = new WaveOutEvent())
                    {
                        _activeDevices[soundId] = outputDevice;
                        outputDevice.Init(speedProvider);
                        outputDevice.Play();
                        while (outputDevice.PlaybackState == PlaybackState.Playing)
                        {
                            System.Threading.Thread.Sleep(100);
                        }
                    }
                }
                catch (Exception)
                {
                    // Ignore audio playback exceptions silently
                }
                finally
                {
                    _activeDevices.TryRemove(soundId, out _);
                    _speedProviders.TryRemove(soundId, out _);
                }
            });
        }

        public static void StopSound(string soundId)
        {
            if (_activeDevices.TryGetValue(soundId, out var device))
            {
                try
                {
                    device.Stop();
                }
                catch (Exception)
                {
                }
            }
        }

        public static void StopAllSounds()
        {
            foreach (var key in _activeDevices.Keys)
            {
                StopSound(key);
            }
        }

        public static void SetGlobalSpeed(float speed)
        {
            foreach (var provider in _speedProviders.Values)
            {
                provider.Speed = speed;
            }
        }
    }
}
