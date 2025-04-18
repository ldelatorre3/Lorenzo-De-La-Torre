const bubble = document.getElementById("whatsapp-bubble");
const chatbotBox = document.getElementById("chatbot-box");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const closeChatbot = document.getElementById("close-chatbot");

// Obtener saludo automático
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días, ¿te ayudo a reservar una cita?";
  if (hour < 18) return "Buenas tardes, ¿te ayudo a reservar una cita?";
  return "Buenas noches, ¿te ayudo a reservar una cita?";
};

// Lista de respuestas automáticas
const respuestas = [
  { clave: "ecografia", respuesta: "La ecografía está costando S/. 60.00." },
  { clave: "descarte", respuesta: "El descarte está costando S/. 30.00." },
  { clave: "consulta", respuesta: "La consulta está costando S/. 50.00." },
  { clave: "persona", respuesta: "Un momento, te conectaré con un especialista..." },
  { clave: "hablar", respuesta: "Un momento, abriendo WhatsApp para atención personalizada..." }
];

// Obtener hora actual en formato HH:MM
const obtenerHora = () => {
  const ahora = new Date();
  const horas = ahora.getHours().toString().padStart(2, '0');
  const minutos = ahora.getMinutes().toString().padStart(2, '0');
  return `${horas}:${minutos}`;
};

// Mostrar mensaje en pantalla y Hora
const agregarMensaje = (texto, tipo = "bot") => {
  const msg = document.createElement("div");
  msg.classList.add(tipo);

  const contenido = document.createElement("span");
  contenido.textContent = texto;

  const hora = document.createElement("span");
  hora.textContent = obtenerHora();
  hora.style.fontSize = "0.75rem";
  hora.style.color = "#888";
  hora.style.marginLeft = "10px";

  msg.appendChild(contenido);
  msg.appendChild(hora);

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Efecto escribiendo...
const responderConEspera = (texto) => {
  agregarMensaje("Escribiendo...");
  setTimeout(() => {
    chatMessages.lastChild.remove();
    agregarMensaje(texto);
  }, 1000);
};

// Respuestas Rapidas
const mostrarOpcionesRapidas = () => {
  const opciones = [
    "Precio por ecografia",
    "Precio por descarte de embarazo",
    "Precio por consulta Ginecológica ",
    "Comunicame con una persona..."
  ];

  const contenedor = document.createElement("div");
  contenedor.classList.add("opciones-rapidas");

  opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.classList.add("opcion-btn");
    btn.addEventListener("click", () => {
      agregarMensaje(opcion, "user");
      procesarTextoRapido(opcion.toLowerCase());
      // contenedor.remove(); // eliminar opciones después de usarlas
    });
    contenedor.appendChild(btn);
  });

  chatMessages.appendChild(contenedor);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Procesar texto desde botón rápido
const procesarTextoRapido = (texto) => {
  const respuesta = respuestas.find(r => texto.includes(r.clave));
  if (respuesta) {
    responderConEspera(respuesta.respuesta);

    if (respuesta.clave === "hablar" || respuesta.clave === "persona") {
      setTimeout(() => {
        const mensaje = encodeURIComponent("Hola, necesito hablar con alguien");
        window.open(`https://wa.me/51988218054?text=${mensaje}`, "_blank");
      }, 2000);
    }
  } else {
    responderConEspera("Lo siento, no entendí tu mensaje. ¿Podrías repetirlo?");
  }
};

// Procesar mensaje del usuario
const procesarEntrada = () => {
  const texto = chatInput.value.trim().toLowerCase();
  if (!texto) return;

  agregarMensaje(chatInput.value, "user");
  chatInput.value = "";

  const respuesta = respuestas.find(r => texto.includes(r.clave));
  if (respuesta) {
    responderConEspera(respuesta.respuesta);

    if (respuesta.clave === "hablar" || respuesta.clave === "persona") {
      setTimeout(() => {
        const mensaje = encodeURIComponent("Hola, necesito hablar con alguien");
        window.open(`https://wa.me/51988218054?text=${mensaje}`, "_blank");
      }, 2000);
    }
  } else {
    responderConEspera("Lo siento, no entendí tu mensaje. ¿Podrías repetirlo?");
  }
};

// Saludo automático solo una vez
let saludoMostrado = false;

// Mostrar chatbot al hacer clic en burbuja
bubble.addEventListener("click", () => {
  chatbotBox.style.display = "flex";
  chatInput.focus(); // 👈 Dale foco al input apenas se abra el chatbot


  if (!saludoMostrado) {
    responderConEspera(getGreeting());
    setTimeout(mostrarOpcionesRapidas, 1200); // Mostrar botones después del saludo
    saludoMostrado = true;
  }
});

// Botón Enviar
sendBtn.addEventListener("click", procesarEntrada);

// Tecla Enter
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") procesarEntrada();
});

// Botón cerrar (solo oculta el chatbot por ahora)
closeChatbot.addEventListener("click", () => {
  chatbotBox.style.display = "none";
});

const closeBubbleBtn = document.getElementById("close-bubble-btn");

closeBubbleBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // evita que se abra el chatbot al hacer clic en la burbuja
  bubble.style.display = "none";
});
bubble.addEventListener("click", () => {
  chatbotBox.classList.add("open");
  chatbotBox.style.display = "flex";

  if (!primerSaludoHecho) {
    responderConEspera(getGreeting());
    primerSaludoHecho = true;
  }
});
const clearChatBtn = document.getElementById("clear-chat-btn");
clearChatBtn.addEventListener("click", () => {
  chatMessages.innerHTML = ""; // Borra los mensajes
});

// Ocultar Menu Hamburguesa
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});

// SERVICIOS
const modal = document.getElementById("modal-servicio");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeModalBtn = document.querySelector(".close-modal");

const serviciosData = {
  ginecologia: {
    img: "./img/ginecologia.jpg",
    title: "Ginecología",
    desc: "Diagnóstico, tratamiento y prevención de enfermedades del aparato reproductor femenino en todas las etapas de la vida."
  },
  obstetricia: {
    img: "./img/obstetricia.jpg",
    title: "Obstetricia",
    desc: "Brindamos atención integral durante el embarazo, parto y posparto, asegurando la salud de la madre y el bebé."
  },
  medicina: {
    img: "./img/medicina_general.jpg",
    title: "Medicina",
    desc: "La medicina general es la primera línea de atención médica, y un consultorio que ofrece este servicio se llama consultorio de medicina general."
  },
  pedriatria: {
    img: "./img/pediatria.jpg",
    title: "Pediatria",
    desc: "especialidad médica que se encarga de la salud de los niños desde su nacimiento hasta la adolescencia. Un consultorio de pediatría es un lugar donde se brinda atención médica a los niños."
  },
  prenatales: {
    img: "./img/controles_prenatales.jpg",
    title: "Prenatales",
    desc: "Los controles prenatales son fundamentales para garantizar la salud de la madre y el bebé durante el embarazo. Incluyen monitoreos regulares, ecografías y asesoramiento nutricional. Nuestro equipo ofrece atención personalizada y seguimiento continuo en cada etapa de la gestación."
  },
  planificacion: {
    img: "./img/planificacion-familiar.jpg",
    title: "Planificacion",
    desc: "Brindamos orientación y acceso a métodos anticonceptivos modernos, respetando tus decisiones y necesidades. Nuestra misión es acompañarte en la toma de decisiones informadas sobre tu salud sexual y reproductiva, en un entorno seguro y profesional."
  },
  analisis: {
    img: "./img/analisis_clinicos.jpg",
    title: "Analisis Clinicos",
    desc: "Ofrecemos una variedad de análisis de laboratorio para apoyar el diagnóstico y seguimiento de múltiples condiciones médicas. Nuestros resultados son confiables y rápidos, facilitando el tratamiento adecuado de manera oportuna y segura."
  },
  // Agrega aquí los demás servicios...
};

document.querySelectorAll(".service-card").forEach(card => {
  card.addEventListener("click", () => {
    const servicio = card.dataset.service;
    const data = serviciosData[servicio];

    modalImg.src = data.img;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modal.classList.remove("hidden");
  });
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// CARRUSEL
const track = document.querySelector('.services-track');
const cards = document.querySelectorAll('.service-card');
const btnLeft = document.querySelector('.carousel-arrow.left');
const btnRight = document.querySelector('.carousel-arrow.right');

let currentIndex = 0;

function getVisibleCards() {
  const containerWidth = document.querySelector('.services-container').offsetWidth;
  const cardWidth = cards[0].offsetWidth + 20; // incluye margen
  return Math.max(1, Math.floor(containerWidth / cardWidth));// Nunca menos de 1
}

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 20;
  const maxIndex = cards.length - getVisibleCards();
  if (currentIndex > maxIndex) currentIndex = 0;
  const moveX = currentIndex * cardWidth;
  track.style.transform = `translateX(-${moveX}px)`;
}

btnRight.addEventListener('click', () => {
  const maxIndex = cards.length - getVisibleCards();
  currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
  updateCarousel();
});

btnLeft.addEventListener('click', () => {
  const maxIndex = cards.length - getVisibleCards();
  currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
  updateCarousel();
});

// Auto avance cada 4 segundos
setInterval(() => {
  const maxIndex = cards.length - getVisibleCards();
  currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
  updateCarousel();
}, 4000);

// Actualiza al redimensionar ventana
window.addEventListener('resize', updateCarousel);

// EQUIPO MEDICO

// === DATOS DE LOS DOCTORES ===
const doctorData = {
  graciela: {
    img: './img/doctora1.jpg',
    nombre: 'Dra. Graciela Barzola',
    descripcion: 'Ginecóloga Obstetra con más de 10 años de experiencia atendiendo pacientes.',
    experiencia: 'Experiencia: Ginecología, Obstetricia, Control Prenatal',
    horarios: [
      'HORARIOS:',
      'Lunes : 8:00 AM - 8:00 PM',
      'Martes y Jueves : 8:00 PM - 6:00 PM',
      'Miércoles : 8:00 AM - 7:00 PM',
      'Sábados : 8:00 AM - 7:00 PM'
    ]
  },
  jorge: {
    img: './img/doctor2.jpg',
    nombre: 'Dr. Jorge Torres',
    descripcion: 'Dermatólogo especializado en afecciones cutáneas. Atención personalizada.',
    experiencia: 'Experiencia: Dermatología, Tratamientos faciales, Cuidado de la piel',
    horarios: [
      'HORARIOS:',
      'Sábado : 9:00 AM - 6:00 PM'
    ]
  },

    maria: {
    img: './img/doctora3.jpg',
    nombre: 'Dra. Maria Sanchez',
    descripcion: 'Ginecóloga Obstetra con más de 6 años de experiencia atendiendo pacientes.',
    experiencia: 'Experiencia: Ginecología y Obstetricia',
    horarios: [
      'HORARIOS:',
      'Miércoles : 8:00 AM - 7:00 PM',
      ]
  }

  // Puedes agregar más doctores aquí 🔥
};

// === ABRIR MODAL DE CUALQUIER DOCTOR ===
document.querySelectorAll('.doctor-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.doctor;
    const data = doctorData[key];
    const modal = document.getElementById('modal-doctor');

    if (data) {
      document.getElementById('doctor-img').src = data.img;
      document.getElementById('doctor-name').textContent = data.nombre;
      document.getElementById('doctor-description').textContent = data.descripcion;
      document.getElementById('doctor-experience').textContent = data.experiencia;

      const scheduleList = document.getElementById('doctor-schedule');
      scheduleList.innerHTML = '';
      data.horarios.forEach(horario => {
        const li = document.createElement('li');
        li.textContent = horario;
        scheduleList.appendChild(li);
      });

      modal.classList.remove('hidden');
    }
  });
});

// === CERRAR MODAL CON BOTÓN ===
document.querySelector('.close-doctor-modal').addEventListener('click', function() {
  document.getElementById('modal-doctor').classList.add('hidden');
});

// === CERRAR MODAL CLIC FUERA DEL CONTENIDO ===
const modalDoctor = document.getElementById("modal-doctor");
modalDoctor.addEventListener("click", function (event) {
  if (event.target === modalDoctor) {
    modalDoctor.classList.add("hidden");
  }
});

