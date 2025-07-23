// Configuración
const nameText = "Primario Joel"; // Cambia esto por el nombre del cumpleañero
const balloonColors = ['#4b6cb7', '#3a5683', '#5d7cc7', '#2c3e50', '#3498db', 
                     '#2980b9', '#1f618d', '#154360', '#5dade2', '#2e86c1'];

// Crear globos con el nombre (cumpleañero en una línea, apellido en otra)
function createNameBalloons() {
    const balloonContainer = document.getElementById('balloons');
    const nameParts = nameText.split(' ');
    
    nameParts.forEach((part, partIndex) => {
        const nameLine = document.createElement('div');
        nameLine.className = 'name-line';
        
        part.split('').forEach((letter, i) => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = letter;
            balloon.style.background = balloonColors[(partIndex * part.length + i) % balloonColors.length];
            balloon.style.animationDelay = `${i * 0.1}s`;
            nameLine.appendChild(balloon);
        });
        
        balloonContainer.appendChild(nameLine);
    });
}

// Fuegos artificiales
function startFireworks() {
    setInterval(createFirework, 1200);
    
    for (let i = 0; i < 4; i++) {
        setTimeout(createFirework, i * 600);
    }
}

function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.5;
    
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    
    const colors = ['#4b6cb7', '#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    firework.style.backgroundColor = color;
    firework.style.boxShadow = `0 0 8px 2px ${color}`;
    
    document.body.appendChild(firework);
    
    setTimeout(() => {
        firework.style.transition = 'all 0.6s ease-out';
        firework.style.opacity = '1';
        firework.style.transform = 'scale(1.3)';
        
        setTimeout(() => {
            firework.style.opacity = '0';
            firework.style.transform = 'scale(0)';
            createExplosion(x, y, color);
            
            setTimeout(() => {
                document.body.removeChild(firework);
            }, 600);
        }, 600);
    }, 10);
}

function createExplosion(x, y, color) {
    const particles = 12 + Math.floor(Math.random() * 12);
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    container.style.width = '0';
    container.style.height = '0';
    document.body.appendChild(container);
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = '0';
        particle.style.top = '0';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 5px 1px ${color}`;
        
        container.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 40;
        const duration = 0.7 + Math.random() * 0.6;
        
        setTimeout(() => {
            particle.style.transition = `all ${duration}s ease-out`;
            particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            particle.style.opacity = '0';
            
            setTimeout(() => {
                container.removeChild(particle);
                if (container.children.length === 0) {
                    document.body.removeChild(container);
                }
            }, duration * 1000);
        }, 10);
    }
}

// Decoraciones flotantes
function createDecorations() {
    const emojis = ['🎉', '🎊', '✨', '🌟', '⚡', '🎁', '🎈'];
    
    for (let i = 0; i < 12; i++) {
        const decor = document.createElement('div');
        decor.className = 'decoration';
        decor.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        decor.style.left = `${Math.random() * 100}%`;
        decor.style.top = `${Math.random() * 100}%`;
        decor.style.animationDuration = `${12 + Math.random() * 20}s`;
        decor.style.animationDelay = `${Math.random() * 4}s`;
        
        document.body.appendChild(decor);
    }
}

// Inicialización
window.onload = function() {
    createNameBalloons();
    startFireworks();
    createDecorations();
};

// Reproducir música automáticamente
const bgMusic = document.getElementById('bgMusic');

// Esta función se necesita para el autoplay en algunos navegadores
function enableAutoplay() {
  bgMusic.volume = 1; // Volumen al 100% para que no sea muy fuerte
  const playPromise = bgMusic.play();
  
  // En algunos navegadores esto es necesario
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log("Autoplay prevented:", error);
      // Aquí podrías agregar un botón de "Activar audio" si quieres
    });
  }
}

// Intenta reproducir cuando la página cargue
enableAutoplay();

// También intenta reproducir después del primer click del usuario
document.body.addEventListener('click', () => {
  enableAutoplay();
}, { once: true });