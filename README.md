# Proyecto Final: Laberinto Interactivo con Niveles

**Integrantes del Equipo:**
- Nieves Pérez
- Alejandra Falcón
- Juan Rodríguez
- Miguel Oliver

---

## SECCION 1: Introduccion, Estructura de Datos y Diseño de Niveles

### Introduccion
El presente proyecto, titulado "Laberinto Interactivo con Niveles", es una aplicación desarrollada en C# orientada a poner a prueba la lógica, el análisis y el razonamiento espacial del jugador. A través de este entorno interactivo, el usuario debe encontrar la salida de diferentes laberintos progresivamente más complejos, tomando decisiones bajo presión temporal. El proyecto fue concebido y programado haciendo uso de los pilares fundamentales de la algoritmia: estructuras de datos bidimensionales (matrices), estructuras de control, manejo avanzado de eventos y Programación Orientada a Objetos. 

A continuación, se detalla cómo el sistema cumple de manera estricta con todos los requisitos, así como la implementación de funcionalidades adicionales.

### Matriz [filas, columnas] y Manejo de Arreglos
Explicación: El corazón del mapa reside en la clase `Level.cs`. Para representar la estructura del laberinto, se utiliza una matriz bidimensional (`int[,] Grid`). Este enfoque matricial permite que cada celda de la pantalla represente un valor numérico: `0` para caminos y `1` para paredes. El motor gráfico recorre esta matriz mediante ciclos `for` anidados para dibujar el entorno.

Evidencia de Código (Renderizado desde la Matriz en `FormJuego.cs`):
```csharp
private void pbMaze_Paint(object sender, PaintEventArgs e)
{
    // Iteración sobre el arreglo bidimensional
    for (int y = 0; y < _gameManager.CurrentLevel.Rows; y++)
    {
        for (int x = 0; x < _gameManager.CurrentLevel.Columns; x++)
        {
            int cellValue = _gameManager.CurrentLevel.Grid[y, x];
            Rectangle rect = new Rectangle(x * CellSize, y * CellSize, CellSize, CellSize);
            
            if (cellValue == 1) // Si el valor en la matriz es 1, dibuja pared
                e.Graphics.DrawImage(_wallTexture, rect);
            else if (cellValue == 2) // Si es 2, dibuja un apunte a recolectar
                e.Graphics.DrawImage(Properties.Resources.apunte, rect);
        }
    }
}
```

### Implementacion de al menos 3 Niveles (Dificultad Progresiva)
Explicación: El programa incluye los 3 niveles obligatorios, aumentando en tamaño y obstáculos.
- Nivel 1 (Laberinto pequeño): Matriz de 10x10. Se enfoca en enseñar controles mediante un panel gráfico de Tutorial.
- Nivel 2 (Más obstáculos): Matriz de 15x15. Introduce rutas no lineales.
- Nivel 3 (Caminos engañosos): Matriz gigante de 20x20 llena de callejones sin salida.

Evidencia de Código (Construcción del Nivel 1 y 2 en `Level.cs`):
```csharp
switch (levelNumber)
{
    case 1:
        Grid = new int[10, 10]
        {
            { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
            { 1, 0, 0, 0, 1, 2, 0, 0, 0, 1 }, 
            { 1, 0, 1, 0, 1, 0, 1, 1, 0, 1 },
            { 1, 0, 1, 0, 0, 0, 0, 1, 0, 1 },
            { 1, 0, 1, 1, 1, 1, 0, 1, 0, 1 },
            { 1, 0, 0, 0, 0, 1, 0, 0, 0, 1 },
            { 1, 1, 1, 1, 0, 1, 1, 1, 0, 1 },
            { 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 },
            { 1, 1, 1, 1, 1, 1, 1, 1, 3, 1 },
            { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 }
        };
        StartPosition = new Point(1, 1);
        ExitPosition = new Point(8, 8);
        break;
        
    case 2:
        Grid = new int[15, 15] // Matriz más amplia con múltiples desvíos
        {
            { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
            { 1, 0, 0, 0, 1, 2, 0, 0, 0, 4, 0, 0, 1, 0, 1 },
            { 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1 },
            // ... (Se iteran 15 filas)
        };
        StartPosition = new Point(1, 1);
        ExitPosition = new Point(13, 13);
        break;
}
```

---

## SECCION 2: Interfaz Grafica, Controles y Manejo de Eventos

### Personaje que se mueve con el teclado (y botones)
Explicación: Se implementó una interfaz gráfica mediante Windows Forms que detecta interacciones en tiempo real. Mediante la sobreescritura del método `ProcessCmdKey`, la aplicación captura las flechas del teclado (y W,A,S,D) e invoca la lógica de movimiento. Se incluyeron además botones visuales clickeables.

Evidencia de Código (Eventos de Teclado en `FormJuego.cs`):
```csharp
// Captura de eventos del teclado en tiempo real
protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
{
    if (_isPaused) return base.ProcessCmdKey(ref msg, keyData); // Validación de estado

    if (_gameManager.CurrentLevel != null)
    {
        switch (keyData)
        {
            case Keys.Up: 
            case Keys.W: HandleMove(Direction.Up); return true;
            case Keys.Down: 
            case Keys.S: HandleMove(Direction.Down); return true;
        }
    }
    return base.ProcessCmdKey(ref msg, keyData);
}
```

### Mostrar Tiempo y Numero de Pasos (Estadisticas)
Explicación: Se actualiza una etiqueta en la interfaz visual (`Label`) combinando las propiedades numéricas del cronómetro y los contadores en cada turno o segundo transcurrido.

Evidencia de Código (`FormJuego.cs`):
```csharp
private void gameTimer_Tick(object sender, EventArgs e)
{
    _gameManager.TimeElapsedSeconds++;
    UpdateStats();
}

private void UpdateStats()
{
    lblStats.Text = $"Nivel: {_gameManager.CurrentLevelNumber} | Apuntes: {_gameManager.StarsCollected}/{_gameManager.CurrentLevel.TotalStars} | Pasos: {_gameManager.Steps} | Tiempo: {_gameManager.TimeElapsedSeconds}s";
}
```

### Puntos de Inicio y Salida
Explicación: Se requiere que cada laberinto tenga un punto donde nace el jugador y una meta. Se utilizaron variables tipo `Point` para guardar estas coordenadas lógicas. En cada movimiento, la POO permite a `GameManager` validar si el usuario llegó a la coordenada de salida.

Evidencia de Código (`Level.cs` y `GameManager.cs`):
```csharp
// Constructor de Nivel (Level.cs)
StartPosition = new Point(1, 1);
ExitPosition = new Point(8, 8); // Coordenada de victoria dictada en la matriz

// Validación Lógica en cada paso de MovePlayer (GameManager.cs)
if (targetCell == 3) // La celda 3 representa la Salida en la matriz
{
    CheckWinCondition(); // Ejecuta lógica de victoria y avance
}
```

---

## SECCION 3: Logica Avanzada, Inteligencia Artificial y Mecanicas de Juego

### Recoleccion de Apuntes (Logica de Juego)
Explicación: Se obliga al jugador a explorar buscando elementos coleccionables (representados por el número 2 en la matriz). 
Evidencia de Código (`GameManager.cs`):
```csharp
if (targetCell == 2) 
{
    StarsCollected++; // Registra la recolección
    CurrentLevel.Grid[newY, newX] = 0; // Remueve el ítem volviéndolo camino vacío
}
```

### Interacciones con Trampas y Potenciadores
Explicación: El jugador pisa celdas trampa (`4`) que enojan al enemigo acelerándolo, o toma potenciadores (`5`) que congelan temporalmente al enemigo.
Evidencia de Código (`GameManager.cs`):
```csharp
else if (targetCell == 4) // TRAMPA (Maldición)
{
    CurrentLevel.Grid[newY, newX] = 0;
    _enemyTimer.Interval = Math.Max(200, _enemyTimer.Interval - 100); // Acelera al enemigo
}
else if (targetCell == 5) // POTENCIADOR (Boost)
{
    CurrentLevel.Grid[newY, newX] = 0;
    _enemyFrozenTime = 5; // Congela al enemigo 5 turnos
}
```

### Enemigo Inteligente (Monstruo Acosador)
Explicación: Un enemigo en constante movimiento utiliza algoritmos (como BFS) dentro de un `Timer` independiente para encontrar el camino al jugador esquivando las paredes de la matriz.
Evidencia de Código (`GameManager.cs`):
```csharp
private void MoveEnemy()
{
    // ... Cálculo de posición buscando al jugador ...
    // Choque mortal:
    if (EnemyPosition == new Point(Player1.X, Player1.Y))
    {
        OnLevelCompleted?.Invoke(false); // Dispara Game Over
    }
}
```

### Niebla de Guerra y Nivel Oculto Hardcore
Explicación: Hay una variable modo Hardcore. Si se activa, las zonas alejadas del jugador se pintan de negro calculando la distancia euclidiana. Adicionalmente desbloquea un Nivel 4 hiper complejo de 25x25.
Evidencia de Código (`FormJuego.cs` y `Level.cs`):
```csharp
// NIEBLA DE GUERRA EN FORM JUEGO
if (_isHardcore)
{
    // Teorema de pitágoras: Distancia geométrica al jugador
    double distance = Math.Sqrt(Math.Pow(x - _gameManager.Player1.X, 2) + Math.Pow(y - _gameManager.Player1.Y, 2));
    if (distance > FogRadius)
    {
        e.Graphics.FillRectangle(Brushes.Black, rect); // Ciega al usuario
    }
}

// NIVEL 4 OCULTO EN LEVEL.CS
case 4:
    Grid = new int[25, 25] { /* ... */ }; // Matriz inmensa
    TotalStars = 8;
    break;
```

---

## SECCION 4: Multimedia, Personalizacion y Finales Multiples

### Subida de Avatar Personalizado (Pantalla de Menu)
Explicación: En la pantalla `FormMenu`, el jugador no está limitado a un ícono fijo. Puede importar imágenes en formato JPG/PNG desde su PC y jugar con ellas.
Evidencia de Código (`FormMenu.cs`):
```csharp
private void btnUploadAvatar_Click(object sender, EventArgs e)
{
    using (OpenFileDialog ofd = new OpenFileDialog())
    {
        ofd.Filter = "Image Files|*.jpg;*.jpeg;*.png;*.bmp";
        if (ofd.ShowDialog() == DialogResult.OK)
        {
            _avatarImage = Image.FromFile(ofd.FileName); // Carga la imagen local
            pbAvatar.Image = _avatarImage; 
        }
    }
}
```

### Texturas y Efecto Visual Pulsante (Pantalla de Juego)
Explicación: En lugar de colores sólidos, dibujamos imágenes que se escalan dinámicamente. La meta incluye una lógica matemática senoidal para contraerse y expandirse (Glow effect).
Evidencia de Código (`FormJuego.cs`):
```csharp
// Escalado de la salida (Meta) con un efecto tipo 'Glow'
int targetSize = (int)(CellSize * _glowScale);
int offset = (CellSize - targetSize) / 2;
Rectangle targetRect = new Rectangle(x * CellSize + offset, y * CellSize + offset, targetSize, targetSize);
e.Graphics.DrawImage(Properties.Resources.salida, targetRect); // Dibuja la textura animada
```

### Sistema de Audio y Banda Sonora
Explicación: Implementación nativa de `System.Media.SoundPlayer` para música de fondo en los niveles y efectos de terror en situaciones críticas.
Evidencia de Código (`AudioPlayer.cs`):
```csharp
public void PlayMusic()
{
    _musicPlayer.Stream = Properties.Resources.scary_music;
    _musicPlayer.PlayLooping();
}
```

### Pantallas de Historia y Finales Multiples (`FormHistoria`)
Explicación: Se añadió una pantalla cinemática al final. Revisa el estado de la partida terminada (Si el jugador logró reunir el 100% de apuntes) y carga un final "Perfecto" o un final "Normal" alentando la rejugabilidad.
Evidencia de Código (`FormHistoria.cs`):
```csharp
public FormHistoria(bool perfectEnding)
{
    InitializeComponent();
    
    if (perfectEnding)
        txtStory.Text = "¡Felicidades! Lograste encontrar todos los apuntes perdidos...";
    else
        txtStory.Text = "Lograste escapar con vida, pero te faltaron apuntes de clase por recuperar...";
}
```

---

## Conclusion
El desarrollo de este "Laberinto Interactivo con Niveles" ha demostrado de manera práctica la importancia de comprender y aplicar correctamente las estructuras de datos, específicamente las matrices bidimensionales, en el diseño de entornos virtuales y videojuegos lógicos. Se logró cumplir con éxito todos los objetivos propuestos, integrando una interfaz gráfica intuitiva mediante Windows Forms, control de eventos en tiempo real y el uso de la Programación Orientada a Objetos para mantener un código limpio, modular y escalable. Además de los requisitos obligatorios, el equipo logró implementar mecánicas avanzadas como la inteligencia artificial del enemigo (Pathfinding) y efectos visuales inmersivos, lo cual enriquece notablemente la experiencia del usuario final. Este proyecto sirvió para consolidar nuestros conocimientos en C# y darnos una visión profunda de cómo se estructura la lógica detrás del software interactivo.

## Referencias Bibliograficas
1. Microsoft Corporation. (2023). *Documentación de C# y .NET*. Recuperado de https://learn.microsoft.com/es-es/dotnet/csharp/
2. Microsoft Corporation. (2023). *Windows Forms Documentation*. Recuperado de https://learn.microsoft.com/es-es/dotnet/desktop/winforms/
3. Albahari, J., & Albahari, B. (2022). *C# 10 in a Nutshell: The Definitive Reference*. O'Reilly Media.
4. Freeman, A. (2020). *Pro C# 9 with .NET 5: Foundational Principles and Practices in Programming*. Apress.

---

## Tecnologias y Entorno de Trabajo
- Lenguaje: C#
- Framework: .NET (Windows Forms)
- IDE: Visual Studio / Entorno de desarrollo de C#
