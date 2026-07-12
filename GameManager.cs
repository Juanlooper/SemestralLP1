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

        public event Action<bool> OnLevelCompleted; // bool: got all stars
        public event Action<bool> OnGameWon; // bool: got all stars

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
                
                // 2. Validar colisiones (1 = pared, 0 = libre, 2 = estrella, 3 = salida)
                if (targetCell != 1)
                {
                    if (targetCell == 2)
                    {
                        StarsCollected++;
                        CurrentLevel.Grid[newY, newX] = 0; // Se recolecta y se vuelve camino libre
                    }

                    Player1.MoveTo(new Point(newX, newY));
                    Steps++;

                    if (targetCell == 3)
                    {
                        CheckWinCondition();
                    }
                }
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
                OnGameWon?.Invoke(gotAllStars);
            }
        }
    }
}
