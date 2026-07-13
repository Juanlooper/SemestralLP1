namespace LaberintoInteractivo
{
    partial class FormMenu
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.lblTitle = new System.Windows.Forms.Label();
            this.btnLoadAvatar = new System.Windows.Forms.Button();
            this.pbAvatarPreview = new System.Windows.Forms.PictureBox();
            this.btnPlayCampaign = new System.Windows.Forms.Button();
            this.btnPlayHardcore = new System.Windows.Forms.Button();
            this.btnExit = new System.Windows.Forms.Button();
            this.btnMods = new System.Windows.Forms.Button();
            this.contextMenuStripMods = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.donPolloToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            ((System.ComponentModel.ISupportInitialize)(this.pbAvatarPreview)).BeginInit();
            this.contextMenuStripMods.SuspendLayout();
            this.SuspendLayout();
            // 
            // lblTitle
            // 
            this.lblTitle.AutoSize = true;
            this.lblTitle.BackColor = System.Drawing.Color.Transparent;
            this.lblTitle.Font = new System.Drawing.Font("Segoe UI", 20F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblTitle.ForeColor = System.Drawing.Color.White;
            this.lblTitle.Location = new System.Drawing.Point(40, 30);
            this.lblTitle.Name = "lblTitle";
            this.lblTitle.Size = new System.Drawing.Size(620, 74);
            this.lblTitle.TabIndex = 0;
            this.lblTitle.Text = "MAZMORRAS DEL ESTUDIO\nEl Exilio del Procrastinador";
            this.lblTitle.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            // 
            // btnLoadAvatar
            // 
            this.btnLoadAvatar.Location = new System.Drawing.Point(50, 150);
            this.btnLoadAvatar.Name = "btnLoadAvatar";
            this.btnLoadAvatar.Size = new System.Drawing.Size(200, 50);
            this.btnLoadAvatar.TabIndex = 1;
            this.btnLoadAvatar.Text = "Seleccionar Avatar";
            this.btnLoadAvatar.UseVisualStyleBackColor = true;
            this.btnLoadAvatar.Click += new System.EventHandler(this.btnLoadAvatar_Click);
            // 
            // pbAvatarPreview
            // 
            this.pbAvatarPreview.BackColor = System.Drawing.Color.Transparent;
            this.pbAvatarPreview.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pbAvatarPreview.Location = new System.Drawing.Point(280, 125);
            this.pbAvatarPreview.Name = "pbAvatarPreview";
            this.pbAvatarPreview.Size = new System.Drawing.Size(100, 100);
            this.pbAvatarPreview.TabIndex = 2;
            this.pbAvatarPreview.TabStop = false;
            // 
            // btnPlayCampaign
            // 
            this.btnPlayCampaign.Enabled = false;
            this.btnPlayCampaign.Location = new System.Drawing.Point(50, 250);
            this.btnPlayCampaign.Name = "btnPlayCampaign";
            this.btnPlayCampaign.Size = new System.Drawing.Size(330, 50);
            this.btnPlayCampaign.TabIndex = 3;
            this.btnPlayCampaign.Text = "Jugar Campaña Principal";
            this.btnPlayCampaign.UseVisualStyleBackColor = true;
            this.btnPlayCampaign.Click += new System.EventHandler(this.btnPlayCampaign_Click);
            // 
            // btnPlayHardcore
            // 
            this.btnPlayHardcore.Enabled = false;
            this.btnPlayHardcore.Location = new System.Drawing.Point(50, 320);
            this.btnPlayHardcore.Name = "btnPlayHardcore";
            this.btnPlayHardcore.Size = new System.Drawing.Size(330, 50);
            this.btnPlayHardcore.TabIndex = 4;
            this.btnPlayHardcore.Text = "Niveles Hardcore (Niebla)";
            this.btnPlayHardcore.UseVisualStyleBackColor = true;
            this.btnPlayHardcore.Click += new System.EventHandler(this.btnPlayHardcore_Click);
            // 
            // btnMods
            // 
            this.btnMods.Location = new System.Drawing.Point(50, 390);
            this.btnMods.Name = "btnMods";
            this.btnMods.Size = new System.Drawing.Size(330, 50);
            this.btnMods.TabIndex = 6;
            this.btnMods.Text = "Mods";
            this.btnMods.UseVisualStyleBackColor = true;
            this.btnMods.Click += new System.EventHandler(this.btnMods_Click);
            // 
            // contextMenuStripMods
            // 
            this.contextMenuStripMods.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.donPolloToolStripMenuItem});
            this.contextMenuStripMods.Name = "contextMenuStripMods";
            this.contextMenuStripMods.Size = new System.Drawing.Size(129, 26);
            // 
            // donPolloToolStripMenuItem
            // 
            this.donPolloToolStripMenuItem.CheckOnClick = true;
            this.donPolloToolStripMenuItem.Name = "donPolloToolStripMenuItem";
            this.donPolloToolStripMenuItem.Size = new System.Drawing.Size(128, 22);
            this.donPolloToolStripMenuItem.Text = "Don Pollo";
            // 
            // btnExit
            // 
            this.btnExit.Location = new System.Drawing.Point(50, 460);
            this.btnExit.Name = "btnExit";
            this.btnExit.Size = new System.Drawing.Size(330, 50);
            this.btnExit.TabIndex = 5;
            this.btnExit.Text = "Abandonar (Salir)";
            this.btnExit.UseVisualStyleBackColor = true;
            this.btnExit.Click += new System.EventHandler(this.btnExit_Click);
            // 
            // FormMenu
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 600);
            this.Controls.Add(this.btnExit);
            this.Controls.Add(this.btnMods);
            this.Controls.Add(this.btnPlayHardcore);
            this.Controls.Add(this.btnPlayCampaign);
            this.Controls.Add(this.pbAvatarPreview);
            this.Controls.Add(this.btnLoadAvatar);
            this.Controls.Add(this.lblTitle);
            this.Name = "FormMenu";
            this.Text = "Menú Principal - Mazmorras del Estudio";
            ((System.ComponentModel.ISupportInitialize)(this.pbAvatarPreview)).EndInit();
            this.contextMenuStripMods.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        private System.Windows.Forms.Label lblTitle;
        private System.Windows.Forms.Button btnLoadAvatar;
        private System.Windows.Forms.PictureBox pbAvatarPreview;
        private System.Windows.Forms.Button btnPlayCampaign;
        private System.Windows.Forms.Button btnPlayHardcore;
        private System.Windows.Forms.Button btnMods;
        private System.Windows.Forms.Button btnExit;
        private System.Windows.Forms.OpenFileDialog openFileDialog1;
        private System.Windows.Forms.ContextMenuStrip contextMenuStripMods;
        private System.Windows.Forms.ToolStripMenuItem donPolloToolStripMenuItem;
    }
}
