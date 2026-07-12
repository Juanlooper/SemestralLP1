namespace LaberintoInteractivo
{
    partial class FormJuego
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
            this.lblStats = new System.Windows.Forms.Label();
            this.pbMaze = new System.Windows.Forms.PictureBox();
            this.gameTimer = new System.Windows.Forms.Timer(this.components);
            ((System.ComponentModel.ISupportInitialize)(this.pbMaze)).BeginInit();
            this.SuspendLayout();
            // 
            // lblStats
            // 
            this.lblStats.AutoSize = true;
            this.lblStats.ForeColor = System.Drawing.Color.White;
            this.lblStats.Location = new System.Drawing.Point(20, 20);
            this.lblStats.Name = "lblStats";
            this.lblStats.Size = new System.Drawing.Size(150, 15);
            this.lblStats.TabIndex = 0;
            this.lblStats.Text = "Nivel: 1 | Apuntes: 0/0 | Pasos: 0 | Tiempo: 0s";
            // 
            // pbMaze
            // 
            this.pbMaze.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.pbMaze.Location = new System.Drawing.Point(20, 50);
            this.pbMaze.Name = "pbMaze";
            this.pbMaze.Size = new System.Drawing.Size(740, 500);
            this.pbMaze.TabIndex = 1;
            this.pbMaze.TabStop = false;
            this.pbMaze.Paint += new System.Windows.Forms.PaintEventHandler(this.pbMaze_Paint);
            this.pbMaze.Resize += new System.EventHandler(this.pbMaze_Resize);
            // 
            // gameTimer
            // 
            this.gameTimer.Tick += new System.EventHandler(this.gameTimer_Tick);
            // 
            // FormJuego
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 600);
            this.Controls.Add(this.pbMaze);
            this.Controls.Add(this.lblStats);
            this.Name = "FormJuego";
            this.Text = "Mazmorras del Estudio - Juego";
            ((System.ComponentModel.ISupportInitialize)(this.pbMaze)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        private System.Windows.Forms.Label lblStats;
        private System.Windows.Forms.PictureBox pbMaze;
        private System.Windows.Forms.Timer gameTimer;
    }
}
