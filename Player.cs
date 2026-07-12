using System.Drawing;

namespace LaberintoInteractivo
{
    public class Player
    {
        public Point CurrentPosition { get; set; }
        public Image AvatarImage { get; set; }

        public Player(Point startPosition, Image avatar)
        {
            CurrentPosition = startPosition;
            AvatarImage = avatar;
        }

        // Método para mover al jugador, la validación se hace en GameManager
        public void MoveTo(Point newPosition)
        {
            CurrentPosition = newPosition;
        }
    }
}
