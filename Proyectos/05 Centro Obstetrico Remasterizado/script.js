// === DATOS DE LOS 5 SLIDES EMOCIONALES ===
const slides = [
  {
      titulo: "Conviértete en madre sin preocupaciones",
      descripcion: "Nuestro compromiso es acompañarte en cada paso del camino, para que puedas disfrutar de tu embarazo sin las dudas que puedan surgir.",
      imagen: "./img/emocional1.jpg"
  },
  {
      titulo: "El momento de tu vida está por llegar",
      descripcion: "Sabemos lo importante que es este viaje, y nuestro equipo está aquí para que todo salga perfecto.",
      imagen: "./img/emocional2.jpg"
  },
  {
      titulo: "Tranquilidad en cada latido",
      descripcion: "Con nuestra orientación y cuidado, sentirás la paz de que tu bebé está bien, y tu salud también.",
      imagen: "./img/emocional3.jpg"
  },
  {
      titulo: "Juntas, todo es más fácil",
      descripcion: "Nuestro equipo te brindará el apoyo necesario en cada momento, porque sabemos lo importante que es sentirte acompañada.",
      imagen: "./img/emocional4.jpg"
  },
  {
      titulo: "Tu embarazo, nuestra pasión",
      descripcion: "Nos encanta ser parte de este hermoso momento de tu vida, brindándote el mejor cuidado y apoyo en todo momento.",
      imagen: "./img/emocional5.jpg"
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

// === INICIAR CARRUSEL ===
crearIndicadores();
iniciarAutoplay();