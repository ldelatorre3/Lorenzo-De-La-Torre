let menuVisible=false;
// función que oculta o muestra en menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible=false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible=true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList="";
    menuVisible=false
}
// funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills=document.getElementById("skills");
    var distancia_skills=window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills>=300){
        let habilidades=document.getElementsByClassName("progreso");
        habilidades[0].classList.add("htmlcss")
        habilidades[1].classList.add("javascript")
        habilidades[2].classList.add("github")
        habilidades[3].classList.add("sql")
        habilidades[4].classList.add("responsable")
        habilidades[5].classList.add("confiable")
        habilidades[6].classList.add("organizado")
        habilidades[7].classList.add("equipo")
    }
}

// detecto el scrolling para aplciar la animación de la barra de habilidades
window.onscroll=function(){
    efectoHabilidades();
}

// Actualizar año en el footer
document.getElementById('year').textContent = new Date().getFullYear();

/* Reproductor fondo de sonido */
// Configuración inicial
const music = document.getElementById('backgroundMusic');
music.src = './Imagine Dragons - Believer.mp3';
music.volume = 0.5;

const toggleBtn = document.querySelector('.music-toggle');

// Estrategia de autoplay mejorada
function initAudio() {
  // Intenta reproducir inmediatamente (puede fallar)
  const playPromise = music.play();
  
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        toggleBtn.classList.add('playing');
      })
      .catch(() => {
        // Si falla, espera interacción del usuario
        document.addEventListener('click', startAudioAfterInteraction, { once: true });
      });
  }
}

function startAudioAfterInteraction() {
  music.play()
    .then(() => {
      toggleBtn.classList.add('playing');
    })
    .catch(e => console.log("Error al reproducir:", e));
}

// Control manual
toggleBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  
  if (music.paused) {
    music.play();
    toggleBtn.classList.add('playing');
  } else {
    music.pause();
    toggleBtn.classList.remove('playing');
  }
});

// Intenta iniciar la música cuando:
// 1. La página carga
window.addEventListener('load', initAudio);

// 2. Después de un pequeño retraso (como respaldo)
setTimeout(initAudio, 1000);

// 3. Cuando la página gana el foco (útil para pestañas)
window.addEventListener('focus', () => {
  if (!music.paused) {
    music.play().catch(e => console.log("Error al retomar:", e));
  }
});