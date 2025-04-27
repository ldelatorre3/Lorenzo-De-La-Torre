// Carrusel automático e interacción con indicadores
let currentSlide = 0;
const slides = document.querySelectorAll('.image-container .slide');
const indicators = document.querySelectorAll('.indicator');

function goToSlide(index) {
  currentSlide = index;
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none'; // Mostrar solo la imagen actual
    indicators[i].classList.toggle('active', i === index); // Cambiar el indicador activo
  });
}

// Iniciar el carrusel automáticamente
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}, 5000);

// Flechas de dirección
document.querySelector('.arrow-left').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(currentSlide);
});

document.querySelector('.arrow-right').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
});

// Interacción con los indicadores
indicators.forEach((indicator, i) => {
  indicator.addEventListener('click', () => {
    goToSlide(i);
  });
});

// Iniciar el carrusel en el primer slide
goToSlide(0);
