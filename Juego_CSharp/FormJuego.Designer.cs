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
            
            // Nuevos controles
            this.btnUp = new System.Windows.Forms.Button();
            this.btnDown = new System.Windows.Forms.Button();
            this.btnLeft = new System.Windows.Forms.Button();
            this.btnRight = new System.Windows.Forms.Button();
            this.btnPause = new System.Windows.Forms.Button();
            
            this.pnlPauseMenu = new System.Windows.Forms.Panel();
            this.lblPause = new System.Windows.Forms.Label();
            this.btnResume = new System.Windows.Forms.Button();
            this.btnExit = new System.Windows.Forms.Button();
            
            this.pnlTutorial = new System.Windows.Forms.Panel();
            this.lblTutorial = new System.Windows.Forms.Label();
            this.btnTutorialOk = new System.Windows.Forms.Button();
            
            ((System.ComponentModel.ISupportInitialize)(this.pbMaze)).BeginInit();
            this.pnlPauseMenu.SuspendLayout();
            this.pnlTutorial.SuspendLayout();
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
            this.pbMaze.Size = new System.Drawing.Size(650, 500);
            this.pbMaze.TabIndex = 1;
            this.pbMaze.TabStop = false;
            this.pbMaze.Paint += new System.Windows.Forms.PaintEventHandler(this.pbMaze_Paint);
            this.pbMaze.Resize += new System.EventHandler(this.pbMaze_Resize);
            // 
            // gameTimer
            // 
            this.gameTimer.Tick += new System.EventHandler(this.gameTimer_Tick);
            // 
            // btnUp
            // 
            this.btnUp.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnUp.Location = new System.Drawing.Point(720, 420);
            this.btnUp.Name = "btnUp";
            this.btnUp.Size = new System.Drawing.Size(40, 40);
            this.btnUp.TabIndex = 2;
            this.btnUp.Text = "W";
            this.btnUp.UseVisualStyleBackColor = true;
            this.btnUp.Click += new System.EventHandler(this.btnUp_Click);
            this.btnUp.TabStop = false;
            // 
            // btnDown
            // 
            this.btnDown.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnDown.Location = new System.Drawing.Point(720, 500);
            this.btnDown.Name = "btnDown";
            this.btnDown.Size = new System.Drawing.Size(40, 40);
            this.btnDown.TabIndex = 3;
            this.btnDown.Text = "S";
            this.btnDown.UseVisualStyleBackColor = true;
            this.btnDown.Click += new System.EventHandler(this.btnDown_Click);
            this.btnDown.TabStop = false;
            // 
            // btnLeft
            // 
            this.btnLeft.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnLeft.Location = new System.Drawing.Point(680, 460);
            this.btnLeft.Name = "btnLeft";
            this.btnLeft.Size = new System.Drawing.Size(40, 40);
            this.btnLeft.TabIndex = 4;
            this.btnLeft.Text = "A";
            this.btnLeft.UseVisualStyleBackColor = true;
            this.btnLeft.Click += new System.EventHandler(this.btnLeft_Click);
            this.btnLeft.TabStop = false;
            // 
            // btnRight
            // 
            this.btnRight.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnRight.Location = new System.Drawing.Point(760, 460);
            this.btnRight.Name = "btnRight";
            this.btnRight.Size = new System.Drawing.Size(40, 40);
            this.btnRight.TabIndex = 5;
            this.btnRight.Text = "D";
            this.btnRight.UseVisualStyleBackColor = true;
            this.btnRight.Click += new System.EventHandler(this.btnRight_Click);
            this.btnRight.TabStop = false;
            // 
            // btnPause
            // 
            this.btnPause.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnPause.Location = new System.Drawing.Point(700, 15);
            this.btnPause.Name = "btnPause";
            this.btnPause.Size = new System.Drawing.Size(80, 25);
            this.btnPause.TabIndex = 6;
            this.btnPause.Text = "Pausa";
            this.btnPause.UseVisualStyleBackColor = true;
            this.btnPause.Click += new System.EventHandler(this.btnPause_Click);
            this.btnPause.TabStop = false;
            // 
            // pnlPauseMenu
            // 
            this.pnlPauseMenu.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(20)))), ((int)(((byte)(20)))), ((int)(((byte)(20)))));
            this.pnlPauseMenu.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pnlPauseMenu.Controls.Add(this.btnExit);
            this.pnlPauseMenu.Controls.Add(this.btnResume);
            this.pnlPauseMenu.Controls.Add(this.lblPause);
            this.pnlPauseMenu.Location = new System.Drawing.Point(250, 150);
            this.pnlPauseMenu.Name = "pnlPauseMenu";
            this.pnlPauseMenu.Size = new System.Drawing.Size(300, 200);
            this.pnlPauseMenu.TabIndex = 7;
            this.pnlPauseMenu.Visible = false;
            // 
            // lblPause
            // 
            this.lblPause.AutoSize = true;
            this.lblPause.Font = new System.Drawing.Font("Segoe UI", 16F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lblPause.ForeColor = System.Drawing.Color.White;
            this.lblPause.Location = new System.Drawing.Point(100, 20);
            this.lblPause.Name = "lblPause";
            this.lblPause.Size = new System.Drawing.Size(100, 30);
            this.lblPause.TabIndex = 0;
            this.lblPause.Text = "PAUSADO";
            // 
            // btnResume
            // 
            this.btnResume.Location = new System.Drawing.Point(75, 80);
            this.btnResume.Name = "btnResume";
            this.btnResume.Size = new System.Drawing.Size(150, 35);
            this.btnResume.TabIndex = 1;
            this.btnResume.Text = "Continuar";
            this.btnResume.UseVisualStyleBackColor = true;
            this.btnResume.Click += new System.EventHandler(this.btnResume_Click);
            // 
            // btnExit
            // 
            this.btnExit.Location = new System.Drawing.Point(75, 130);
            this.btnExit.Name = "btnExit";
            this.btnExit.Size = new System.Drawing.Size(150, 35);
            this.btnExit.TabIndex = 2;
            this.btnExit.Text = "Salir al Menú Principal";
            this.btnExit.UseVisualStyleBackColor = true;
            this.btnExit.Click += new System.EventHandler(this.btnExit_Click);
            // 
            // pnlTutorial
            // 
            this.pnlTutorial.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(20)))), ((int)(((byte)(40)))), ((int)(((byte)(20)))));
            this.pnlTutorial.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pnlTutorial.Controls.Add(this.btnTutorialOk);
            this.pnlTutorial.Controls.Add(this.lblTutorial);
            this.pnlTutorial.Location = new System.Drawing.Point(200, 180);
            this.pnlTutorial.Name = "pnlTutorial";
            this.pnlTutorial.Size = new System.Drawing.Size(400, 150);
            this.pnlTutorial.TabIndex = 8;
            this.pnlTutorial.Visible = false;
            // 
            // lblTutorial
            // 
            this.lblTutorial.ForeColor = System.Drawing.Color.White;
            this.lblTutorial.Location = new System.Drawing.Point(20, 20);
            this.lblTutorial.Name = "lblTutorial";
            this.lblTutorial.Size = new System.Drawing.Size(360, 60);
            this.lblTutorial.TabIndex = 0;
            this.lblTutorial.Text = "¡Bienvenido! Usa los botones W, A, S, D en pantalla o las flechas de tu teclado para moverte.\n\nRecoge todos los apuntes para poder escapar.";
            this.lblTutorial.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnTutorialOk
            // 
            this.btnTutorialOk.Location = new System.Drawing.Point(140, 100);
            this.btnTutorialOk.Name = "btnTutorialOk";
            this.btnTutorialOk.Size = new System.Drawing.Size(120, 30);
            this.btnTutorialOk.TabIndex = 1;
            this.btnTutorialOk.Text = "¡Entendido!";
            this.btnTutorialOk.UseVisualStyleBackColor = true;
            this.btnTutorialOk.Click += new System.EventHandler(this.btnTutorialOk_Click);
            // 
            // FormJuego
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(820, 600);
            this.Controls.Add(this.pnlTutorial);
            this.Controls.Add(this.pnlPauseMenu);
            this.Controls.Add(this.btnPause);
            this.Controls.Add(this.btnRight);
            this.Controls.Add(this.btnLeft);
            this.Controls.Add(this.btnDown);
            this.Controls.Add(this.btnUp);
            this.Controls.Add(this.pbMaze);
            this.Controls.Add(this.lblStats);
            this.Name = "FormJuego";
            this.Text = "Mazmorras del Estudio - Juego";
            ((System.ComponentModel.ISupportInitialize)(this.pbMaze)).EndInit();
            this.pnlPauseMenu.ResumeLayout(false);
            this.pnlPauseMenu.PerformLayout();
            this.pnlTutorial.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        private System.Windows.Forms.Label lblStats;
        private System.Windows.Forms.PictureBox pbMaze;
        private System.Windows.Forms.Timer gameTimer;
        
        private System.Windows.Forms.Button btnUp;
        private System.Windows.Forms.Button btnDown;
        private System.Windows.Forms.Button btnLeft;
        private System.Windows.Forms.Button btnRight;
        private System.Windows.Forms.Button btnPause;
        
        private System.Windows.Forms.Panel pnlPauseMenu;
        private System.Windows.Forms.Label lblPause;
        private System.Windows.Forms.Button btnResume;
        private System.Windows.Forms.Button btnExit;
        
        private System.Windows.Forms.Panel pnlTutorial;
        private System.Windows.Forms.Label lblTutorial;
        private System.Windows.Forms.Button btnTutorialOk;
    }
}
