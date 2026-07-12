using System;
using System.Drawing;
using System.Windows.Forms;

namespace LaberintoInteractivo
{
    public partial class FormHistoria : Form
    {
        private string _fullStory;
        private int _currentIndex = 0;
        private bool _isOutro;

        public FormHistoria(bool isOutro = false, bool allStars = false)
        {
            InitializeComponent();
            _isOutro = isOutro;
            
            if (isOutro)
            {
                if (allStars)
                {
                    _fullStory = "¡FINAL ESPECIAL DESBLOQUEADO!\nHas escapado de las Mazmorras del Estudio con todos tus apuntes intactos. El sol brilla, la tesis está lista, y te has graduado con honores. La procrastinación ha sido derrotada... por ahora.";
                }
                else
                {
                    _fullStory = "Lograste escapar de las Mazmorras del Estudio. La luz del sol hiere tus ojos acostumbrados a la oscuridad. Has aprobado raspando la materia... Prometes nunca más dejar todo para última hora.";
                }
            }
            else
            {
                _fullStory = "Año 2026. Las entregas se acumularon. Las fechas límite expiraron. Por el gran delito de procrastinar, has sido exiliado a las oscuras 'Mazmorras del Estudio'. Tu única esperanza de aprobar el semestre es encontrar la salida, superando pasillos engañosos y recuperando tus apuntes perdidos (Estrellas). Si fallas... recursarás para siempre.";
            }
            
            // Estética oscura
            this.BackColor = Color.Black;
            
            try 
            {
                if (_isOutro)
                    this.BackgroundImage = Image.FromFile(@"Assets\outro_cinematic.png");
                else
                    this.BackgroundImage = Image.FromFile(@"Assets\intro_cinematic.png");
                this.BackgroundImageLayout = ImageLayout.Stretch;
            } catch {}
            
            // Configurar el Label de la historia
            lblStory.Text = "";
            lblStory.BackColor = Color.FromArgb(150, 0, 0, 0); // Fondo semi-transparente para leer el texto
            lblStory.ForeColor = Color.White;
            lblStory.Font = new Font("Segoe UI", 16, FontStyle.Bold);
            
            // Configurar el botón
            btnSkip.Text = "Omitir";
            
            // Iniciar el efecto de máquina de escribir
            typeTimer.Interval = 40; 
            typeTimer.Start();
        }

        private void typeTimer_Tick(object sender, EventArgs e)
        {
            if (_currentIndex < _fullStory.Length)
            {
                lblStory.Text += _fullStory[_currentIndex];
                _currentIndex++;
            }
            else
            {
                typeTimer.Stop();
                btnSkip.Text = _isOutro ? "Terminar" : "Continuar";
            }
        }

        private void btnSkip_Click(object sender, EventArgs e)
        {
            if (typeTimer.Enabled)
            {
                typeTimer.Stop();
                lblStory.Text = _fullStory;
                btnSkip.Text = _isOutro ? "Terminar" : "Continuar";
            }
            else
            {
                if (_isOutro)
                {
                    Application.Exit(); // Cierra el juego tras el outro
                }
                else
                {
                    FormMenu formMenu = new FormMenu();
                    formMenu.FormClosed += (s, args) => this.Close(); 
                    this.Hide();
                    formMenu.Show();
                }
            }
        }
    }
}
