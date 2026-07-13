using System;
using System.Drawing;

namespace LaberintoInteractivo
{
    public enum Direction
    {
        Up,
        Down,
        Left,
        Right
    }

    public class GameManager
    {
        public Level CurrentLevel { get; private set; }
        public Player Player1 { get; private set; }
        public int CurrentLevelNumber { get; private set; }
        public int MaxLevel { get; private set; }
        public int Steps { get; private set; }
        public int TimeElapsedSeconds { get; set; }
        public int StarsCollected { get; private set; }
        public bool IsHardcoreMode { get; private set; }

        public Point BossPosition { get; set; }
        public bool BossActive { get; set; }
        public int BossFreezeTurns { get; set; } = 0;
        public int BossSpeedMultiplier { get; set; } = 1;
        public int BossSpeedBoostTurns { get; set; } = 0;
        public int PlayerSpeedBoostTurns { get; set; } = 0;
        public bool IsBoostActive => BossSpeedBoostTurns > 0 || BossFreezeTurns > 0 || PlayerSpeedBoostTurns > 0;
        public bool IsBadBoostActive => BossSpeedBoostTurns > 0;
        public bool IsGoodBoostActive => BossFreezeTurns > 0 || PlayerSpeedBoostTurns > 0;

        public event Action<bool> OnLevelCompleted; // bool: got all stars
        public event Action<bool> OnGameWon; // bool: got all stars
        public event Action OnGameOver;

        private int _bossTurnCounter = 0;

        public GameManager()
        {
        }

        public void StartGame(Image playerAvatar, bool isHardcore)
        {
            IsHardcoreMode = isHardcore;
            CurrentLevelNumber = isHardcore ? 4 : 1;
            MaxLevel = isHardcore ? 4 : 3;
            Steps = 0;
            TimeElapsedSeconds = 0;
            LoadLevelAndPlayer(playerAvatar);
        }

        private void LoadLevelAndPlayer(Image avatar)
        {
            CurrentLevel = new Level(CurrentLevelNumber);
            StarsCollected = 0;
            
            if (CurrentLevelNumber >= 2) 
            { 
                BossActive = true; 
                BossPosition = new Point(CurrentLevel.Columns - 2, CurrentLevel.Rows - 2); 
            } 
            else 
            { 
                BossActive = false; 
            }
            BossSpeedMultiplier = 1; 
            BossFreezeTurns = 0; 
            PlayerSpeedBoostTurns = 0;
            BossSpeedBoostTurns = 0;
            AudioPlayer.StopAllSounds();

            // Si el jugador ya existe, actualizarlo. Si no, crearlo.
            if (Player1 == null)
            {
                Player1 = new Player(CurrentLevel.StartPosition, avatar);
            }
            else
            {
                Player1.CurrentPosition = CurrentLevel.StartPosition;
                Player1.AvatarImage = avatar;
            }
        }

        // CONTROL DE ERRORES Y VALIDACIONES: Manejo robusto del movimiento
        public void MovePlayer(Direction dir)
        {
            int newX = Player1.CurrentPosition.X;
            int newY = Player1.CurrentPosition.Y;

            switch (dir)
            {
                case Direction.Up: newY--; break;
                case Direction.Down: newY++; break;
                case Direction.Left: newX--; break;
                case Direction.Right: newX++; break;
            }

            // 1. Validar que no nos salimos del arreglo (Evitar IndexOutOfRangeException)
            if (newX >= 0 && newX < CurrentLevel.Columns && newY >= 0 && newY < CurrentLevel.Rows)
            {
                int targetCell = CurrentLevel.Grid[newY, newX];
                
                // 2. Validar colisiones (1 = pared, 0 = libre, 2 = estrella, 3 = salida, 4 = trampa, 5 = boost)
                if (targetCell != 1)
                {
                    if (targetCell == 2)
                    {
                        StarsCollected++;
                        CurrentLevel.Grid[newY, newX] = 0; // Se recolecta y se vuelve camino libre
                    }
                    else if (targetCell == 4) // TRAMPA MORADA
                    {
                        CurrentLevel.Grid[newY, newX] = 0;
                        BossSpeedMultiplier = 2; 
                        BossSpeedBoostTurns = 10;
                        AudioPlayer.PlaySound(@"Assets\boost_morado.mp3", "morado");
                    }
                    else if (targetCell == 5) // BOOST DORADO
                    {
                        CurrentLevel.Grid[newY, newX] = 0;
                        Random rnd = new Random();
                        if (rnd.Next(2) == 0) { BossFreezeTurns = 10; } 
                        else { PlayerSpeedBoostTurns = 10; }
                        AudioPlayer.PlaySound(@"Assets\boost_dorado.mp3", "dorado");
                    }

                    Player1.MoveTo(new Point(newX, newY));
                    Steps++;

                    // LOGICA DEL BOSS PERSIGUIENDO
                    if (BossActive)
                    {
                        _bossTurnCounter++;
                        
                        if (BossSpeedBoostTurns > 0)
                        {
                            BossSpeedBoostTurns--;
                            if (BossSpeedBoostTurns == 0)
                            {
                                BossSpeedMultiplier = 1;
                                AudioPlayer.StopSound("morado");
                            }
                        }

                        if (BossFreezeTurns > 0) 
                        { 
                            BossFreezeTurns--; 
                            if (BossFreezeTurns == 0) AudioPlayer.StopSound("dorado");
                        } 
                        else if (PlayerSpeedBoostTurns > 0) 
                        { 
                            PlayerSpeedBoostTurns--; 
                            if (PlayerSpeedBoostTurns == 0) AudioPlayer.StopSound("dorado");
                        }
                        else if (_bossTurnCounter % 2 == 0 || BossSpeedMultiplier > 1) 
                        {
                            for (int i = 0; i < BossSpeedMultiplier; i++) 
                            {
                                Point nextMove = GetNextBossMove();
                                if (nextMove != BossPosition)
                                {
                                    BossPosition = nextMove;
                                }

                                if (BossPosition.X == Player1.CurrentPosition.X && BossPosition.Y == Player1.CurrentPosition.Y)
                                {
                                    AudioPlayer.StopAllSounds();
                                    OnGameOver?.Invoke();
                                    return;
                                }
                            }
                        }
                        if (BossPosition.X == Player1.CurrentPosition.X && BossPosition.Y == Player1.CurrentPosition.Y)
                        {
                            AudioPlayer.StopAllSounds();
                            OnGameOver?.Invoke();
                            return;
                        }
                    }

                    if (targetCell == 3)
                    {
                        CheckWinCondition();
                    }
                }
                
                AudioPlayer.SetGlobalSpeed(IsBoostActive ? 1.25f : 1.0f);
            }
        }

        private void CheckWinCondition()
        {
            bool gotAllStars = StarsCollected >= CurrentLevel.TotalStars;

            if (CurrentLevelNumber < MaxLevel)
            {
                CurrentLevelNumber++;
                LoadLevelAndPlayer(Player1.AvatarImage);
                OnLevelCompleted?.Invoke(gotAllStars);
            }
            else
            {
                AudioPlayer.StopAllSounds();
                OnGameWon?.Invoke(gotAllStars);
            }
        }

        private Point GetNextBossMove()
        {
            int cols = CurrentLevel.Columns;
            int rows = CurrentLevel.Rows;
            int[,] dist = new int[rows, cols];
            Point[,] parent = new Point[rows, cols];
            for (int i = 0; i < rows; i++)
                for (int j = 0; j < cols; j++)
                    dist[i, j] = -1;

            System.Collections.Generic.Queue<Point> q = new System.Collections.Generic.Queue<Point>();
            q.Enqueue(Player1.CurrentPosition);
            dist[Player1.CurrentPosition.Y, Player1.CurrentPosition.X] = 0;

            int[] dx = { 0, 0, -1, 1 };
            int[] dy = { -1, 1, 0, 0 };

            bool found = false;

            while (q.Count > 0)
            {
                Point curr = q.Dequeue();
                if (curr.X == BossPosition.X && curr.Y == BossPosition.Y)
                {
                    found = true;
                    break;
                }

                for (int i = 0; i < 4; i++)
                {
                    int nx = curr.X + dx[i];
                    int ny = curr.Y + dy[i];

                    if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && CurrentLevel.Grid[ny, nx] != 1)
                    {
                        if (dist[ny, nx] == -1)
                        {
                            dist[ny, nx] = dist[curr.Y, curr.X] + 1;
                            parent[ny, nx] = curr;
                            q.Enqueue(new Point(nx, ny));
                        }
                    }
                }
            }

            if (found)
            {
                return parent[BossPosition.Y, BossPosition.X];
            }

            return BossPosition;
        }
    }
}
