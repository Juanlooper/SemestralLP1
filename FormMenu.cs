#nullable disable
using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;

namespace LaberintoInteractivo
{
    public partial class FormMenu : Form
    {
        private Image _avatarImage;

        public FormMenu()
        {
            InitializeComponent();
            
            try
            {
                this.BackgroundImage = Image.FromFile(@"Assets\menu_background.png");
                this.BackgroundImageLayout = ImageLayout.Stretch;
            }
            catch
            {
                this.BackColor = Color.FromArgb(20, 20, 20);
            }
            
            this.ForeColor = Color.White;
            
            // Hacer fondo del título transparente
            lblTitle.BackColor = Color.Transparent;
            
            // Cargar avatar por defecto
            try
            {
                _avatarImage = Image.FromFile(@"Assets\default_avatar.png");
                pbAvatarPreview.Image = _avatarImage;
                pbAvatarPreview.SizeMode = PictureBoxSizeMode.Zoom;
            }
            catch (Exception) { /* Ignorar si no existe */ }
            
            // Estilizar botones
            StyleButton(btnLoadAvatar);
            StyleButton(btnPlayCampaign);
            StyleButton(btnPlayHardcore);
            StyleButton(btnExit);
        }

        private void StyleButton(Button btn)
        {
            btn.FlatStyle = FlatStyle.Flat;
            btn.FlatAppearance.BorderSize = 2;
            btn.FlatAppearance.BorderColor = Color.DarkGoldenrod;
            btn.BackColor = Color.FromArgb(200, 15, 15, 15); // Semitransparente simulado (en Winforms es sólido pero se ve bien)
            btn.ForeColor = Color.Gold;
            btn.Font = new Font("Segoe UI", 12F, FontStyle.Bold, GraphicsUnit.Point);
            btn.Cursor = Cursors.Hand;
        }

        private void btnLoadAvatar_Click(object sender, EventArgs e)
        {
            openFileDialog1.Filter = "Image Files|*.jpg;*.jpeg;*.png";
            openFileDialog1.Title = "Selecciona tu Avatar";

            try
            {
                if (openFileDialog1.ShowDialog() == DialogResult.OK)
                {
                    FileInfo fi = new FileInfo(openFileDialog1.FileName);
                    if (fi.Length > 2 * 1024 * 1024)
                    {
                        MessageBox.Show("El archivo es muy grande. Selecciona una imagen menor a 2MB.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                        return;
                    }

                    Image loadedImage = Image.FromFile(openFileDialog1.FileName);
                    _avatarImage = loadedImage;
                    pbAvatarPreview.Image = _avatarImage;
                    pbAvatarPreview.SizeMode = PictureBoxSizeMode.Zoom;
                    
                    btnPlayCampaign.Enabled = true;
                    btnPlayHardcore.Enabled = true;
                }
            }
            catch (OutOfMemoryException)
            {
                MessageBox.Show("El formato de la imagen no es válido o está corrupta.", "Error de Formato", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show("Ocurrió un error al cargar la imagen: " + ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void btnPlayCampaign_Click(object sender, EventArgs e)
        {
            StartGame(false);
        }

        private void btnPlayHardcore_Click(object sender, EventArgs e)
        {
            StartGame(true);
        }

        private void StartGame(bool isHardcore)
        {
            if (_avatarImage == null)
            {
                MessageBox.Show("Por favor, selecciona un avatar primero.", "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            int activeMod = 0;

            FormJuego formJuego = new FormJuego(_avatarImage, isHardcore, activeMod);
            formJuego.FormClosed += (s, args) => this.Show(); // Volver a mostrar el menú al cerrar el juego
            this.Hide();
            formJuego.Show();
        }



        private void btnExit_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }
    }

    public class DarkMenuColorTable : ProfessionalColorTable
    {
        public override Color ToolStripDropDownBackground => Color.FromArgb(20, 20, 20);
        public override Color ImageMarginGradientBegin => Color.FromArgb(20, 20, 20);
        public override Color ImageMarginGradientMiddle => Color.FromArgb(20, 20, 20);
        public override Color ImageMarginGradientEnd => Color.FromArgb(20, 20, 20);
        public override Color MenuBorder => Color.DarkGoldenrod;
        public override Color MenuItemBorder => Color.DarkGoldenrod;
        public override Color MenuItemSelected => Color.FromArgb(50, 50, 50);
        public override Color MenuItemSelectedGradientBegin => Color.FromArgb(50, 50, 50);
        public override Color MenuItemSelectedGradientEnd => Color.FromArgb(50, 50, 50);
        public override Color MenuItemPressedGradientBegin => Color.FromArgb(30, 30, 30);
        public override Color MenuItemPressedGradientEnd => Color.FromArgb(30, 30, 30);
        public override Color CheckBackground => Color.DarkGoldenrod;
        public override Color CheckSelectedBackground => Color.Gold;
    }
}
