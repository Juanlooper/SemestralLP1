import { useState, useEffect } from 'react'
import './index.css'

const slides = [
  {
    id: 0,
    title: "LABERINTO INTERACTIVO CON NIVELES",
    speaker: "Equipo de Desarrollo",
    content: (
      <>
        <p>Proyecto Final - Lenguaje de Programación I</p>
        <p>Presiona [NEXT] o Barra Espaciadora para avanzar.</p>
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <img src="/images/intro_cinematic.png" alt="Laberinto Intro" style={{ maxWidth: '80%', maxHeight: '140px', objectFit: 'contain', borderRadius: '8px' }} />
        </div>
        <p><strong>Integrantes del Equipo:</strong></p>
        <ul>
          <li>Nieves Pérez</li>
          <li>Alejandra Falcón</li>
          <li>Juan Rodríguez</li>
          <li>Miguel Oliver</li>
        </ul>
      </>
    ),
    images: ["/images/menu_background.png", "/images/intro_cinematic_2.png"],
    layout: "grid"
  },
  {
    id: 1,
    title: "SECCION 1: Introducción, Estructura de Datos y Diseño de Niveles",
    speaker: "Miguel Oliver",
    content: (
      <>
        <h3>Introducción</h3>
        <p>El presente proyecto, titulado "Laberinto Interactivo con Niveles", es una aplicación desarrollada en el lenguaje C# bajo la plataforma .NET (Windows Forms), orientada a poner a prueba la lógica, el análisis y el razonamiento espacial del jugador. A través de este entorno interactivo, el usuario debe encontrar la salida de diferentes laberintos progresivamente más complejos, tomando decisiones bajo presión temporal y evitando obstáculos.</p>
        <p>Este proyecto fue concebido y programado haciendo uso estricto de los pilares fundamentales de la algoritmia y programación estructurada: estructuras de datos bidimensionales (matrices), estructuras de control iterativas y condicionales, manejo avanzado de eventos y el paradigma de Programación Orientada a Objetos (POO). A lo largo de este documento, se detallará cómo el sistema cumple de manera íntegra con todos los requisitos solicitados, así como la implementación de funcionalidades adicionales que enriquecen la experiencia.</p>
        
        <h3>Matriz [filas, columnas] y Manejo de Arreglos</h3>
        <p><strong>Explicación Detallada:</strong> El núcleo lógico del mapa reside en la clase <code>Level.cs</code>. Para representar la estructura física de cada laberinto, hemos implementado una matriz bidimensional (arreglo de dos dimensiones <code>int[,] Grid</code>). Este enfoque matricial es fundamental, ya que permite que cada celda de la pantalla represente un valor numérico específico: <code>0</code> para caminos transitables, <code>1</code> para paredes infranqueables, <code>2</code> para coleccionables, <code>3</code> para la salida, entre otros.</p>
        <p>La carga del mapa en memoria es instantánea gracias a un bloque inicializador (<code>new int[10,10]</code>). Posteriormente, <code>FormJuego</code> consume esta información iterando con ciclos <code>for</code> anidados. Al separar la lógica (Modelo) de la interfaz (Vista), el motor gráfico simplemente lee el estado <code>Grid[y, x]</code> en tiempo real, garantizando rendimiento (FPS estables) y evitando recálculos innecesarios.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '10px 0' }}>
          <img src="/images/wall_texture.png" alt="Pared" style={{ width: '40px', height: '40px' }} />
          <img src="/images/floor_texture.png" alt="Suelo" style={{ width: '40px', height: '40px' }} />
          <img src="/images/note_texture.png" alt="Coleccionable" style={{ width: '40px', height: '40px' }} />
        </div>
        
        <p><strong>Evidencia de Código (Renderizado desde la Matriz en FormJuego.cs):</strong></p>
        <pre><code>{`private void pbMaze_Paint(object sender, PaintEventArgs e)
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
}`}</code></pre>

        <h3>Implementación de al menos 3 Niveles (Dificultad Progresiva)</h3>
        <p><strong>Explicación Detallada:</strong> El programa incluye los 3 niveles obligatorios con un diseño pensado en la curva de aprendizaje del jugador, aumentando progresivamente en tamaño, complejidad y cantidad de obstáculos.</p>
        <ul>
          <li><strong>Nivel 1 (Fase Tutorial):</strong> Representado por una matriz de 10x10. Se enfoca en enseñar los controles básicos al jugador mediante un panel gráfico de Tutorial y un entorno con un recorrido directo.</li>
          <li><strong>Nivel 2 (Desafío Intermedio):</strong> Matriz ampliada de 15x15. Introduce rutas no lineales, bifurcaciones y una mayor cantidad de elementos a recolectar.</li>
          <li><strong>Nivel 3 (Laberinto Complejo):</strong> Matriz gigante de 20x20. Se caracteriza por múltiples callejones sin salida y caminos engañosos que desafían la memoria espacial del usuario.</li>
        </ul>
        <p>Cada nivel se carga dinámicamente instanciando un nuevo mapa dentro de nuestra clase manejadora.</p>
        
        <p><strong>Evidencia de Código (Construcción del Nivel 1 y 2 en Level.cs):</strong></p>
        <pre><code>{`switch (levelNumber)
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
}`}</code></pre>
      </>
    ),
    images: ["/images/wall_texture.png", "/images/floor_texture.png"],
    layout: "grid"
  },
  {
    id: 2,
    title: "SECCION 2: Interfaz Gráfica, Controles y Manejo de Eventos",
    speaker: "Juan Rodríguez",
    content: (
      <>
        <h3>Personaje que se mueve con el teclado (y botones)</h3>
        <p><strong>Explicación Detallada:</strong> La interacción usuario-sistema se logró integrando una interfaz gráfica responsiva. Sobreescribiendo el método <code>ProcessCmdKey</code>, interceptamos eventos a nivel de sistema operativo (teclas direccionales y WASD) antes del procesamiento normal del formulario. Esta delegación de lógica al método <code>HandleMove(Direction)</code> de <code>GameManager</code> encapsula perfectamente la responsabilidad.</p>
        <p>El código verifica proactivamente si la celda destino es transitable (<code>targetCell != 1</code>) evaluando las colisiones de manera matemática, lo que previene cruzar paredes o generar errores de límites (IndexOutOfRange) en la matriz principal.</p>
        
        <p><strong>Evidencia de Código (Eventos de Teclado en FormJuego.cs):</strong></p>
        <pre><code>{`// Captura de eventos del teclado en tiempo real
protected override bool ProcessCmdKey(ref Message msg, Keys keyData)
{
    if (_isPaused) return base.ProcessCmdKey(ref msg, keyData); // Validación de estado de pausa

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
}`}</code></pre>

        <h3>Mostrar Tiempo y Número de Pasos (Estadísticas en Tiempo Real)</h3>
        <p><strong>Explicación Detallada:</strong> Mantener al jugador informado de su progreso es crucial para la experiencia de juego. Por ello, se implementó un sistema de actualización de estadísticas que combina las propiedades del temporizador (<code>Timer</code> tick) y variables de estado internas. Cada segundo, o cada vez que el jugador da un paso, se actualizan las etiquetas (<code>Label</code>) de la interfaz, concatenando cadenas de texto (<code>string interpolation</code>) con el nivel actual, elementos recolectados, pasos totales y tiempo en segundos.</p>
        
        <p><strong>Evidencia de Código (FormJuego.cs):</strong></p>
        <pre><code>{`private void gameTimer_Tick(object sender, EventArgs e)
{
    _gameManager.TimeElapsedSeconds++;
    UpdateStats();
}

private void UpdateStats()
{
    lblStats.Text = $"Nivel: {_gameManager.CurrentLevelNumber} | Apuntes: {_gameManager.StarsCollected}/{_gameManager.CurrentLevel.TotalStars} | Pasos: {_gameManager.Steps} | Tiempo: {_gameManager.TimeElapsedSeconds}s";
}`}</code></pre>

        <h3>Puntos de Inicio y Salida Estructurados</h3>
        <p>
          <img src="/images/exit_texture.png" alt="Meta" style={{ width: '60px', height: '60px', float: 'right', margin: '0 0 10px 15px', borderRadius: '5px' }} />
          <strong>Explicación Detallada:</strong> Para asegurar la cohesión lógica de los niveles, cada laberinto define estrictamente su punto de aparición (Spawn) y su meta. Se utilizaron variables de tipo <code>Point</code> (estructuras que almacenan X e Y) para registrar estas coordenadas. Durante el método de movimiento, el <code>GameManager</code> valida constantemente la posición futura del jugador contra las coordenadas de la meta, garantizando una transición impecable hacia la victoria cuando ambas coordenadas coinciden.
        </p>
        <p><strong>Evidencia de Código (Level.cs y GameManager.cs):</strong></p>
        <pre><code>{`// Constructor de Nivel (Level.cs)
StartPosition = new Point(1, 1);
ExitPosition = new Point(8, 8); // Coordenada de victoria dictada en la matriz

// Validación Lógica en cada paso de MovePlayer (GameManager.cs)
if (targetCell == 3) // La celda 3 representa la Salida en la matriz
{
    CheckWinCondition(); // Ejecuta lógica de victoria y avance
}`}</code></pre>
      </>
    ),
    images: ["/images/default_avatar.png", "/images/exit_texture.png"],
    layout: "grid"
  },
  {
    id: 3,
    title: "SECCION 3: Lógica Avanzada, Inteligencia Artificial y Mecánicas de Juego",
    speaker: "Nieves Pérez",
    content: (
      <>
        <h3>Recolección de Apuntes (Core Gameplay)</h3>
        <p><strong>Explicación Detallada:</strong> Para evitar que el usuario se dirija únicamente a la salida, se añadieron objetos coleccionables esparcidos por el mapa (representados por el número 2 en la matriz lógica). Al colisionar con estas celdas, el sistema actualiza contadores internos y sobrescribe el valor de la matriz a 0 (camino vacío), haciendo desaparecer visual y lógicamente el objeto en el siguiente cuadro de renderizado.</p>
        <p><strong>Evidencia de Código (GameManager.cs):</strong></p>
        <pre><code>{`if (targetCell == 2) 
{
    StarsCollected++; // Registra la recolección en los datos del jugador
    CurrentLevel.Grid[newY, newX] = 0; // Remueve el ítem volviéndolo camino vacío permanentemente
}`}</code></pre>

        <h3>Interacciones con Trampas y Potenciadores Dinámicos</h3>
        <p><strong>Explicación Detallada:</strong> Elevando el desafío, se incluyeron celdas especiales: trampas ocultas (<code>4</code>) y potenciadores estratégicos (<code>5</code>). Pisar una trampa provoca una penalización directa (acelera al enemigo enojándolo), mientras que el potenciador otorga un respiro al jugador congelando las amenazas temporalmente. Esto requiere manipulación directa de propiedades del sistema (como modificar el <code>.Interval</code> de un temporizador).</p>
        <p><strong>Evidencia de Código (GameManager.cs):</strong></p>
        <pre><code>{`else if (targetCell == 4) // TRAMPA (Maldición)
{
    CurrentLevel.Grid[newY, newX] = 0;
    _enemyTimer.Interval = Math.Max(200, _enemyTimer.Interval - 100); // Acelera drásticamente al enemigo
}
else if (targetCell == 5) // POTENCIADOR (Boost)
{
    CurrentLevel.Grid[newY, newX] = 0;
    _enemyFrozenTime = 5; // Congela al enemigo durante 5 ciclos lógicos
}`}</code></pre>

        <h3>Enemigo Inteligente (Inteligencia Artificial Básica)</h3>
        <p><strong>Explicación Detallada:</strong> En los niveles superiores, un enemigo activo en el mapa busca alcanzar al jugador. Programado con un <code>Timer</code> asíncrono, evalúa continuamente las coordenadas del jugador y decide su siguiente movimiento para acortar la distancia, asegurándose de evitar paredes. Esta mecánica simula algoritmos de persecución (como BFS o evaluación heurística simple) e instaura un factor de estrés positivo.</p>
        <p><strong>Evidencia de Código (GameManager.cs):</strong></p>
        <pre><code>{`private void MoveEnemy()
{
    // ... Cálculo de posición buscando acortar la distancia X, Y con el jugador ...
    
    // Condición de Choque mortal (Game Over):
    if (EnemyPosition == new Point(Player1.X, Player1.Y))
    {
        OnLevelCompleted?.Invoke(false); // Dispara el evento de fracaso
    }
}`}</code></pre>

        <h3>Niebla de Guerra y Nivel Oculto (Modo Hardcore)</h3>
        <p><strong>Explicación Detallada:</strong> Para jugadores veteranos, se implementó un modo "Hardcore". Activar este modo habilita un efecto de "Niebla de Guerra", donde solo un radio visible alrededor del jugador se dibuja de forma normal. Las celdas más allá de este límite (calculado mediante la fórmula de distancia euclidiana) se cubren de oscuridad (renderizadas en negro). Superar el juego en estas condiciones desbloquea un masivo Nivel 4 de 25x25.</p>
        <p><strong>Evidencia de Código (FormJuego.cs y Level.cs):</strong></p>
        <pre><code>{`// NIEBLA DE GUERRA EN EVENTO PAINT DE FORM JUEGO
if (_isHardcore)
{
    // Teorema de Pitágoras: Cálculo de Distancia geométrica del jugador a la celda a dibujar
    double distance = Math.Sqrt(Math.Pow(x - _gameManager.Player1.X, 2) + Math.Pow(y - _gameManager.Player1.Y, 2));
    if (distance > FogRadius)
    {
        e.Graphics.FillRectangle(Brushes.Black, rect); // Ciega al usuario dibujando un cuadro negro sobre la textura
    }
}

// NIVEL 4 OCULTO EN LEVEL.CS
case 4:
    Grid = new int[25, 25] { /* ... Matriz inmensa omitida ... */ }; 
    TotalStars = 8;
    break;`}</code></pre>
      </>
    ),
    image: "/images/boss_texture.png",
    layout: "grid"
  },
  {
    id: 4,
    title: "SECCION 4: Multimedia, Personalización y Finales Múltiples",
    speaker: "Alejandra Falcón",
    content: (
      <>
        <h3>Subida de Avatar Personalizado (Gestión de Archivos Locales)</h3>
        <p>
          <img src="/images/default_avatar.png" alt="Avatar" style={{ width: '70px', height: '70px', float: 'left', margin: '0 15px 10px 0', borderRadius: '50%' }} />
          <strong>Explicación Detallada:</strong> Se le otorga identidad al jugador permitiendo personalizar su representación visual. Mediante el uso de componentes del sistema operativo (<code>OpenFileDialog</code>), el software permite navegar por el disco duro del usuario, aplicar filtros de extensión (<code>.png</code>, <code>.jpg</code>) y cargar un archivo gráfico a la memoria RAM de la aplicación, utilizándolo dinámicamente durante el juego.
        </p>
        <p><strong>Evidencia de Código (FormMenu.cs):</strong></p>
        <pre><code>{`private void btnUploadAvatar_Click(object sender, EventArgs e)
{
    using (OpenFileDialog ofd = new OpenFileDialog())
    {
        ofd.Filter = "Archivos de Imagen|*.jpg;*.jpeg;*.png;*.bmp";
        if (ofd.ShowDialog() == DialogResult.OK)
        {
            _avatarImage = Image.FromFile(ofd.FileName); // Carga la imagen local en un objeto Image
            pbAvatar.Image = _avatarImage; // Actualiza la vista previa en el menú
        }
    }
}`}</code></pre>

        <h3>Texturas y Efecto Visual Pulsante (Renderizado Dinámico)</h3>
        <p><strong>Explicación Detallada:</strong> Rompiendo con la monotonía de cuadros estáticos, la casilla de salida emplea un cálculo senoidal para crear una ilusión óptica de pulsación (Glow Effect). Esto se logra alterando las dimensiones de la imagen (escalado) en el método de dibujo, creando dinamismo visual sin la necesidad de usar costosos motores de render 3D.</p>
        <p><strong>Evidencia de Código (FormJuego.cs):</strong></p>
        <pre><code>{`// Escalado de la salida (Meta) con un efecto tipo 'Glow' animado por tiempo
int targetSize = (int)(CellSize * _glowScale);
int offset = (CellSize - targetSize) / 2; // Centrado matemático del rectángulo escalado
Rectangle targetRect = new Rectangle(x * CellSize + offset, y * CellSize + offset, targetSize, targetSize);
e.Graphics.DrawImage(Properties.Resources.salida, targetRect); // Dibuja la textura animada en pantalla`}</code></pre>

        <h3>Sistema de Audio Integrado</h3>
        <p><strong>Explicación Detallada:</strong> Utilizando la clase nativa <code>System.Media.SoundPlayer</code> dentro de un envoltorio <code>AudioPlayer</code>, logramos que los sonidos se ejecuten sin bloquear el hilo principal (UI Thread). Al invocar <code>PlayLooping()</code>, la música funciona asíncronamente en segundo plano. Esto asegura que el sistema no presente tirones gráficos mientras decodifica el audio (streams de bytes cargados en memoria).</p>
        <p><strong>Evidencia de Código (AudioPlayer.cs):</strong></p>
        <pre><code>{`public void PlayMusic()
{
    _musicPlayer.Stream = Properties.Resources.scary_music;
    _musicPlayer.PlayLooping(); // Ejecuta la pista en repetición infinita en un hilo secundario
}`}</code></pre>

        <h3>Pantallas de Historia y Múltiples Desenlaces (FormHistoria)</h3>
        <p><strong>Explicación Detallada:</strong> Añadiendo una capa narrativa al proyecto, el juego evalúa el estado del jugador al concluir los niveles. Si el sistema detecta que el jugador recogió el 100% de los elementos disponibles, instancia el formulario de conclusión enviando un parámetro booleano de éxito total (<code>perfectEnding = true</code>), desencadenando un mensaje de victoria óptima. De lo contrario, desencadena un final alternativo.</p>
        <p><strong>Evidencia de Código (FormHistoria.cs):</strong></p>
        <pre><code>{`public FormHistoria(bool perfectEnding)
{
    InitializeComponent();
    
    // Decisión narrativa basada en el parámetro pasado al constructor
    if (perfectEnding)
        txtStory.Text = "¡Felicidades! Lograste encontrar todos los apuntes perdidos, tu semestre está salvado.";
    else
        txtStory.Text = "Lograste escapar con vida, pero te faltaron apuntes de clase por recuperar. Tendrás que esforzarte más en el examen.";
}`}</code></pre>
      </>
    ),
    images: ["/images/outro_cinematic.png", "/images/note_texture.png"],
    layout: "grid"
  },
  {
    id: 5,
    title: "CONCLUSIÓN Y CIERRE",
    speaker: "Equipo",
    content: (
      <>
        <h3>Explicación Técnica y Conclusión</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '15px 0' }}>
          <img src="/images/intro_cinematic_2.png" alt="Diseño" style={{ height: '140px', borderRadius: '8px' }} />
          <img src="/images/outro_cinematic.png" alt="Victoria" style={{ height: '140px', borderRadius: '8px' }} />
        </div>
        <p>A nivel de código, el motor lógico está centralizado en el manejo exhaustivo de <strong>matrices bidimensionales</strong> (<code>int[,] Grid</code> en <code>Level.cs</code>). Cada nivel se dibuja iterando con bucles anidados para ubicar texturas según el valor numérico correspondiente.</p>
        <p>A través de <strong>POO</strong>, interactúan clases específicas: <code>Player</code> encapsula coordenadas y estado, <code>Level</code> gestiona el mapa y condiciones de victoria, mientras <code>GameManager</code> administra reglas como IA enemiga con temporizadores y colisiones. Así, logramos una arquitectura limpia, modular y basada en eventos.</p>
        
        <h3>Tecnologías Empleadas</h3>
        <ul>
          <li>Lenguaje: C# 12.0 | Framework: .NET 8.0 (Windows Forms)</li>
          <li>Arquitectura: POO, Programación Basada en Eventos</li>
        </ul>
        <p><strong>¡GRACIAS POR SU ATENCIÓN!</strong></p>
      </>
    ),
    image: "/images/conclusion.png",
    layout: "single"
  }
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Escuchar flechas de teclado para cambiar slide
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentSlide < slides.length - 1) setCurrentSlide(c => c + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentSlide > 0) setCurrentSlide(c => c - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(c => c + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(c => c - 1);
  };

  const slide = slides[currentSlide];

  return (
    <>
      <div className="scanlines"></div>
      <div className="slide-container" key={slide.id}>
        
        <div className={`presentation-card ${slide.layout === 'single' ? 'single-col' : ''}`}>
          {slide.customLayout ? (
             <slide.customLayout slide={slide} />
          ) : (
            <>
              <div className="card-content">
                <div className="speaker-badge">{slide.speaker}</div>
                <h2>{slide.title}</h2>
                {slide.content}
              </div>
              
              {slide.layout === 'grid' && (
                <div className="card-image" style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%', minHeight: 0 }}>
                  {slide.images ? slide.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`${slide.title} ${idx}`} style={{ borderRadius: '8px', flex: 1, minHeight: 0, objectFit: 'contain', width: '100%' }} />
                  )) : (
                    <img src={slide.image} alt={slide.title} style={{ borderRadius: '8px', flex: 1, minHeight: 0, objectFit: 'contain', width: '100%' }} />
                  )}
                </div>
              )}

              {slide.layout === 'single' && (
                 <div className="card-image" style={{marginTop: '10px'}}>
                   {slide.images ? slide.images.map((img, idx) => (
                     <img key={idx} src={img} alt={`${slide.title} ${idx}`} style={{maxHeight: '120px', margin: '0 10px'}}/>
                   )) : (
                     <img src={slide.image} alt={slide.title} style={{maxHeight: '120px'}}/>
                   )}
                 </div>
              )}
            </>
          )}
        </div>

        <div className="controls">
          <button onClick={prevSlide} disabled={currentSlide === 0}>&lt; PREV</button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1}>NEXT &gt;</button>
        </div>

      </div>
    </>
  )
}

export default App
