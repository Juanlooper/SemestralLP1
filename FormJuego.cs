using System;
using System.Drawing;
using System.Windows.Forms;

namespace LaberintoInteractivo
{
    public partial class FormJuego : Form
    {
        private GameManager _gameManager;
        private Image _avatarImage;
        private bool _isHardcore;
        private bool _isDonPolloEnabled;

        // Configuraciones visuales (Fallback)
        private readonly Color _wallColor = Color.FromArgb(15, 15, 15);
        private readonly Color _floorColor = Color.FromArgb(45, 45, 45);
        private readonly Color _exitColor = Color.DarkGreen;
        private readonly Color _starColor = Color.Gold;
        private readonly Color _fogColor = Color.Black;

        // Texturas IA
        private Image _wallTexture;
        private Image _floorTexture;
        private Image _noteTexture;
        private Image _exitTexture;
        private Image _bossTexture;
        private Image _trapTexture;
        private Image _boostTexture;
        
        // Optimización de Renderizado (UI manejada nativamente por WinForms Image)
        // Eliminado _mapBuffer manual

        private System.Windows.Forms.Timer _glowTimer;

        private void UpdateMusicState()
        {
            AudioPlayer.StopSound("chaseMusic");
            if (_gameManager != null && _gameManager.BossActive && _isDonPolloEnabled)
            {
                string chaseAudioPath = System.IO.Path.GetFullPath(@"Assets\don-pollo-king.mp3");
                AudioPlayer.PlaySound(chaseAudioPath, "chaseMusic", true);
            }
        }

        public FormJuego(Image avatar, bool isHardcore, bool isDonPolloEnabled)
        {
            InitializeComponent();
            _avatarImage = avatar;
            _isHardcore = isHardcore;
            _isDonPolloEnabled = isDonPolloEnabled;
            
            try
            {
                // Cargar texturas de la IA, si fallan, usarán los colores por defecto
                _wallTexture = Image.FromFile(@"Assets\wall_texture.png");
                _floorTexture = Image.FromFile(@"Assets\floor_texture.png");
                _noteTexture = Image.FromFile(@"Assets\note_texture.png");
                _exitTexture = Image.FromFile(@"Assets\exit_texture.png");
                
                _trapTexture = Image.FromFile(@"Assets\trap_texture.png");
                _boostTexture = Image.FromFile(@"Assets\boost_texture.png");
            }
            catch (Exception)
            {
                // Ignorar error si no están las imágenes (fallback a colores sólidos)
            }
            
            if (_isDonPolloEnabled)
            {
                try
                {
                    _bossTexture = Image.FromFile(@"Assets\Don pollo perseguidor.jpg");
                }
                catch (Exception) { }
            }
            else
            {
                try
                {
                    _bossTexture = Image.FromFile(@"Assets\boss_texture.png");
                }
                catch (Exception) { }
            }
            
            _gameManager = new GameManager();
            _gameManager.OnLevelCompleted += GameManager_OnLevelCompleted;
            _gameManager.OnGameWon += GameManager_OnGameWon;
            _gameManager.OnGameOver += GameManager_OnGameOver;

            this.BackColor = Color.Black;
            this.ForeColor = Color.White;

            typeof(Control).GetProperty("DoubleBuffered", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic).SetValue(pbMaze, true, null);

            _glowTimer = new System.Windows.Forms.Timer();
            _glowTimer.Interval = 50;
            _glowTimer.Tick += (s, ev) => {
                if (_gameManager != null && _gameManager.IsBoostActive) {
                    pbMaze.Invalidate();
                }
            };
            _glowTimer.Start();

            Start();
        }

        private void Start()
        {
            _gameManager.StartGame(_avatarImage, _isHardcore);
            UpdateStats();
            pbMaze.Image = GenerateMapImage(); // Crear el mapa estático y asignarlo
            gameTimer.Interval = 1000;
            gameTimer.Start();
            
            this.KeyPreview = true;
            this.Focus();
            pbMaze.Invalidate();
        }

        protected override void OnShown(EventArgs e)
        {
            base.OnShown(e);
            UpdateMusicState();
        }

        private void gameTimer_Tick(object sender, EventArgs e)
        {
            _gameManager.TimeElapsedSeconds++;
            UpdateStats();
        }

        private void UpdateStats()
        {
            lblStats.Text = $"Nivel: {_gameManager.CurrentLevelNumber} | Apuntes: {_gameManager.StarsCollected}/{_gameManager.CurrentLevel.TotalStars} | Pasos: {_gameManager.Steps} | Tiempo: {_gameManager.TimeElapsedSeconds}s";
        }

        // Crea una imagen estática del nivel de forma aislada
        private Bitmap GenerateMapImage()
        {
            if (pbMaze.Width == 0 || pbMaze.Height == 0) return null;
            if (_gameManager == null || _gameManager.CurrentLevel == null) return null;
            
            Bitmap newMap = new Bitmap(pbMaze.Width, pbMaze.Height);
            using (Graphics g = Graphics.FromImage(newMap))
            {
                int rows = _gameManager.CurrentLevel.Rows;
                int cols = _gameManager.CurrentLevel.Columns;

                float cellWidth = (float)pbMaze.Width / cols;
                float cellHeight = (float)pbMaze.Height / rows;

                // PRE-ESCALAR TEXTURAS
                int cw = (int)Math.Ceiling(cellWidth);
                int ch = (int)Math.Ceiling(cellHeight);
                int nw = (int)Math.Ceiling(cellWidth * 0.6f);
                int nh = (int)Math.Ceiling(cellHeight * 0.6f);

                using (Image scaledWall = _wallTexture != null ? new Bitmap(_wallTexture, cw > 0 ? cw : 1, ch > 0 ? ch : 1) : null)
                using (Image scaledFloor = _floorTexture != null ? new Bitmap(_floorTexture, cw > 0 ? cw : 1, ch > 0 ? ch : 1) : null)
                using (Image scaledNote = _noteTexture != null ? new Bitmap(_noteTexture, nw > 0 ? nw : 1, nh > 0 ? nh : 1) : null)
                using (Image scaledExit = _exitTexture != null ? new Bitmap(_exitTexture, cw > 0 ? cw : 1, ch > 0 ? ch : 1) : null)
                using (Image scaledTrap = _trapTexture != null ? new Bitmap(_trapTexture, cw > 0 ? cw : 1, ch > 0 ? ch : 1) : null)
                using (Image scaledBoost = _boostTexture != null ? new Bitmap(_boostTexture, cw > 0 ? cw : 1, ch > 0 ? ch : 1) : null)
                {
                    for (int y = 0; y < rows; y++)
                    {
                        for (int x = 0; x < cols; x++)
                        {
                            RectangleF rect = new RectangleF(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                            int cellValue = _gameManager.CurrentLevel.Grid[y, x];

                            if (cellValue == 1) // Pared
                            {
                                if (scaledWall != null)
                                    g.DrawImage(scaledWall, rect.X, rect.Y, cellWidth, cellHeight);
                                else
                                {
                                    using (Brush wallBrush = new SolidBrush(_wallColor))
                                        g.FillRectangle(wallBrush, rect);
                                }
                            }
                            else // Suelo (0), Estrella (2), o Salida (3)
                            {
                                // Siempre dibujar el suelo
                                if (scaledFloor != null)
                                    g.DrawImage(scaledFloor, rect.X, rect.Y, cellWidth, cellHeight);
                                else
                                {
                                    using (Brush floorBrush = new SolidBrush(_floorColor))
                                        g.FillRectangle(floorBrush, rect);
                                }
                                
                                // Solo dibujar líneas si NO usamos textura hiperrealista
                                if (_floorTexture == null) 
                                {
                                    using (Pen pen = new Pen(Color.FromArgb(60, 60, 60)))
                                        g.DrawRectangle(pen, Rectangle.Round(rect));
                                }

                                if (cellValue == 2) // Estrella / Apunte
                                {
                                    RectangleF starRect = new RectangleF(rect.X + rect.Width * 0.2f, rect.Y + rect.Height * 0.2f, rect.Width * 0.6f, rect.Height * 0.6f);
                                    if (scaledNote != null)
                                        g.DrawImage(scaledNote, starRect.X, starRect.Y, starRect.Width, starRect.Height);
                                    else
                                    {
                                        using (Brush starBrush = new SolidBrush(_starColor))
                                            g.FillEllipse(starBrush, starRect);
                                    }
                                }
                                else if (cellValue == 3) // Salida
                                {
                                    if (scaledExit != null)
                                        g.DrawImage(scaledExit, rect.X, rect.Y, cellWidth, cellHeight);
                                    else
                                    {
                                        using (Brush exitBrush = new SolidBrush(_exitColor))
                                            g.FillRectangle(exitBrush, rect);
                                    }
                                }
                                else if (cellValue == 4) 
                                {
                                    if (scaledTrap != null)
                                        g.DrawImage(scaledTrap, rect.X, rect.Y, cellWidth, cellHeight);
                                    else
                                    {
                                        using (Brush trapBrush = new SolidBrush(Color.Purple))
                                            g.FillRectangle(trapBrush, rect);
                                    }
                                }
                                else if (cellValue == 5) 
                                {
                                    if (scaledBoost != null)
                                        g.DrawImage(scaledBoost, rect.X, rect.Y, cellWidth, cellHeight);
                                    else
                                    {
                                        using (Brush boostBrush = new SolidBrush(Color.Orange))
                                            g.FillEllipse(boostBrush, rect);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return newMap;
        }

        private void pbMaze_Paint(object sender, PaintEventArgs e)
        {
            if (_gameManager.CurrentLevel == null) return;
            
            // Si la imagen estática no se ha creado (ej. inicio rápido), la creamos
            if (pbMaze.Image == null)
            {
                pbMaze.Image = GenerateMapImage();
            }

            Graphics g = e.Graphics;

            int rows = _gameManager.CurrentLevel.Rows;
            int cols = _gameManager.CurrentLevel.Columns;
            float cellWidth = (float)pbMaze.Width / cols;
            float cellHeight = (float)pbMaze.Height / rows;
            Point playerPos = _gameManager.Player1 != null ? _gameManager.Player1.CurrentPosition : new Point(-1, -1);

            // 2. Lógica de Niebla de Guerra (Fog of War) y Dibujado Dinámico
            if (_isHardcore && playerPos.X != -1)
            {
                using (Brush fogBrush = new SolidBrush(_fogColor))
                {
                    for (int y = 0; y < rows; y++)
                    {
                        for (int x = 0; x < cols; x++)
                        {
                            int distX = Math.Abs(playerPos.X - x);
                            int distY = Math.Abs(playerPos.Y - y);
                            if (Math.Max(distX, distY) > 2)
                            {
                                RectangleF rect = new RectangleF(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                                g.FillRectangle(fogBrush, rect);
                            }
                        }
                    }
                }
            }

            // 3. Dibujar Jugador
            if (_gameManager.Player1 != null)
            {
                RectangleF playerRect = new RectangleF(playerPos.X * cellWidth, playerPos.Y * cellHeight, cellWidth, cellHeight);
                g.DrawImage(_gameManager.Player1.AvatarImage, playerRect);
            }

            if (_gameManager.IsBoostActive)
            {
                int timeMs = DateTime.Now.Millisecond + DateTime.Now.Second * 1000;
                double pulseSpeed = _gameManager.IsBadBoostActive ? 0.002 : 0.01;
                int r = (int)(Math.Sin(timeMs * pulseSpeed) * 127 + 128);
                int g_c = (int)(Math.Sin(timeMs * pulseSpeed + 2) * 127 + 128);
                int b = (int)(Math.Sin(timeMs * pulseSpeed + 4) * 127 + 128);
                using (Brush overlayBrush = new SolidBrush(Color.FromArgb(100, r, g_c, b)))
                {
                    g.FillRectangle(overlayBrush, 0, 0, pbMaze.Width, pbMaze.Height);
                }
            }

            if (_gameManager.BossActive)
            {
                RectangleF bossRect = new RectangleF(_gameManager.BossPosition.X * cellWidth, _gameManager.BossPosition.Y * cellHeight, cellWidth, cellHeight);
                if (_bossTexture != null)
                {
                    g.DrawImage(_bossTexture, bossRect);
                }
                else
                {
                    using (Brush bossBrush = new SolidBrush(Color.Red))
                        g.FillRectangle(bossBrush, bossRect);
                }
            }
        }

        protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
        {
            if (_gameManager.CurrentLevel != null)
            {
                bool moved = false;
                int oldStars = _gameManager.StarsCollected;
                
                switch (keyData)
                {
                    case Keys.Up: _gameManager.MovePlayer(Direction.Up); moved = true; break;
                    case Keys.Down: _gameManager.MovePlayer(Direction.Down); moved = true; break;
                    case Keys.Left: _gameManager.MovePlayer(Direction.Left); moved = true; break;
                    case Keys.Right: _gameManager.MovePlayer(Direction.Right); moved = true; break;
                }

                if (moved)
                {
                    UpdateStats();
                    // Redibujar la imagen estática en caso de recoger items o trampas
                    var oldImage = pbMaze.Image;
                    pbMaze.Image = GenerateMapImage();
                    if (oldImage != null) oldImage.Dispose();
                    
                    pbMaze.Invalidate();
                    return true;
                }
            }
            return base.ProcessCmdKey(ref msg, keyData);
        }

        private async void GameManager_OnLevelCompleted(bool gotAllStars)
        {
            var oldImage = pbMaze.Image;
            pbMaze.Image = GenerateMapImage();
            if (oldImage != null) oldImage.Dispose();
            
            pbMaze.Invalidate(); 
            UpdateStats();
            UpdateMusicState();

            // Esperar un poco para que la interfaz se redibuje completamente con el nuevo nivel
            await System.Threading.Tasks.Task.Delay(150); 

            if (!gotAllStars)
            {
                MessageBox.Show($"¡Escapaste del nivel {_gameManager.CurrentLevelNumber - 1}!\nPero te faltaron apuntes importantes.", "Nivel Completado", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                MessageBox.Show($"¡Escapaste del nivel {_gameManager.CurrentLevelNumber - 1} con TODOS los apuntes! Excelente trabajo.", "Nivel Completado", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private void GameManager_OnGameWon(bool gotAllStars)
        {
            gameTimer.Stop();
            AudioPlayer.StopSound("chaseMusic");
            this.Hide();
            
            using (FormHistoria outro = new FormHistoria(true, gotAllStars))
            {
                outro.ShowDialog(this);
            }
            
            this.Close();
        }

        private async void GameManager_OnGameOver()
        {
            gameTimer.Stop();
            AudioPlayer.StopSound("chaseMusic");

            if (_isDonPolloEnabled)
            {
                string screamerAudioPath = System.IO.Path.GetFullPath(@"Assets\un-video-mas-mi-gente-para-perder-el-tiempo.mp3");
                AudioPlayer.PlaySound(screamerAudioPath, "screamerMusic", false);

                Form screamer = new Form();
                screamer.FormBorderStyle = FormBorderStyle.None;
                screamer.WindowState = FormWindowState.Maximized;
                screamer.BackColor = Color.Black;
                try {
                    screamer.BackgroundImage = Image.FromFile(System.IO.Path.GetFullPath(@"Assets\don pollo screamer.jpg"));
                    screamer.BackgroundImageLayout = ImageLayout.Zoom;
                } catch {}
                screamer.TopMost = true;
                screamer.Show();

                await System.Threading.Tasks.Task.Delay(5000);
                
                AudioPlayer.StopSound("screamerMusic");
                screamer.Close();
            }
            else
            {
                Form screamer = new Form();
                screamer.FormBorderStyle = FormBorderStyle.None;
                screamer.WindowState = FormWindowState.Maximized;
                screamer.BackColor = Color.Black;
                try {
                    screamer.BackgroundImage = Image.FromFile(System.IO.Path.GetFullPath(@"Assets\screamer.png"));
                    screamer.BackgroundImageLayout = ImageLayout.Zoom;
                } catch {}
                screamer.TopMost = true;
                screamer.Show();

                await System.Threading.Tasks.Task.Delay(3000);
                screamer.Close();
            }

            MessageBox.Show("¡El acosador te ha atrapado! Fin del juego.", "Game Over", MessageBoxButtons.OK, MessageBoxIcon.Error);
            this.Close(); // Regresará al menú
        }

        private void pbMaze_Resize(object sender, EventArgs e)
        {
            if (pbMaze.Width > 0 && pbMaze.Height > 0)
            {
                var oldImage = pbMaze.Image;
                pbMaze.Image = GenerateMapImage();
                if (oldImage != null) oldImage.Dispose();
                
                pbMaze.Invalidate();
            }
        }

        protected override void OnFormClosed(FormClosedEventArgs e)
        {
            AudioPlayer.StopAllSounds();
            base.OnFormClosed(e);
        }
    }
}
