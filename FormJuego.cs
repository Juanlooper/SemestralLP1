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
        
        // Optimización de Renderizado (UI manejada nativamente por WinForms Image)
        // Eliminado _mapBuffer manual

        public FormJuego(Image avatar, bool isHardcore)
        {
            InitializeComponent();
            _avatarImage = avatar;
            _isHardcore = isHardcore;
            
            try
            {
                // Cargar texturas de la IA, si fallan, usarán los colores por defecto
                _wallTexture = Image.FromFile(@"Assets\wall_texture.png");
                _floorTexture = Image.FromFile(@"Assets\floor_texture.png");
                _noteTexture = Image.FromFile(@"Assets\note_texture.png");
                _exitTexture = Image.FromFile(@"Assets\exit_texture.png");
            }
            catch (Exception)
            {
                // Ignorar error si no están las imágenes (fallback a colores sólidos)
            }
            
            _gameManager = new GameManager();
            _gameManager.OnLevelCompleted += GameManager_OnLevelCompleted;
            _gameManager.OnGameWon += GameManager_OnGameWon;

            this.BackColor = Color.Black;
            this.ForeColor = Color.White;

            typeof(Control).GetProperty("DoubleBuffered", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic).SetValue(pbMaze, true, null);

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
                    // Si recogimos un apunte, debemos redibujar la imagen estática
                    if (_gameManager.StarsCollected > oldStars)
                    {
                        var oldImage = pbMaze.Image;
                        pbMaze.Image = GenerateMapImage();
                        if (oldImage != null) oldImage.Dispose();
                    }
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
            
            FormHistoria outro = new FormHistoria(true, gotAllStars);
            this.Hide();
            outro.Show();
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
    }
}
