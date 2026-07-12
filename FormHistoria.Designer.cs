namespace LaberintoInteractivo
{
    partial class FormHistoria
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
            this.lblStory = new System.Windows.Forms.Label();
            this.btnSkip = new System.Windows.Forms.Button();
            this.typeTimer = new System.Windows.Forms.Timer(this.components);
            this.SuspendLayout();
            // 
            // lblStory
            // 
            this.lblStory.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lblStory.Font = new System.Drawing.Font("Consolas", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lblStory.Location = new System.Drawing.Point(50, 50);
            this.lblStory.Name = "lblStory";
            this.lblStory.Size = new System.Drawing.Size(700, 400);
            this.lblStory.TabIndex = 0;
            this.lblStory.Text = "Story Text";
            this.lblStory.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnSkip
            // 
            this.btnSkip.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnSkip.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(40)))), ((int)(((byte)(40)))), ((int)(((byte)(40)))));
            this.btnSkip.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnSkip.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnSkip.ForeColor = System.Drawing.Color.White;
            this.btnSkip.Location = new System.Drawing.Point(630, 500);
            this.btnSkip.Name = "btnSkip";
            this.btnSkip.Size = new System.Drawing.Size(120, 40);
            this.btnSkip.TabIndex = 1;
            this.btnSkip.Text = "Omitir";
            this.btnSkip.UseVisualStyleBackColor = false;
            this.btnSkip.Click += new System.EventHandler(this.btnSkip_Click);
            // 
            // typeTimer
            // 
            this.typeTimer.Tick += new System.EventHandler(this.typeTimer_Tick);
            // 
            // FormHistoria
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 600);
            this.Controls.Add(this.btnSkip);
            this.Controls.Add(this.lblStory);
            this.Name = "FormHistoria";
            this.Text = "Cinemática Inicial";
            this.ResumeLayout(false);

        }

        private System.Windows.Forms.Label lblStory;
        private System.Windows.Forms.Button btnSkip;
        private System.Windows.Forms.Timer typeTimer;
    }
}
