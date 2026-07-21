using System;
using System.Windows.Forms;
using LaberintoInteractivo;

namespace LaberintoInteractivo
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            ApplicationConfiguration.Initialize();
            Application.Run(new FormHistoria());
        }
    }
}
