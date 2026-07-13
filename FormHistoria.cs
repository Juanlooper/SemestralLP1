using System;
using System.Drawing;
using System.Windows.Forms;

namespace LaberintoInteractivo
{
    public partial class FormHistoria : Form
    {
        private string[] _storyPages;
        private Image[] _bgImages;
        private int _currentPageIndex = 0;
        private int _currentTextIndex = 0;
        private bool _isOutro;

        public FormHistoria(bool isOutro = false, bool allStars = false)
        {
            InitializeComponent();
            _isOutro = isOutro;
            
            if (isOutro)
            {
                _storyPages = new string[1];
                _bgImages = new Image[1];
                if (allStars)
                {
                    _storyPages[0] = "¡FINAL ESPECIAL DESBLOQUEADO!\nHas escapado de las Mazmorras del Estudio con todos tus apuntes intactos. El sol brilla, la tesis está lista, y te has graduado con honores. La procrastinación ha sido derrotada... por ahora.";
                }
                else
                {
                    _storyPages[0] = "Lograste escapar de las Mazmorras del Estudio. La luz del sol hiere tus ojos acostumbrados a la oscuridad. Has aprobado raspando la materia... Prometes nunca más dejar todo para última hora.";
                }
                try { _bgImages[0] = Image.FromFile(@"Assets\outro_cinematic.png"); } catch {}
            }
            else
            {
                _storyPages = new string[2];
                _bgImages = new Image[2];
                _storyPages[0] = "Año 2026. Las entregas se acumularon. Las fechas límite expiraron. Por el gran delito de procrastinar, has sido exiliado a las oscuras 'Mazmorras del Estudio'. Tu única esperanza de aprobar el semestre es encontrar la salida, superando pasillos engañosos y recuperando tus apuntes perdidos (Estrellas). Si fallas... recursarás para siempre.";
                _storyPages[1] = "Pero cuidado: no estás solo. Un monstruo de la procrastinación ronda los pasillos (El Acosador). Evita las trampas mágicas moradas que lo fortalecerán, y busca las runas doradas esparcidas por el calabozo, las cuales congelarán su avance o te darán el impulso necesario para huir de tu fatídico destino.";
                
                try 
                { 
                    _bgImages[0] = Image.FromFile(@"Assets\intro_cinematic.png"); 
                    _bgImages[1] = Image.FromFile(@"Assets\intro_cinematic_2.png"); 
                } catch {}
            }
            
            // Estética oscura
            this.BackColor = Color.Black;
            
            // Configurar el Label de la historia
            lblStory.BackColor = Color.FromArgb(150, 0, 0, 0); // Fondo semi-transparente para leer el texto
            lblStory.ForeColor = Color.White;
            lblStory.Font = new Font("Segoe UI", 16, FontStyle.Bold);
            
            typeTimer.Interval = 40; 
            LoadPage();
        }

        private void LoadPage()
        {
            _currentTextIndex = 0;
            lblStory.Text = "";
            this.BackgroundImage = _bgImages[_currentPageIndex];
            this.BackgroundImageLayout = ImageLayout.Stretch;
            btnSkip.Text = "Omitir";
            typeTimer.Start();
        }

        private void typeTimer_Tick(object sender, EventArgs e)
        {
            if (_currentTextIndex < _storyPages[_currentPageIndex].Length)
            {
                lblStory.Text += _storyPages[_currentPageIndex][_currentTextIndex];
                _currentTextIndex++;
            }
            else
            {
                typeTimer.Stop();
                btnSkip.Text = "Continuar";
            }
        }

        private void btnSkip_Click(object sender, EventArgs e)
        {
            if (typeTimer.Enabled)
            {
                typeTimer.Stop();
                lblStory.Text = _storyPages[_currentPageIndex];
                btnSkip.Text = "Continuar";
            }
            else
            {
                if (_currentPageIndex < _storyPages.Length - 1)
                {
                    _currentPageIndex++;
                    LoadPage();
                }
                else
                {
                    if (_isOutro)
                    {
                        this.DialogResult = DialogResult.OK;
                        this.Close();
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
}
