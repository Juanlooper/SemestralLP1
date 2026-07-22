import { useState, useEffect, useRef } from 'react'
import './index.css'

// ----------------------------------------------------
// COMPONENTES PERSONALIZADOS Y ANIMACIONES
// ----------------------------------------------------

function MatrixVisualizer() {
  const grid = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 4, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 5, 0, 0, 1],
    [1, 1, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ];

  const cellColors = { 0: '#222', 1: '#666', 2: '#ffcc00', 3: '#00ff00', 4: '#800080', 5: '#ffd700' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 40px)`, gap: '2px', backgroundColor: '#000', padding: '5px', border: '4px solid #a0d4ff', boxShadow: '0px 0px 20px rgba(0, 255, 0, 0.1)' }}>
        {grid.map((row, y) => row.map((cell, x) => (
          <div key={`${x}-${y}`} style={{ width: '40px', height: '40px', backgroundColor: cellColors[cell], display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: cell === 0 ? '#444' : '#fff', fontFamily: 'monospace', fontSize: '14px', border: cell === 0 ? '1px dashed #333' : 'none' }}>
            {cell}
          </div>
        )))}
      </div>
      
      <div style={{ marginTop: '25px', textAlign: 'left', backgroundColor: 'rgba(0,0,0,0.8)', padding: '15px', border: '2px solid #fce300', width: '90%' }}>
         <h4 style={{margin: '0 0 10px 0', color: '#fce300'}}>Leyenda (targetCell)</h4>
         <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap:'10px', fontSize: '11px', color: '#fff'}}>
           <div><span style={{color: cellColors[0], fontSize: '16px'}}>■</span> 0: Espacio</div>
           <div><span style={{color: cellColors[1], fontSize: '16px'}}>■</span> 1: Pared</div>
           <div><span style={{color: cellColors[2], fontSize: '16px'}}>■</span> 2: Apunte</div>
           <div><span style={{color: cellColors[3], fontSize: '16px'}}>■</span> 3: Salida</div>
           <div><span style={{color: cellColors[4], fontSize: '16px'}}>■</span> 4: Trampa</div>
           <div><span style={{color: cellColors[5], fontSize: '16px'}}>■</span> 5: Boost</div>
         </div>
      </div>
    </div>
  );
}

function AnimatedItemsVisualizer() {
  const initialGrid = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 4, 0, 1],
    [1, 1, 1, 0, 5, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ];

  const cellColors = { 0: '#222', 1: '#666', 2: '#ffcc00', 3: '#00ff00', 4: '#800080', 5: '#ffd700' };

  const [grid, setGrid] = useState(initialGrid);
  const [playerPos, setPlayerPos] = useState({x: 1, y: 1});
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
         setPlayerPos({x: 2, y: 1});
         setGrid(g => { const ng = g.map(r=>[...r]); ng[1][2]=0; return ng; });
         setPopup({text: '+1 Apunte!', color: '#ffcc00'});
      }
      else if (step === 2) { setPopup(null); setPlayerPos({x: 2, y: 2}); }
      else if (step === 3) { setPlayerPos({x: 2, y: 3}); }
      else if (step === 4) { setPlayerPos({x: 3, y: 3}); }
      else if (step === 5) {
         setPlayerPos({x: 4, y: 3});
         setGrid(g => { const ng = g.map(r=>[...r]); ng[3][4]=0; return ng; });
         setPopup({text: 'Boss Speed = 2!', color: '#ff88ff'}); 
      }
      else if (step === 6) {
         setPopup(null);
         setPlayerPos({x: 4, y: 4});
         setGrid(g => { const ng = g.map(r=>[...r]); ng[4][4]=0; return ng; });
         setPopup({text: 'Boss Congelado!', color: '#ffd700'});
      }
      else if (step === 8) {
         setPopup(null);
         setPlayerPos({x: 1, y: 1});
         setGrid(initialGrid);
         step = 0;
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease', position: 'relative' }}>
      <h3 style={{color: '#ffcc00', textShadow: '2px 2px 0px #b20000'}}>Simulación de Ítems</h3>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 40px)`, gap: '2px', backgroundColor: '#000', padding: '5px', border: '4px solid #ffcc00', boxShadow: '0px 0px 20px rgba(255, 204, 0, 0.2)' }}>
        {grid.map((row, y) => row.map((cell, x) => (
          <div key={`${x}-${y}`} style={{ width: '40px', height: '40px', backgroundColor: cellColors[cell], display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: cell === 0 ? '#444' : '#fff', fontFamily: 'monospace', position: 'relative' }}>
            {cell !== 0 && cell !== 1 && cell}
            {playerPos.x === x && playerPos.y === y && (
              <div style={{width: '24px', height: '24px', backgroundColor: '#00f', borderRadius: '50%', boxShadow: '0 0 10px #00f', position: 'absolute', transition: 'all 0.3s ease'}}></div>
            )}
          </div>
        )))}
      </div>
      
      <div style={{height: '40px', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {popup && (
          <div style={{ color: popup.color, fontSize: '18px', fontWeight: 'bold', animation: 'fadeIn 0.3s ease', textShadow: '2px 2px 0 #000' }}>
            {popup.text}
          </div>
        )}
      </div>
    </div>
  );
}

function AnimatedBFSVisualizer() {
  const grid = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ];

  const [wave, setWave] = useState([]);
  const [path, setPath] = useState([]);
  const [bossPos, setBossPos] = useState({x: 5, y: 4});
  const playerPos = {x: 1, y: 1};

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) { setWave([{x:1, y:1}]); } 
      else if (step === 2) { setWave([{x:1,y:1}, {x:2,y:1}, {x:1,y:2}]); } 
      else if (step === 3) { setWave([{x:1,y:1}, {x:2,y:1}, {x:1,y:2}, {x:3,y:1}, {x:1,y:3}]); } 
      else if (step === 4) { setWave([{x:1,y:1}, {x:2,y:1}, {x:1,y:2}, {x:3,y:1}, {x:1,y:3}, {x:3,y:2}, {x:1,y:4}]); } 
      else if (step === 5) { setWave([{x:1,y:1}, {x:2,y:1}, {x:1,y:2}, {x:3,y:1}, {x:1,y:3}, {x:3,y:2}, {x:1,y:4}, {x:3,y:3}]); } 
      else if (step === 6) { setWave([{x:1,y:1}, {x:2,y:1}, {x:1,y:2}, {x:3,y:1}, {x:1,y:3}, {x:3,y:2}, {x:1,y:4}, {x:3,y:3}, {x:4,y:3}]); } 
      else if (step === 7) { setWave([{x:1,y:1}, {x:2,y:1}, {x:1,y:2}, {x:3,y:1}, {x:1,y:3}, {x:3,y:2}, {x:1,y:4}, {x:3,y:3}, {x:4,y:3}, {x:5,y:3}]); } 
      else if (step === 8) { 
         setPath([{x:2,y:1}, {x:3,y:1}, {x:3,y:2}, {x:3,y:3}, {x:4,y:3}, {x:5,y:3}, {x:5,y:4}]); 
      } 
      else if (step === 10) { 
         setBossPos({x: 5, y: 3}); 
         setWave([]); 
         setPath([]); 
      } 
      else if (step === 12) { 
         setBossPos({x: 5, y: 4}); 
         step = 0; 
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{color: '#a0d4ff', textShadow: '2px 2px 0px #b20000'}}>Onda BFS (Pathfinding)</h3>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 40px)`, gap: '2px', backgroundColor: '#000', padding: '5px', border: '4px solid #b20000', boxShadow: '0px 0px 20px rgba(255, 0, 0, 0.2)' }}>
        {grid.map((row, y) => row.map((cell, x) => {
          const isWall = cell === 1;
          const isWave = wave.some(w => w.x === x && w.y === y);
          const isPath = path.some(p => p.x === x && p.y === y);
          const isPlayer = playerPos.x === x && playerPos.y === y;
          const isBoss = bossPos.x === x && bossPos.y === y;

          let bg = isWall ? '#666' : '#222';
          if (isWave) bg = 'rgba(0, 150, 255, 0.5)';
          if (isPath) bg = 'rgba(255, 255, 0, 0.7)';

          return (
          <div key={`${x}-${y}`} style={{ width: '40px', height: '40px', backgroundColor: bg, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', border: isWall ? 'none' : '1px dashed #333', transition: 'background-color 0.3s ease' }}>
            {isPlayer && <div style={{width: '24px', height: '24px', backgroundColor: '#00f', borderRadius: '50%', boxShadow: '0 0 10px #00f'}}></div>}
            {isBoss && <div style={{width: '28px', height: '28px', backgroundColor: '#f00', borderRadius: '5px', boxShadow: '0 0 10px #f00'}}></div>}
          </div>
        )}))}
      </div>
    </div>
  );
}

function AnimatedFogVisualizer() {
  const initialGrid = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 1, 1, 1]
  ];

  const cellColors = { 0: '#222', 1: '#666', 2: '#ffcc00', 3: '#00ff00', 4: '#800080', 5: '#ffd700' };
  
  const path = [
    {x:1, y:1}, {x:2, y:1}, {x:3, y:1}, {x:3, y:2}, {x:3, y:3}, {x:4, y:3}, {x:5, y:3}, {x:5, y:4}
  ];

  const [step, setStep] = useState(0);
  const [grid, setGrid] = useState(initialGrid);

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= path.length) {
         // Llegó a la meta (3), reiniciamos
         currentStep = 0;
         setGrid(initialGrid);
      } else {
         const pos = path[currentStep];
         // Si pisa un apunte (2), lo recolectamos
         if (initialGrid[pos.y][pos.x] === 2) {
             setGrid(g => { const ng = g.map(r=>[...r]); ng[pos.y][pos.x]=0; return ng; });
         }
      }
      setStep(currentStep);
    }, 800); 
    return () => clearInterval(interval);
  }, []);

  const playerPos = path[step];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{color: '#ff0000', textShadow: '2px 2px 0px #333'}}>Niebla de Guerra</h3>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 40px)`, gap: '2px', backgroundColor: '#000', padding: '5px', border: '4px solid #333' }}>
        {grid.map((row, y) => row.map((cell, x) => {
          const distX = Math.abs(playerPos.x - x);
          const distY = Math.abs(playerPos.y - y);
          const isVisible = Math.max(distX, distY) <= 1; 

          let bg = isVisible ? cellColors[cell] : '#000';
          const isPlayer = playerPos.x === x && playerPos.y === y;

          return (
          <div key={`${x}-${y}`} style={{ width: '40px', height: '40px', backgroundColor: bg, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', border: isVisible && cell === 0 ? '1px dashed #333' : 'none', transition: 'background-color 0.1s ease' }}>
            {isVisible && cell !== 0 && cell !== 1 && cell}
            {isPlayer && <div style={{width: '24px', height: '24px', backgroundColor: '#00f', borderRadius: '50%', boxShadow: '0 0 15px #00f'}}></div>}
          </div>
        )}))}
      </div>
    </div>
  );
}

function Section3Wrapper({ slide }) {
  const [activeImage, setActiveImage] = useState("/images/boss_texture.png");
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const elements = contentRef.current.querySelectorAll('[data-spy]');
      let currentVisible = "/images/boss_texture.png"; 
      const containerTop = contentRef.current.scrollTop;
      const containerHeight = contentRef.current.clientHeight;
      
      if (containerTop < 30) {
          setActiveImage(currentVisible);
          return;
      }
      
      elements.forEach(el => {
         const elTop = el.offsetTop - contentRef.current.offsetTop;
         if (elTop <= containerTop + (containerHeight * 0.5)) {
             const spyTarget = el.getAttribute('data-spy');
             if(spyTarget) currentVisible = spyTarget;
         }
      });
      
      setActiveImage(currentVisible);
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); 
    }
    
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="card-content" ref={contentRef} style={{ position: 'relative' }}>
         <div className="speaker-badge">{slide.speaker}</div>
         <h2>{slide.title}</h2>
         {slide.content}
      </div>
      <div className="card-image" style={{ transition: 'all 0.3s ease', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         {activeImage === 'matrix' ? <MatrixVisualizer key="matrix" /> 
         : activeImage === 'animated-items' ? <AnimatedItemsVisualizer key="animated-items" />
         : activeImage === 'animated-bfs' ? <AnimatedBFSVisualizer key="animated-bfs" />
         : activeImage === 'animated-fog' ? <AnimatedFogVisualizer key="animated-fog" />
         : <img key={activeImage} src={activeImage} alt="Visualización dinámica" style={{ animation: 'fadeIn 0.3s ease', maxWidth: '100%', maxHeight: '100%' }} />}
      </div>
    </>
  );
}

// ----------------------------------------------------
// DATOS DE LAS DIAPOSITIVAS
// ----------------------------------------------------

const slides = [
  {
    id: 0,
    title: "LABERINTO INTERACTIVO CON NIVELES",
    speaker: "Equipo de Desarrollo",
    content: (
      <>
        <p>Proyecto Final - Lenguaje de Programación I</p>
        <p>Presiona [NEXT] o Barra Espaciadora para avanzar.</p>
        <br/>
        <p><strong>Integrantes del Equipo:</strong></p>
        <ul>
          <li>Nieves Pérez</li>
          <li>Alejandra Falcón</li>
          <li>Juan Rodríguez</li>
          <li>Miguel Oliver</li>
        </ul>
      </>
    ),
    image: "/images/menu_background.png",
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
}`}</code></pre>
      </>
    ),
    image: "/images/wall_texture.png",
    layout: "grid"
  },
  {
    id: 2,
    title: "SECCION 2: Interfaz Gráfica, Controles y Manejo de Eventos",
    speaker: "Juan Rodríguez",
    content: (
      <>
        <h3>Personaje que se mueve con el teclado (y botones)</h3>
        <p><strong>Explicación Detallada:</strong> La interacción usuario-sistema se logró integrando una interfaz gráfica responsiva mediante Windows Forms, configurada para detectar pulsaciones en tiempo real. Sobreescribiendo el método nativo <code>ProcessCmdKey</code>, la aplicación es capaz de capturar eficientemente las teclas de dirección (Flechas y W,A,S,D) antes de que el formulario las procese de manera predeterminada.</p>
        
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
        <p><strong>Explicación Detallada:</strong> Mantener al jugador informado de su progreso es crucial para la experiencia de juego. Por ello, se implementó un sistema de actualización de estadísticas que combina las propiedades del temporizador (<code>Timer</code> tick) y variables de estado internas.</p>
        
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
      </>
    ),
    image: "/images/default_avatar.png",
    layout: "grid"
  },
  {
    id: 3,
    title: "SECCION 3: Lógica Avanzada, Inteligencia Artificial y Mecánicas",
    speaker: "Nieves Pérez",
    customLayout: Section3Wrapper, 
    content: (
      <>
        {/* PARTE 0: INTRO */}
        <div data-spy="/images/boss_texture.png" style={{ marginBottom: '2rem' }}>
          <p>Bienvenido a la lógica avanzada del Laberinto. Esta sección desglosa las mecánicas centrales que dan vida al juego, empezando por el motor de colisiones hasta llegar a la inteligencia artificial del enemigo.</p>
          <p><em>(Continúa bajando para explorar el código)</em></p>
        </div>

        {/* PARTE 1: MOVIMIENTO */}
        <div data-spy="matrix" style={{ marginBottom: '2rem', borderTop: '1px solid #333', paddingTop: '2rem' }}>
          <h3 style={{color: '#fce300'}}>1. Interceptando Teclas y Previniendo Errores</h3>
          <p><strong>Explicación Detallada:</strong> El núcleo lógico del juego reside en la función <code>MovePlayer</code>. Antes de mover físicamente al personaje en la matriz, el sistema clona las coordenadas actuales del jugador. Utilizando la estructura de control <code>switch</code>, el enumerador <code>Direction</code> se traduce matemáticamente a coordenadas cartesianas (restar a Y para subir, sumar a X para ir a la derecha).</p>
          <p>Inmediatamente después, se aplica un filtro de seguridad crítico: una evaluación condicional que verifica que la coordenada futura sea válida. Esto evita una excepción fatal de tipo <code>IndexOutOfRangeException</code>.</p>
          
          <p><strong>Evidencia de Código (GameManager.cs):</strong></p>
          <pre><code>{`public void MovePlayer(Direction dir)
{
    int newX = Player1.CurrentPosition.X;
    int newY = Player1.CurrentPosition.Y;

    switch (dir)
    {
        case Direction.Up: newY--; break;
        // ... (Down, Left, Right) ...
    }

    // 1. Filtro de seguridad crítico
    if (newX >= 0 && newX < CurrentLevel.Columns && newY >= 0 && newY < CurrentLevel.Rows)
    {
        int targetCell = CurrentLevel.Grid[newY, newX];
        if (targetCell != 1) // Si NO es una pared
        {
            // ...
        }
    }
}`}</code></pre>
        </div>

        {/* PARTE 2: ÍTEMS ANIMADOS */}
        <div data-spy="animated-items" id="sec3-part2" style={{ marginBottom: '2rem', borderTop: '1px solid #333', paddingTop: '2rem' }}>
          <h3 style={{color: '#ffcc00'}}>2. Mecánicas de Recolección y Aleatoriedad</h3>
          <p><strong>Explicación Detallada:</strong> Para enriquecer el desafío, el mapa cuenta con diferentes celdas interactivas. Cuando el jugador choca con la celda de un apunte (código <code>2</code>), este se suma a su puntaje y el valor de esa celda en la matriz se sobrescribe permanentemente con un <code>0</code> (camino libre), haciéndolo desaparecer gráficamente en el siguiente renderizado.</p>
          <p>La tensión aumenta al interactuar con las trampas (código <code>4</code>), las cuales duplican la velocidad del monstruo enemigo (<code>BossSpeedMultiplier = 2</code>). Por el contrario, los potenciadores dorados (código <code>5</code>) introducen un factor de azar a través de la clase <code>Random</code>.</p>
          
          <p><strong>Evidencia de Código (GameManager.cs):</strong></p>
          <pre><code>{`if (targetCell == 2)
{
    StarsCollected++;
    CurrentLevel.Grid[newY, newX] = 0; // Se recolecta permanentemente
}
else if (targetCell == 4) // TRAMPA MORADA
{
    CurrentLevel.Grid[newY, newX] = 0;
    BossSpeedMultiplier = 2; 
    BossSpeedBoostTurns = 10;
}
else if (targetCell == 5) // BOOST DORADO
{
    CurrentLevel.Grid[newY, newX] = 0;
    Random rnd = new Random();
    if (rnd.Next(2) == 0) { BossFreezeTurns = 10; } 
    else { PlayerSpeedBoostTurns = 10; }
}`}</code></pre>
        </div>

        {/* PARTE 3: BFS ANIMADO */}
        <div data-spy="animated-bfs" id="sec3-part3" style={{ marginBottom: '2rem', borderTop: '1px solid #333', paddingTop: '2rem' }}>
          <h3 style={{color: '#a0d4ff'}}>3. Inteligencia Artificial: Búsqueda en Anchura (BFS)</h3>
          <p><strong>Explicación Detallada:</strong> El enemigo acosador no se mueve aleatoriamente. Utiliza uno de los algoritmos de <i>Pathfinding</i> más reconocidos en la computación: el BFS. Este algoritmo garantiza encontrar siempre la ruta más corta hacia el jugador sin atravesar las paredes.</p>
          <p>El código emplea una estructura de datos tipo Cola (<code>Queue&lt;Point&gt;</code>) para simular una onda expansiva, empezando desde la posición del jugador. Va marcando las distancias de las celdas vecinas válidas hasta chocar con el monstruo. Además, lleva un registro de las celdas descubridoras (<code>parent</code>), dejando un rastro exacto que le indica al monstruo qué paso dar a continuación.</p>
          
          <p><strong>Evidencia de Código (GameManager.cs):</strong></p>
          <pre><code>{`// El Algoritmo BFS dentro de GetNextBossMove()
System.Collections.Generic.Queue<Point> q = new System.Collections.Generic.Queue<Point>();
q.Enqueue(Player1.CurrentPosition);
dist[Player1.CurrentPosition.Y, Player1.CurrentPosition.X] = 0;

while (q.Count > 0)
{
    Point curr = q.Dequeue();
    if (curr.X == BossPosition.X && curr.Y == BossPosition.Y) { found = true; break; }

    // Revisa las 4 direcciones vecinas y guarda un rastro de migas en 'parent'
    // ...
}
if (found) return parent[BossPosition.Y, BossPosition.X]; // ¡Se devuelve el paso calculado!`}</code></pre>
        </div>

        {/* PARTE 4: HARDCORE (ANIMADO FOG) */}
        <div data-spy="animated-fog" id="sec3-part4" style={{ marginBottom: '1rem', borderTop: '1px solid #333', paddingTop: '2rem' }}>
          <h3 style={{color: '#ff0000'}}>4. Hardcore: Fórmula de Distancia Geométrica y Desafíos Extremos</h3>
          <p><strong>Explicación Detallada:</strong> Como un reto adicional para la rejugabilidad, se implementó el Modo Hardcore. En lugar de modificar el comportamiento de los objetos, se alteró el evento de renderizado (<code>pbMaze_Paint</code> en <code>FormJuego.cs</code>) para crear una cegadora "Niebla de Guerra". Calculando la distancia geométrica (Delta X y Delta Y) entre el jugador y las casillas del mapa en tiempo real, el sistema oscurece dinámicamente todo aquello que esté fuera del radio visual del personaje.</p>
          
          <p><strong>Evidencia de Código (FormJuego.cs):</strong></p>
          <pre><code>{`// Lógica de Niebla de Guerra (Fog of War) y Dibujado Dinámico
if (_isHardcore && playerPos.X != -1)
{
    using (Brush fogBrush = new SolidBrush(_fogColor))
    {
        for (int y = 0; y < rows; y++)
        {
            for (int x = 0; x < cols; x++)
            {
                // Fórmula de distancia para medir cercanía al jugador
                int distX = Math.Abs(playerPos.X - x);
                int distY = Math.Abs(playerPos.Y - y);
                if (Math.Max(distX, distY) > 2)
                {
                    RectangleF rect = new RectangleF(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                    g.FillRectangle(fogBrush, rect); // Ciega la vista
                }
            }
        }
    }
}`}</code></pre>
        </div>
      </>
    )
  },
  {
    id: 4,
    title: "SECCION 4: Multimedia, Personalización y Finales Múltiples",
    speaker: "Alejandra Falcón",
    content: (
      <>
        <h3>Subida de Avatar Personalizado (Gestión de Archivos Locales)</h3>
        <p><strong>Explicación Detallada:</strong> Se le otorga identidad al jugador permitiendo personalizar su representación visual. Mediante el uso de componentes del sistema operativo (<code>OpenFileDialog</code>), el software permite navegar por el disco duro del usuario, aplicar filtros de extensión (<code>.png</code>, <code>.jpg</code>) y cargar un archivo gráfico a la memoria RAM de la aplicación, utilizándolo dinámicamente durante el juego.</p>
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
      </>
    ),
    image: "/images/outro_cinematic.png",
    layout: "grid"
  },
  {
    id: 5,
    title: "CONCLUSIÓN Y CIERRE",
    speaker: "Equipo",
    content: (
      <>
        <h3>Conclusión</h3>
        <p>El desarrollo e iteración de este "Laberinto Interactivo con Niveles" ha demostrado de manera práctica y tangible la importancia de comprender y aplicar correctamente las estructuras de datos, específicamente las matrices bidimensionales, en el diseño de entornos virtuales lógicos. Se logró cumplir con éxito rotundo todos los objetivos y requerimientos propuestos, integrando una interfaz gráfica intuitiva mediante Windows Forms, control fluido de eventos del teclado en tiempo real y el uso avanzado de la Programación Orientada a Objetos para mantener un código limpio, modular y altamente escalable.</p>
        <p>Además de satisfacer los requisitos obligatorios, nuestro equipo invirtió el esfuerzo adicional para implementar mecánicas avanzadas como la inteligencia artificial del enemigo (búsqueda de ruta), efectos visuales inmersivos (niebla de guerra y animaciones pulsantes) y sistemas multimedia (audio e imágenes locales). Todo ello enriquece notablemente la experiencia del usuario final y le otorga al proyecto un acabado profesional. Este desafío sirvió no solo para consolidar nuestros conocimientos en la sintaxis de C#, sino también para ofrecernos una visión profunda y enriquecedora sobre cómo se estructura integralmente la lógica de software interactivo.</p>
        
        <h3>Referencias Bibliográficas y Tecnologías</h3>
        <ul>
          <li>Microsoft Corporation. (2023). <em>Documentación de C# y .NET</em>.</li>
          <li>Microsoft Corporation. (2023). <em>Windows Forms Documentation</em>.</li>
          <li>Lenguaje: C# 12.0 | Framework: .NET 8.0 (Windows Forms)</li>
          <li>IDE: Visual Studio 2022 | Arquitectura: POO, Programación Basada en Eventos</li>
        </ul>
        <p><strong>¡GRACIAS POR SU ATENCIÓN!</strong></p>
      </>
    ),
    image: "/images/intro_cinematic.png",
    layout: "single"
  }
];

// ----------------------------------------------------
// COMPONENTE PRINCIPAL (APP)
// ----------------------------------------------------

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

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
                <div className="card-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
              )}

              {slide.layout === 'single' && (
                 <div className="card-image" style={{marginTop: '20px'}}>
                   <img src={slide.image} alt={slide.title} style={{maxHeight: '300px'}}/>
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
