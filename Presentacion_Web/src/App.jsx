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
        <h4 style={{ margin: '0 0 10px 0', color: '#fce300' }}>Leyenda (targetCell)</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px', color: '#fff' }}>
          <div><span style={{ color: cellColors[0], fontSize: '16px' }}>■</span> 0: Espacio</div>
          <div><span style={{ color: cellColors[1], fontSize: '16px' }}>■</span> 1: Pared</div>
          <div><span style={{ color: cellColors[2], fontSize: '16px' }}>■</span> 2: Apunte</div>
          <div><span style={{ color: cellColors[3], fontSize: '16px' }}>■</span> 3: Salida</div>
          <div><span style={{ color: cellColors[4], fontSize: '16px' }}>■</span> 4: Trampa</div>
          <div><span style={{ color: cellColors[5], fontSize: '16px' }}>■</span> 5: Boost</div>
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
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) {
        setPlayerPos({ x: 2, y: 1 });
        setGrid(g => { const ng = g.map(r => [...r]); ng[1][2] = 0; return ng; });
        setPopup({ text: '+1 Apunte!', color: '#ffcc00' });
      }
      else if (step === 2) { setPopup(null); setPlayerPos({ x: 2, y: 2 }); }
      else if (step === 3) { setPlayerPos({ x: 2, y: 3 }); }
      else if (step === 4) { setPlayerPos({ x: 3, y: 3 }); }
      else if (step === 5) {
        setPlayerPos({ x: 4, y: 3 });
        setGrid(g => { const ng = g.map(r => [...r]); ng[3][4] = 0; return ng; });
        setPopup({ text: 'Boss Speed = 2!', color: '#ff88ff' });
      }
      else if (step === 6) {
        setPopup(null);
        setPlayerPos({ x: 4, y: 4 });
        setGrid(g => { const ng = g.map(r => [...r]); ng[4][4] = 0; return ng; });
        setPopup({ text: 'Boss Congelado!', color: '#ffd700' });
      }
      else if (step === 8) {
        setPopup(null);
        setPlayerPos({ x: 1, y: 1 });
        setGrid(initialGrid);
        step = 0;
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease', position: 'relative' }}>
      <h3 style={{ color: '#ffcc00', textShadow: '2px 2px 0px #b20000' }}>Simulación de Ítems</h3>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0].length}, 40px)`, gap: '2px', backgroundColor: '#000', padding: '5px', border: '4px solid #ffcc00', boxShadow: '0px 0px 20px rgba(255, 204, 0, 0.2)' }}>
        {grid.map((row, y) => row.map((cell, x) => (
          <div key={`${x}-${y}`} style={{ width: '40px', height: '40px', backgroundColor: cellColors[cell], display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: cell === 0 ? '#444' : '#fff', fontFamily: 'monospace', position: 'relative' }}>
            {cell !== 0 && cell !== 1 && cell}
            {playerPos.x === x && playerPos.y === y && (
              <div style={{ width: '24px', height: '24px', backgroundColor: '#00f', borderRadius: '50%', boxShadow: '0 0 10px #00f', position: 'absolute', transition: 'all 0.3s ease' }}></div>
            )}
          </div>
        )))}
      </div>

      <div style={{ height: '40px', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
  const [bossPos, setBossPos] = useState({ x: 5, y: 4 });
  const playerPos = { x: 1, y: 1 };

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step === 1) { setWave([{ x: 1, y: 1 }]); }
      else if (step === 2) { setWave([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }]); }
      else if (step === 3) { setWave([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 1 }, { x: 1, y: 3 }]); }
      else if (step === 4) { setWave([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 2 }, { x: 1, y: 4 }]); }
      else if (step === 5) { setWave([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 2 }, { x: 1, y: 4 }, { x: 3, y: 3 }]); }
      else if (step === 6) { setWave([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 2 }, { x: 1, y: 4 }, { x: 3, y: 3 }, { x: 4, y: 3 }]); }
      else if (step === 7) { setWave([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 2 }, { x: 1, y: 4 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }]); }
      else if (step === 8) {
        setPath([{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 5, y: 4 }]);
      }
      else if (step === 10) {
        setBossPos({ x: 5, y: 3 });
        setWave([]);
        setPath([]);
      }
      else if (step === 12) {
        setBossPos({ x: 5, y: 4 });
        step = 0;
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#a0d4ff', textShadow: '2px 2px 0px #b20000' }}>Onda BFS (Pathfinding)</h3>
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
              {isPlayer && <div style={{ width: '24px', height: '24px', backgroundColor: '#00f', borderRadius: '50%', boxShadow: '0 0 10px #00f' }}></div>}
              {isBoss && <div style={{ width: '28px', height: '28px', backgroundColor: '#f00', borderRadius: '5px', boxShadow: '0 0 10px #f00' }}></div>}
            </div>
          )
        }))}
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
    { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 5, y: 4 }
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
          setGrid(g => { const ng = g.map(r => [...r]); ng[pos.y][pos.x] = 0; return ng; });
        }
      }
      setStep(currentStep);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const playerPos = path[step];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#ff0000', textShadow: '2px 2px 0px #333' }}>Niebla de Guerra</h3>
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
              {isPlayer && <div style={{ width: '24px', height: '24px', backgroundColor: '#00f', borderRadius: '50%', boxShadow: '0 0 15px #00f' }}></div>}
            </div>
          )
        }))}
      </div>
    </div>
  );
}

function IntroVisualizer1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#a0d4ff', textShadow: '2px 2px 0 #000' }}>Generación de Laberinto</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 40px)', gap: '2px', backgroundColor: '#000', padding: '10px', border: '4px solid #a0d4ff', boxShadow: '0 0 15px rgba(0, 150, 255, 0.3)' }}>
        {[1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 1, 1].map((c, i) => (
          <div key={i} style={{ width: '40px', height: '40px', backgroundColor: c === 1 ? '#666' : c === 2 ? '#ffcc00' : c === 3 ? '#00ff00' : '#222' }}></div>
        ))}
      </div>
    </div>
  );
}

function MatrixVisualizerLevel() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const int = setInterval(() => setStep(s => (s + 1) % 3), 1500);
    return () => clearInterval(int);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#ffcc00', textShadow: '2px 2px 0 #000' }}>Mapeo de Matriz a Textura</h3>
      <div style={{ padding: '20px', backgroundColor: '#111', border: '2px solid #333', fontSize: '20px', fontFamily: 'monospace', color: '#fff', marginBottom: '20px', borderRadius: '5px' }}>
        {step === 0 ? 'Grid[y, x] = 1;' : step === 1 ? 'Grid[y, x] = 2;' : 'Grid[y, x] = 0;'}
      </div>
      <div style={{ fontSize: '30px', margin: '10px', color: '#666' }}>↓</div>
      <div style={{ width: '80px', height: '80px', backgroundColor: step === 0 ? '#666' : step === 1 ? '#ffcc00' : '#222', border: step === 0 ? 'none' : '2px dashed #444', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px', color: '#fff', borderRadius: '5px', boxShadow: step === 1 ? '0 0 10px #ffcc00' : 'none' }}>
        {step === 0 ? 'Pared' : step === 1 ? 'Apunte' : 'Camino'}
      </div>
    </div>
  );
}

function LevelsVisualizer() {
  const [level, setLevel] = useState(1);
  useEffect(() => {
    const int = setInterval(() => setLevel(l => l >= 3 ? 1 : l + 1), 2000);
    return () => clearInterval(int);
  }, []);

  const size = level === 1 ? 10 : level === 2 ? 15 : 20;
  const cellSize = level === 1 ? 20 : level === 2 ? 14 : 10;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#00ff00', textShadow: '2px 2px 0 #000' }}>Progresión de Dificultad</h3>
      <div style={{ marginBottom: '15px', color: '#fff', fontSize: '18px' }}>Nivel {level}: Matriz {size}x{size}</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${size}, ${cellSize}px)`, gap: '1px', backgroundColor: '#000', padding: '5px', border: '4px solid #00ff00', transition: 'all 0.5s ease' }}>
        {Array.from({ length: size * size }).map((_, i) => (
          <div key={i} style={{ width: `${cellSize}px`, height: `${cellSize}px`, backgroundColor: Math.random() > 0.7 ? '#666' : '#222', transition: 'all 0.3s ease' }}></div>
        ))}
      </div>
    </div>
  );
}

function Section1Wrapper({ slide }) {
  const [activeImage, setActiveImage] = useState("intro");
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const elements = contentRef.current.querySelectorAll('[data-spy]');
      let currentVisible = "intro";
      const containerTop = contentRef.current.scrollTop;
      const containerHeight = contentRef.current.clientHeight;

      elements.forEach(el => {
        const elTop = el.offsetTop - contentRef.current.offsetTop;
        if (elTop <= containerTop + (containerHeight * 0.5)) {
          const spyTarget = el.getAttribute('data-spy');
          if (spyTarget) currentVisible = spyTarget;
        }
      });
      setActiveImage(currentVisible);
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => { if (container) container.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <>
      <div className="card-content" ref={contentRef} style={{ position: 'relative' }}>
        <div className="speaker-badge">{slide.speaker}</div>
        <h2>{slide.title}</h2>
        {slide.content}
      </div>
      <div className="card-image" style={{ transition: 'all 0.3s ease', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {activeImage === 'intro' ? <IntroVisualizer1 key="intro" />
          : activeImage === 'matrix' ? <MatrixVisualizerLevel key="matrix" />
            : activeImage === 'levels' ? <LevelsVisualizer key="levels" />
              : <img key={activeImage} src={activeImage} style={{ animation: 'fadeIn 0.3s ease', maxWidth: '100%', maxHeight: '100%' }} />}
      </div>
    </>
  );
}

function KeyboardVisualizer() {
  const [key, setKey] = useState(null);
  const [pos, setPos] = useState({ x: 2, y: 2 });
  useEffect(() => {
    const moves = [
      { k: 'W', dx: 0, dy: -1 }, { k: 'D', dx: 1, dy: 0 },
      { k: 'S', dx: 0, dy: 1 }, { k: 'A', dx: -1, dy: 0 }
    ];
    let i = 0;
    const int = setInterval(() => {
      const move = moves[i % moves.length];
      setKey(move.k);
      setPos(p => ({ x: p.x + move.dx, y: p.y + move.dy }));
      setTimeout(() => setKey(null), 300);
      i++;
    }, 1000);
    return () => clearInterval(int);
  }, []);

  const keyStyle = (k) => ({
    width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center',
    backgroundColor: key === k ? '#a0d4ff' : '#222',
    color: key === k ? '#000' : '#fff',
    border: '2px solid #555', borderRadius: '5px',
    fontWeight: 'bold', transition: 'all 0.1s ease', margin: '2px'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#a0d4ff', textShadow: '2px 2px 0 #000' }}>Controles y Movimiento</h3>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
        <div style={keyStyle('W')}>W</div>
        <div style={{ display: 'flex' }}>
          <div style={keyStyle('A')}>A</div>
          <div style={keyStyle('S')}>S</div>
          <div style={keyStyle('D')}>D</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 40px)', gap: '2px', backgroundColor: '#000', padding: '5px', border: '2px solid #444' }}>
        {Array.from({ length: 25 }).map((_, i) => {
          const x = i % 5; const y = Math.floor(i / 5);
          return (
            <div key={i} style={{ width: '40px', height: '40px', backgroundColor: '#222', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {pos.x === x && pos.y === y && <div style={{ width: '24px', height: '24px', backgroundColor: '#00f', borderRadius: '50%', boxShadow: '0 0 10px #00f' }}></div>}
            </div>
          )
        })}
      </div>
    </div>
  );
}

function StatsVisualizer() {
  const [time, setTime] = useState(0);
  const [steps, setSteps] = useState(0);
  useEffect(() => {
    const int = setInterval(() => {
      setTime(t => t + 1);
      if (Math.random() > 0.3) setSteps(s => s + 1);
    }, 1000);
    return () => clearInterval(int);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#ffcc00', textShadow: '2px 2px 0 #000' }}>HUD y Estadísticas</h3>
      <div style={{ backgroundColor: '#111', border: '3px solid #ffcc00', padding: '20px', borderRadius: '10px', width: '80%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Nivel:</span> <span style={{ color: '#a0d4ff' }}>2</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Apuntes:</span> <span style={{ color: '#ffcc00' }}>3/5</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Pasos:</span> <span style={{ color: '#ff88ff' }}>{steps}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Tiempo:</span> <span style={{ color: '#00ff00' }}>{time}s</span>
        </div>
      </div>
    </div>
  );
}

function SpawnExitVisualizer() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#00ff00', textShadow: '2px 2px 0 #000' }}>Spawn y Meta</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '2px', backgroundColor: '#000', padding: '10px', border: '4px solid #333' }}>
        {Array.from({ length: 25 }).map((_, i) => {
          const x = i % 5; const y = Math.floor(i / 5);
          const isSpawn = x === 0 && y === 0;
          const isExit = x === 4 && y === 4;
          return (
            <div key={i} style={{ width: '50px', height: '50px', backgroundColor: isSpawn ? 'rgba(0,0,255,0.2)' : isExit ? 'rgba(0,255,0,0.2)' : '#222', border: isSpawn ? '2px dashed #00f' : isExit ? '2px dashed #0f0' : 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {isSpawn && <div style={{ width: '20px', height: '20px', backgroundColor: '#00f', borderRadius: '50%', animation: 'pulse-blue 1s infinite alternate' }}></div>}
              {isExit && <div style={{ width: '30px', height: '30px', backgroundColor: '#0f0', borderRadius: '5px', animation: 'pulse-green 1s infinite alternate' }}></div>}
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px', marginTop: '15px' }}>
        <span style={{ color: '#a0d4ff' }}>Point(0,0)</span>
        <span style={{ color: '#00ff00' }}>Point(4,4)</span>
      </div>
      <style>{`@keyframes pulse-blue { 0% { box-shadow: 0 0 5px #00f; } 100% { box-shadow: 0 0 20px #00f; } }
      @keyframes pulse-green { 0% { box-shadow: 0 0 5px #0f0; } 100% { box-shadow: 0 0 20px #0f0; } }`}</style>
    </div>
  );
}

function Section2Wrapper({ slide }) {
  const [activeImage, setActiveImage] = useState("keys");
  const contentRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const elements = contentRef.current.querySelectorAll('[data-spy]');
      let currentVisible = "keys";
      const containerTop = contentRef.current.scrollTop;
      const containerHeight = contentRef.current.clientHeight;
      elements.forEach(el => {
        const elTop = el.offsetTop - contentRef.current.offsetTop;
        if (elTop <= containerTop + (containerHeight * 0.5)) {
          const spyTarget = el.getAttribute('data-spy');
          if (spyTarget) currentVisible = spyTarget;
        }
      });
      setActiveImage(currentVisible);
    };
    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => { if (container) container.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <>
      <div className="card-content" ref={contentRef} style={{ position: 'relative' }}>
        <div className="speaker-badge">{slide.speaker}</div>
        <h2>{slide.title}</h2>
        {slide.content}
      </div>
      <div className="card-image" style={{ transition: 'all 0.3s ease', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {activeImage === 'keys' ? <KeyboardVisualizer key="keys" />
          : activeImage === 'stats' ? <StatsVisualizer key="stats" />
            : activeImage === 'spawn' ? <SpawnExitVisualizer key="spawn" />
              : <img key={activeImage} src={activeImage} style={{ animation: 'fadeIn 0.3s ease', maxWidth: '100%', maxHeight: '100%' }} />}
      </div>
    </>
  );
}

function AvatarVisualizer() {
  const [uploaded, setUploaded] = useState(false);
  useEffect(() => {
    const int = setInterval(() => setUploaded(u => !u), 3000);
    return () => clearInterval(int);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#a0d4ff', textShadow: '2px 2px 0 #000' }}>Carga de Avatar</h3>
      <div style={{ padding: '20px', backgroundColor: '#111', border: '2px solid #555', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: uploaded ? '#fff' : '#333', border: '4px solid #a0d4ff', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', transition: 'all 0.5s ease' }}>
          {uploaded ? <img src="/images/default_avatar.png" alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ color: '#666', fontSize: '40px' }}>?</span>}
        </div>
        <button style={{ padding: '10px 20px', backgroundColor: uploaded ? '#444' : '#a0d4ff', color: uploaded ? '#fff' : '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', transition: 'all 0.3s ease' }}>
          {uploaded ? 'Archivo Cargado' : 'Subir Archivo...'}
        </button>
      </div>
    </div>
  );
}

function GlowVisualizer() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#00ff00', textShadow: '2px 2px 0 #000' }}>Efecto Glow (Pulsación)</h3>
      <div style={{ width: '200px', height: '200px', backgroundColor: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #333', borderRadius: '10px' }}>
        <div style={{ width: '60px', height: '60px', backgroundColor: '#00ff00', borderRadius: '10px', animation: 'pulse-glow 1.5s infinite alternate', boxShadow: '0 0 20px #00ff00' }}></div>
      </div>
      <style>{`@keyframes pulse-glow { 0% { transform: scale(1); box-shadow: 0 0 10px #00ff00; } 100% { transform: scale(1.3); box-shadow: 0 0 40px #00ff00; } }`}</style>
    </div>
  );
}

function AudioVisualizer() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: '#ff88ff', textShadow: '2px 2px 0 #000' }}>SoundPlayer en Segundo Plano</h3>
      <div style={{ display: 'flex', gap: '10px', height: '100px', alignItems: 'flex-end', padding: '20px', backgroundColor: '#111', border: '2px solid #555', borderRadius: '10px' }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} style={{ width: '15px', backgroundColor: '#ff88ff', animation: `eq ${0.5 + Math.random()}s infinite alternate` }}></div>
        ))}
      </div>
      <style>{`@keyframes eq { 0% { height: 10px; } 100% { height: 80px; } }`}</style>
    </div>
  );
}

function StoryVisualizer() {
  const [perfect, setPerfect] = useState(true);
  useEffect(() => {
    const int = setInterval(() => setPerfect(p => !p), 4000);
    return () => clearInterval(int);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeIn 0.5s ease' }}>
      <h3 style={{ color: perfect ? '#00ff00' : '#ff0000', transition: 'color 0.5s ease', textShadow: '2px 2px 0 #000' }}>Desenlace Dinámico</h3>
      <div style={{ padding: '20px', backgroundColor: '#111', border: `2px solid ${perfect ? '#00ff00' : '#ff0000'}`, borderRadius: '10px', width: '80%', height: '150px', display: 'flex', alignItems: 'center', textAlign: 'center', transition: 'all 0.5s ease' }}>
        <p style={{ color: perfect ? '#aaffaa' : '#ffaaaa', fontSize: '18px', fontWeight: 'bold' }}>
          {perfect ? '¡Felicidades! Lograste encontrar todos los apuntes perdidos, tu semestre está salvado.' : 'Lograste escapar con vida, pero te faltaron apuntes. Tendrás que esforzarte más.'}
        </p>
      </div>
      <div style={{ marginTop: '15px', color: '#fff', fontFamily: 'monospace' }}>
        perfectEnding = <span style={{ color: perfect ? '#00ff00' : '#ff0000' }}>{perfect ? 'true' : 'false'}</span>
      </div>
    </div>
  );
}

function Section4Wrapper({ slide }) {
  const [activeImage, setActiveImage] = useState("avatar");
  const contentRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const elements = contentRef.current.querySelectorAll('[data-spy]');
      let currentVisible = "avatar";
      const containerTop = contentRef.current.scrollTop;
      const containerHeight = contentRef.current.clientHeight;
      elements.forEach(el => {
        const elTop = el.offsetTop - contentRef.current.offsetTop;
        if (elTop <= containerTop + (containerHeight * 0.5)) {
          const spyTarget = el.getAttribute('data-spy');
          if (spyTarget) currentVisible = spyTarget;
        }
      });
      setActiveImage(currentVisible);
    };
    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => { if (container) container.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <>
      <div className="card-content" ref={contentRef} style={{ position: 'relative' }}>
        <div className="speaker-badge">{slide.speaker}</div>
        <h2>{slide.title}</h2>
        {slide.content}
      </div>
      <div className="card-image" style={{ transition: 'all 0.3s ease', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {activeImage === 'avatar' ? <AvatarVisualizer key="avatar" />
          : activeImage === 'glow' ? <GlowVisualizer key="glow" />
            : activeImage === 'audio' ? <AudioVisualizer key="audio" />
              : activeImage === 'story' ? <StoryVisualizer key="story" />
                : <img key={activeImage} src={activeImage} style={{ animation: 'fadeIn 0.3s ease', maxWidth: '100%', maxHeight: '100%' }} />}
      </div>
    </>
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
          if (spyTarget) currentVisible = spyTarget;
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

function TitleVisualizer() {
  const [player, setPlayer] = useState({x:1, y:1});
  useEffect(() => {
    const path = [
       {x:1,y:1}, {x:2,y:1}, {x:3,y:1}, {x:3,y:2}, {x:3,y:3}, {x:4,y:3}, {x:5,y:3}, {x:6,y:3}, {x:6,y:4}, {x:6,y:5}, {x:5,y:5}, {x:4,y:5}, {x:3,y:5}, {x:2,y:5}, {x:1,y:5}, {x:1,y:4}, {x:1,y:3}, {x:1,y:2}
    ];
    let step = 0;
    const int = setInterval(() => {
       step = (step + 1) % path.length;
       setPlayer(path[step]);
    }, 400);
    return () => clearInterval(int);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', minHeight: '350px', animation: 'fadeIn 1s ease', position: 'relative', overflow: 'hidden' }}>
      
      {/* Grid Animado de Fondo */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 35px)', gap: '4px', position: 'absolute', opacity: 0.9, transform: 'perspective(500px) rotateX(20deg)' }}>
        {Array.from({ length: 64 }).map((_, i) => {
          const x = i % 8; const y = Math.floor(i / 8);
          const isPlayer = player.x === x && player.y === y;
          const isBoss = x === 6 && y === 1;
          const isPath = (x > 0 && x < 7 && y > 0 && y < 6);
          return (
            <div key={i} style={{ width: '35px', height: '35px', backgroundColor: isPlayer ? '#00f' : isBoss ? '#f00' : isPath ? '#111' : '#333', borderRadius: isPlayer || isBoss ? '50%' : '2px', transition: 'all 0.2s ease', boxShadow: isPlayer ? '0 0 15px #00f' : isBoss ? '0 0 15px #f00' : 'none' }}></div>
          )
        })}
      </div>

      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '160px' }}>
        <h2 style={{ margin: 0, color: '#fff', textShadow: '0 0 15px #000, 0 0 30px #000, 0 0 10px #00ffff', animation: 'pulse-text-fast 1s infinite alternate', fontFamily: 'monospace', letterSpacing: '8px', fontSize: '2.5rem', backgroundColor: 'rgba(0,0,0,0.4)', padding: '10px 30px', borderRadius: '10px', border: '1px solid rgba(0,255,255,0.2)' }}>PRESS START</h2>
      </div>

      <style>{`
         @keyframes float-boss { 0% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-15px) scale(1.05); } 100% { transform: translateY(0px) scale(1); } }
         @keyframes pulse-text-fast { 0% { opacity: 0.4; text-shadow: 0 0 5px #00ffff; } 100% { opacity: 1; text-shadow: 0 0 25px #00ffff; } }
       `}</style>
    </div>
  );
}

function Section0Wrapper({ slide }) {
  return (
    <>
      <div className="card-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="speaker-badge" style={{ backgroundColor: '#ff0055', alignSelf: 'flex-start' }}>{slide.speaker}</div>
        <h1 style={{ fontSize: '2.8rem', color: '#00ffff', textShadow: '2px 2px 0px #000', marginBottom: '20px' }}>{slide.title}</h1>
        {slide.content}
      </div>
      <div className="card-image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'radial-gradient(circle, #222 0%, #000 100%)', borderRadius: '15px' }}>
        <TitleVisualizer />
      </div>
    </>
  );
}

function ConclusionVisualizer() {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const arr = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      color: ['#ff0055', '#00ffff', '#00ff00', '#ffcc00', '#ff00ff'][Math.floor(Math.random() * 5)]
    }));
    setParticles(arr);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%', minHeight: '350px', justifyContent: 'center', position: 'relative', overflow: 'hidden', animation: 'fadeIn 1s ease', perspective: '1000px' }}>
      
      {/* Background Space Effect */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(ellipse at center, #1b2735 0%, #090a0f 100%)', zIndex: 0 }}></div>

      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, width: '8px', height: '8px', backgroundColor: p.color, borderRadius: '50%',
          animation: `firework 2.5s ease-out infinite ${p.delay}s`, opacity: 0, zIndex: 1, boxShadow: `0 0 15px ${p.color}`
        }}></div>
      ))}

      {/* Credits Scroll */}
      <div style={{ position: 'absolute', bottom: '-200px', width: '100%', textAlign: 'center', animation: 'scroll-credits 12s linear infinite', zIndex: 2, color: '#a0d4ff', fontFamily: 'monospace', fontSize: '14px', textShadow: '1px 1px 2px #000', opacity: 0.6 }}>
         <p style={{ margin: '8px 0' }}>DIRECTOR: Juan Rodríguez</p>
         <p style={{ margin: '8px 0' }}>LEAD PROGRAMMER: Miguel Oliver</p>
         <p style={{ margin: '8px 0' }}>AI ENGINEER: Nieves Pérez</p>
         <p style={{ margin: '8px 0' }}>AUDIOVISUAL ARTS: Alejandra Falcón</p>
         <p style={{ margin: '8px 0', marginTop: '20px', color: '#ffcc00' }}>SPECIAL THANKS: Profesor de Algoritmia</p>
      </div>

      <div style={{ zIndex: 10, backgroundColor: 'rgba(0,0,0,0.85)', padding: '40px 50px', borderRadius: '15px', border: '3px solid #ffcc00', textAlign: 'center', boxShadow: '0 0 50px rgba(255, 204, 0, 0.4)', transformStyle: 'preserve-3d', animation: 'float-card 4s ease-in-out infinite' }}>
        <h2 style={{ color: '#ffcc00', fontSize: '3.5rem', margin: 0, animation: 'neon-glow 1.5s infinite alternate', fontFamily: 'Impact, sans-serif', letterSpacing: '2px', textShadow: '2px 2px 0 #000' }}>MISSION ACCOMPLISHED</h2>
        <p style={{ color: '#fff', marginTop: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>¡Gracias por jugar!</p>
        <p style={{ color: '#aaa', fontSize: '1.2rem', marginTop: '10px', fontFamily: 'monospace' }}>Rank: S | Score: 99999</p>
      </div>
      <style>{`
         @keyframes firework {
           0% { transform: translateY(100px) scale(0); opacity: 1; }
           50% { transform: translateY(-50px) scale(1.5); opacity: 1; }
           100% { transform: translateY(-100px) scale(0) rotate(360deg); opacity: 0; }
         }
         @keyframes scroll-credits {
           0% { transform: translateY(0); opacity: 0; }
           10% { opacity: 1; }
           90% { opacity: 1; }
           100% { transform: translateY(-400px); opacity: 0; }
         }
         @keyframes neon-glow {
           0% { text-shadow: 0 0 5px #ffcc00, 0 0 10px #ffcc00, 0 0 20px #ff6600, 0 0 40px #ff6600; }
           100% { text-shadow: 0 0 10px #ffcc00, 0 0 20px #ffcc00, 0 0 40px #ffaa00, 0 0 80px #ffaa00; }
         }
         @keyframes float-card {
           0% { transform: translateY(0) rotateX(5deg) rotateY(-5deg); }
           50% { transform: translateY(-15px) rotateX(-5deg) rotateY(5deg); }
           100% { transform: translateY(0) rotateX(5deg) rotateY(-5deg); }
         }
      `}</style>
    </div>
  );
}

function Section5Wrapper({ slide }) {
  return (
    <>
      <div className="card-content">
        <div className="speaker-badge" style={{ backgroundColor: '#ffcc00', color: '#000' }}>{slide.speaker}</div>
        <h2>{slide.title}</h2>
        {slide.content}
      </div>
      <div className="card-image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '15px', overflow: 'hidden' }}>
        <ConclusionVisualizer />
      </div>
    </>
  );
}

const slides = [
  {
    id: 0,
    title: "Laberinto Interactivo con Niveles (C# y .NET)",
    speaker: "Proyecto Final de Algoritmia",
    customLayout: Section0Wrapper,
    content: (
      <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
        <p><strong>Integrantes:</strong></p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>👨‍💻 <span style={{ color: '#a0d4ff', fontWeight: 'bold' }}>Miguel Oliver:</span> Estructura de Datos y Matrices</li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>👨‍💻 <span style={{ color: '#a0d4ff', fontWeight: 'bold' }}>Juan Rodríguez:</span> Interfaz Gráfica y Eventos</li>
          <li style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>👩‍💻 <span style={{ color: '#ff88ff', fontWeight: 'bold' }}>Nieves Pérez:</span> Enemigos e Inteligencia Artificial</li>
          <li style={{ padding: '8px 0' }}>👩‍💻 <span style={{ color: '#ff88ff', fontWeight: 'bold' }}>Alejandra Falcón:</span> Multimedia y Finales</li>
        </ul>
      </div>
    )
  },
  {
    id: 1,
    title: "SECCION 1: Introducción, Estructura de Datos y Diseño de Niveles",
    speaker: "Miguel Oliver",
    customLayout: Section1Wrapper,
    content: (
      <>
        <div data-spy="intro">
          <h3>Introducción</h3>
          <p>El presente proyecto, titulado "Laberinto Interactivo con Niveles", es una aplicación desarrollada en el lenguaje C# bajo la plataforma .NET (Windows Forms), orientada a poner a prueba la lógica, el análisis y el razonamiento espacial del jugador. A través de este entorno interactivo, el usuario debe encontrar la salida de diferentes laberintos progresivamente más complejos, tomando decisiones bajo presión temporal y evitando obstáculos.</p>
          <p>Este proyecto fue concebido y programado haciendo uso estricto de los pilares fundamentales de la algoritmia y programación estructurada: estructuras de datos bidimensionales (matrices), estructuras de control iterativas y condicionales, manejo avanzado de eventos y el paradigma de Programación Orientada a Objetos (POO). A lo largo de este documento, se detallará cómo el sistema cumple de manera íntegra con todos los requisitos solicitados, así como la implementación de funcionalidades adicionales que enriquecen la experiencia.</p>
        </div>

        <div data-spy="matrix">
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
        </div>

        <div data-spy="levels">
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
        </div>
      </>
    )
  },
  {
    id: 2,
    title: "SECCION 2: Interfaz Gráfica, Controles y Manejo de Eventos",
    speaker: "Juan Rodríguez",
    customLayout: Section2Wrapper,
    content: (
      <>
        <div data-spy="keys">
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
        </div>

        <div data-spy="stats">
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
        </div>

        <div data-spy="spawn">
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
        </div>
      </>
    )
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
          <h3 style={{ color: '#fce300' }}>1. Interceptando Teclas y Previniendo Errores</h3>
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
          <h3 style={{ color: '#ffcc00' }}>2. Mecánicas de Recolección y Aleatoriedad</h3>
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
          <h3 style={{ color: '#a0d4ff' }}>3. Inteligencia Artificial: Búsqueda en Anchura (BFS)</h3>
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
          <h3 style={{ color: '#ff0000' }}>4. Hardcore: Fórmula de Distancia Geométrica y Desafíos Extremos</h3>
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
    customLayout: Section4Wrapper,
    content: (
      <>
        <div data-spy="avatar">
          <h3>Subida de Avatar Personalizado (Gestión de Archivos Locales)</h3>
          <p>
            <strong>Explicación Detallada:</strong> Se le otorga identidad al jugador permitiendo personalizar su representación visual mediante el uso de <code>OpenFileDialog</code>.
          </p>
          <p><strong>Evidencia de Código (FormMenu.cs):</strong></p>
          <pre><code>{`private void btnUploadAvatar_Click(object sender, EventArgs e)
{
    using (OpenFileDialog ofd = new OpenFileDialog())
    {
        ofd.Filter = "Archivos de Imagen|*.jpg;*.jpeg;*.png;*.bmp";
        if (ofd.ShowDialog() == DialogResult.OK)
        {
            _avatarImage = Image.FromFile(ofd.FileName); 
            pbAvatar.Image = _avatarImage; 
        }
    }
}`}</code></pre>
        </div>

        <div data-spy="glow">
          <h3>Texturas y Efecto Visual Pulsante (Renderizado Dinámico)</h3>
          <p><strong>Explicación Detallada:</strong> La casilla de salida emplea un cálculo senoidal para crear una ilusión óptica de pulsación (Glow Effect).</p>
          <p><strong>Evidencia de Código (FormJuego.cs):</strong></p>
          <pre><code>{`int targetSize = (int)(CellSize * _glowScale);
int offset = (CellSize - targetSize) / 2;
Rectangle targetRect = new Rectangle(x * CellSize + offset, y * CellSize + offset, targetSize, targetSize);
e.Graphics.DrawImage(Properties.Resources.salida, targetRect);`}</code></pre>
        </div>

        <div data-spy="audio">
          <h3>Sistema de Audio Integrado</h3>
          <p><strong>Explicación Detallada:</strong> Utilizando la clase nativa <code>System.Media.SoundPlayer</code> logramos que los sonidos se ejecuten sin bloquear el hilo principal.</p>
          <pre><code>{`public void PlayMusic()
{
    _musicPlayer.Stream = Properties.Resources.scary_music;
    _musicPlayer.PlayLooping();
}`}</code></pre>
        </div>

        <div data-spy="story">
          <h3>Pantallas de Historia y Múltiples Desenlaces (FormHistoria)</h3>
          <p><strong>Explicación Detallada:</strong> Añadiendo una capa narrativa al proyecto, el juego evalúa el estado del jugador al concluir los niveles.</p>
          <pre><code>{`public FormHistoria(bool perfectEnding)
{
    InitializeComponent();
    if (perfectEnding)
        txtStory.Text = "¡Felicidades! Lograste encontrar todos los apuntes perdidos, tu semestre está salvado.";
    else
        txtStory.Text = "Lograste escapar con vida, pero te faltaron apuntes de clase por recuperar.";
}`}</code></pre>
        </div>
      </>
    )
  },
  {
    id: 5,
    title: "CONCLUSIÓN Y CIERRE",
    speaker: "Equipo",
    customLayout: Section5Wrapper,
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
    )
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
                <div className="card-image" style={{ display: 'flex', flexDirection: 'column', gap: '15px', height: '100%', minHeight: 0 }}>
                  {slide.images ? slide.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`${slide.title} ${idx}`} style={{ borderRadius: '8px', flex: 1, minHeight: 0, objectFit: 'contain', width: '100%' }} />
                  )) : (
                    <img src={slide.image} alt={slide.title} style={{ borderRadius: '8px', flex: 1, minHeight: 0, objectFit: 'contain', width: '100%' }} />
                  )}
                </div>
              )}

              {slide.layout === 'single' && (
                <div className="card-image" style={{ marginTop: '10px' }}>
                  {slide.images ? slide.images.map((img, idx) => (
                    <img key={idx} src={img} alt={`${slide.title} ${idx}`} style={{ maxHeight: '120px', margin: '0 10px' }} />
                  )) : (
                    <img src={slide.image} alt={slide.title} style={{ maxHeight: '120px' }} />
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
