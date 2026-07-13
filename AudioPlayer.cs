using System;
using System.Collections.Concurrent;
using System.IO;
using System.Threading.Tasks;
using NAudio.Wave;

namespace LaberintoInteractivo
{
    public static class AudioPlayer
    {
        private static ConcurrentDictionary<string, WaveOutEvent> _activeDevices = new ConcurrentDictionary<string, WaveOutEvent>();

        public static void PlaySound(string filePath, string soundId)
        {
            if (!File.Exists(filePath)) return;

            StopSound(soundId);

            Task.Run(() =>
            {
                try
                {
                    using (var audioFile = new AudioFileReader(filePath))
                    using (var outputDevice = new WaveOutEvent())
                    {
                        _activeDevices[soundId] = outputDevice;
                        outputDevice.Init(audioFile);
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
    }
}
