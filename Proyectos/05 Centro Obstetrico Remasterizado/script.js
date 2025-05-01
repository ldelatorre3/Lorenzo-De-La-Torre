// === DATOS DE LOS 5 SLIDES EMOCIONALES ===
const slides = [
  {
      titulo: "Conviértete en madre sin preocupaciones",
      descripcion: "Nuestro compromiso es acompañarte en cada paso del camino, para que puedas disfrutar de tu embarazo sin las dudas que puedan surgir.",
      imagen: "./img/imagen1.jpg"
  },
  {
      titulo: "El momento de tu vida está por llegar",
      descripcion: "Sabemos lo importante que es este viaje, y nuestro equipo está aquí para que todo salga perfecto.",
      imagen: "./img/imagen2.jpg"
  },
  {
      titulo: "Tranquilidad en cada latido",
      descripcion: "Con nuestra orientación y cuidado, sentirás la paz de que tu bebé está bien, y tu salud también.",
      imagen: "./img/imagen3.jpg"
  },
  {
      titulo: "Juntos, todo es más fácil",
      descripcion: "Nuestro equipo te brindará el apoyo necesario en cada momento, porque sabemos lo importante que es sentirte acompañada.",
      imagen: "./img/imagen4.jpg"
  },
  {
      titulo: "Tu embarazo, nuestra pasión",
      descripcion: "Nos encanta ser parte de este hermoso momento de tu vida, brindándote el mejor cuidado y apoyo en todo momento.",
      imagen: "./img/imagen5.jpg"
  }
];

// === ELEMENTOS DEL DOM ===
const tituloSlide = document.getElementById("titulo-slide");
const descripcionSlide = document.getElementById("descripcion-slide");
const imagenSlide = document.getElementById("imagen-slide");
const indicadoresContainer = document.getElementById("indicadores");
let currentSlide = 0;
let intervalo;

// === FUNCIÓN PARA CREAR INDICADORES (PUNTOS) ===
function crearIndicadores() {
  slides.forEach((_, index) => {
      const punto = document.createElement("span");
      punto.classList.add("punto");
      if (index === 0) punto.classList.add("activo");
      punto.addEventListener("click", () => cambiarSlide(index));
      indicadoresContainer.appendChild(punto);
  });
}

// === FUNCIÓN PARA CAMBIAR SLIDE ===
function cambiarSlide(nuevoIndice) {
  currentSlide = nuevoIndice;
  actualizarSlide();
  reiniciarIntervalo();
}

// === ACTUALIZAR CONTENIDO DEL SLIDE ===
function actualizarSlide() {
  tituloSlide.textContent = slides[currentSlide].titulo;
  descripcionSlide.textContent = slides[currentSlide].descripcion;
  imagenSlide.src = slides[currentSlide].imagen;

  // Actualizar puntos activos
  document.querySelectorAll(".punto").forEach((punto, index) => {
      punto.classList.toggle("activo", index === currentSlide);
  });
}

// === AUTOPLAY (5 SEGUNDOS) ===
function iniciarAutoplay() {
  intervalo = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      actualizarSlide();
  }, 5000);
}

// === REINICIAR INTERVALO AL INTERACTUAR ===
function reiniciarIntervalo() {
  clearInterval(intervalo);
  iniciarAutoplay();
}

// === EVENTOS PARA FLECHAS ===
document.querySelector(".flecha-izquierda").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  actualizarSlide();
  reiniciarIntervalo();
});

document.querySelector(".flecha-derecha").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  actualizarSlide();
  reiniciarIntervalo();
});

// ===== TOGGLE MENÚ HAMBURGUESA =====
const menuHamburguesa = document.getElementById('menu-hamburguesa');
const headerRight = document.querySelector('.header__right');

// Abrir/cerrar con el icono
menuHamburguesa.addEventListener('click', (e) => {
    e.stopPropagation();
    menuHamburguesa.classList.toggle('activo');
    headerRight.classList.toggle('activo');
});

// Cerrar al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!headerRight.contains(e.target)) {
        menuHamburguesa.classList.remove('activo');
        headerRight.classList.remove('activo');
    }
});

// === INICIAR CARRUSEL ===
crearIndicadores();
iniciarAutoplay();

// Lista completa de notificaciones FOMO (Fear Of Missing Out)
const fomoMessages = [
  "¡Ana acaba de agendar su control prenatal para la semana 28! 👶📅",
  "Luisa reservó su consulta de planificación familiar hace 5 minutos 💊⏱️",
  "Dr. Martínez atendió 3 consultas ginecológicas en la última hora 🩺✨",
  "¡Nuevo record! 5 mamás reservaron sus ecografías hoy 📊🤰",
  "María acaba de confirmar su cita de obstetricia para mañana 🗓️❤️",
  "3 pacientes atendidas en pediatría en los últimos 30 minutos 👩‍⚕️👶",
  "¡Últimos 2 horarios disponibles para análisis clínicos esta semana! 💉⏳",
  "Familia Pérez acaba de agendar consultas de medicina general para todos 👨‍👩‍👧‍👦💖",
  "¡Atención! Solo quedan 3 cupos para controles prenatales este viernes 📅⚠️",
  "5 mujeres embarazadas reservaron su primera consulta hoy 🤰🎉"
];

// Configuración FOMO con botón de cierre
const fomoElement = document.querySelector('.fomo-notification');
fomoElement.innerHTML = `
    <span class="fomo-text"></span>
    <button class="fomo-close" aria-label="Cerrar notificación">×</button>
`;
let lastIndex = -1;
let currentWaitIndex = 0;
let isNotificationDismissed = false;
let lastDismissTime = 0; // Nuevo: para controlar el tiempo de pausa

// Función para cerrar manualmente
function dismissNotification() {
    fomoElement.style.animation = 'fadeOut 0.3s ease-out';
    isNotificationDismissed = true;
    lastDismissTime = Date.now(); // Registrar momento del cierre
    
    setTimeout(() => {
        fomoElement.style.display = 'none';
        
        // Reanudar después de 5 segundos
        setTimeout(() => {
            isNotificationDismissed = false;
            scheduleNextNotification(); // Programar normalmente
        }, 5000);
    }, 300);
}

// Eventos para el botón de cierre
fomoElement.addEventListener('click', function(e) {
    if (e.target.classList.contains('fomo-close')) {
        dismissNotification();
    }
});

fomoElement.addEventListener('touchend', function(e) {
    if (e.target.classList.contains('fomo-close')) {
        e.preventDefault();
        dismissNotification();
    }
}, {passive: false});

function showNotification() {
  // Verificar si fue cerrado manualmente y aún no pasaron 5 segundos
  if (isNotificationDismissed && (Date.now() - lastDismissTime < 5000)) return;
  
  // Seleccionar mensaje aleatorio sin repetición consecutiva
  let randomIndex;
  do {
      randomIndex = Math.floor(Math.random() * fomoMessages.length);
  } while (randomIndex === lastIndex && fomoMessages.length > 1);
  
  lastIndex = randomIndex;
  fomoElement.querySelector('.fomo-text').textContent = fomoMessages[randomIndex];
  fomoElement.style.animation = 'fadeIn 0.5s ease-out';
  fomoElement.style.display = 'flex';
  
  // Ocultar después del tiempo de visualización (solo si no fue cerrado manualmente)
  setTimeout(() => {
      if (!isNotificationDismissed) {
          fomoElement.style.animation = 'fadeOut 0.5s ease-out';
          setTimeout(() => {
              fomoElement.style.display = 'none';
              scheduleNextNotification();
          }, 500);
      }
  }, displayDuration);
}

function scheduleNextNotification() {
  currentWaitIndex = (currentWaitIndex + 1) % waitIntervals.length;
  const nextInterval = waitIntervals[currentWaitIndex];
  setTimeout(showNotification, nextInterval);
}

// Tiempo que la notificación estará visible (5 segundos)
const displayDuration = 5000; 

// Intervalos rotativos entre notificaciones (en ms)
const waitIntervals = [5000, 10000, 15000]; // 5, 10, 15 segundos

// Iniciar el sistema (primera notificación después de 3 segundos)
setTimeout(showNotification, 3000);