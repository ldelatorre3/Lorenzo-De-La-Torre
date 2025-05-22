document.addEventListener('DOMContentLoaded', function() {
    // Variables para el carrusel
    let currentSlide = 0;
    const slides = [
        {
            title: "Conviértete en madre sin preocupaciones",
            description: "Nuestro compromiso es acompañarte en cada paso del camino, para que puedas disfrutar de tu embarazo sin las dudas que puedan surgir.",
            pcImage: "./img/PC/imagen1-pc.jpg",
            mobileImage: "./img/mobile/imagen1-mobile.jpg"
        },
        {
            title: "El momento de tu vida está por llegar",
            description: "Sabemos lo importante que es este viaje, y nuestro equipo está aquí para que todo salga perfecto.",
            pcImage: "./img/PC/imagen2-pc.jpg",
            mobileImage: "./img/mobile/imagen2-mobile.jpg"
        },
        {
            title: "Tranquilidad en cada latido",
            description: "Con nuestra orientación y cuidado, sentirás la paz de que tu bebé está bien, y tu salud también.",
            pcImage: "./img/PC/imagen3-pc.jpg",
            mobileImage: "./img/mobile/imagen3-mobile.jpg"
        },
        {
            title: "Juntos, todo es más fácil",
            description: "Nuestro equipo te brindará el apoyo necesario en cada momento, porque sabemos lo importante que es sentirte acompañada.",
            pcImage: "./img/PC/imagen4-pc.jpg",
            mobileImage: "./img/mobile/imagen4-mobile.jpg"
        },
        {
            title: "Tu embarazo, nuestra pasión",
            description: "Nos encanta ser parte de este hermoso momento de tu vida, brindándote el mejor cuidado y apoyo en todo momento.",
            pcImage: "./img/PC/imagen5-pc.jpg",
            mobileImage: "./img/mobile/imagen5-mobile.jpg"
        }
    ];

    // Elementos del DOM
    const heroSection = document.querySelector('.hero-section');
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');
    const dotsContainer = document.getElementById('dots-container');
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    // Crear puntos de navegación
    slides.forEach((slide, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Configurar el carrusel automático
    let slideInterval = setInterval(nextSlide, 5000);

    // Función para cambiar de slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
        resetInterval();
    }

    // Función para el slide siguiente
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }

    // Función para el slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }

    // Actualizar el slide visible
    function updateSlide() {
        const slide = slides[currentSlide];
        heroTitle.textContent = slide.title;
        heroDescription.textContent = slide.description;
        
        // Cambiar imagen según el dispositivo
        const imageUrl = window.innerWidth >= 992 ? slide.pcImage : slide.mobileImage;
        heroSection.style.background = `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(${imageUrl}) no-repeat center center`;
        heroSection.style.backgroundSize = 'cover';
        
        // Actualizar puntos activos
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Reiniciar el intervalo del carrusel
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Menú móvil
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Función para desplazamiento suave
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - document.querySelector('.navbar').offsetHeight,
                behavior: 'smooth'
            });
        }
    }

    // Inicializar el primer slide
    updateSlide();

    // Manejar cambios de tamaño de pantalla
    window.addEventListener('resize', updateSlide);
});

// Funciones para los modales de Servicios
function openModal(title, description) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('serviceModal').style.display = 'block';
    
    // Agregar el icono como fondo según el servicio
    const modalContent = document.querySelector('.modal-content');
    let iconClass = '';
    
    switch(title) {
        case 'Ginecología':
            iconClass = 'fa-female';
            break;
        case 'Obstetricia':
            iconClass = 'fa-baby';
            break;
        case 'Medicina General':
            iconClass = 'fa-stethoscope';
            break;
        case 'Pediatría':
            iconClass = 'fa-child';
            break;
        case 'Controles Prenatales':
            iconClass = 'fa-heartbeat';
            break;
        case 'Planificación Familiar':
            iconClass = 'fa-heart';
            break;
        case 'Análisis Clínicos':
            iconClass = 'fa-flask';
            break;
    }
    
    modalContent.style.background = `white url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><text x='50%' y='50%' font-family='FontAwesome' font-size='80' fill='rgba(255,111,162,0.1)' text-anchor='middle' dominant-baseline='middle'>${getIconUnicode(iconClass)}</text></svg>") no-repeat center center`;
    modalContent.style.backgroundSize = 'contain';
}

function closeModal() {
    document.getElementById('serviceModal').style.display = 'none';
}

// Funciones para los modales de Equipo Médico
function openDoctorModal(name, description) {
    document.getElementById('doctorModalTitle').textContent = name;
    document.getElementById('doctorModalDescription').textContent = description;
    document.getElementById('doctorModal').style.display = 'block';
}

function closeDoctorModal() {
    document.getElementById('doctorModal').style.display = 'none';
}

// Función auxiliar para obtener el unicode de los iconos
function getIconUnicode(iconClass) {
    const icons = {
        'fa-female': '&#xf182;',
        'fa-baby': '&#xf77c;',
        'fa-stethoscope': '&#xf0f1;',
        'fa-child': '&#xf1ae;',
        'fa-heartbeat': '&#xf21e;',
        'fa-heart': '&#xf004;',
        'fa-flask': '&#xf0c3;',
        'fa-user-md': '&#xf0f0;'
    };
    return icons[iconClass] || '';
}

// Cerrar modales al hacer clic fuera del contenido
window.onclick = function(event) {
    const serviceModal = document.getElementById('serviceModal');
    const doctorModal = document.getElementById('doctorModal');
    
    if (event.target == serviceModal) {
        closeModal();
    }
    
    if (event.target == doctorModal) {
        closeDoctorModal();
    }
}

// Funcionalidad para Preguntas Frecuentes
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Cerrar todas las demás respuestas
            faqQuestions.forEach(q => {
                if (q !== question) {
                    const otherAnswer = q.nextElementSibling;
                    const otherToggle = q.querySelector('.faq-toggle');
                    otherAnswer.classList.remove('active');
                    otherToggle.classList.replace('fa-minus', 'fa-plus');
                }
            });
            
            // Alternar la respuesta actual
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            answer.classList.toggle('active');
            
            if (answer.classList.contains('active')) {
                toggle.classList.replace('fa-plus', 'fa-minus');
            } else {
                toggle.classList.replace('fa-minus', 'fa-plus');
            }
        });
    });
});

// Funcionalidad para Testimonios
document.addEventListener('DOMContentLoaded', function() {
    // Variables para el slider de testimonios
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.getElementById('testimonials-dots');
    let testimonialInterval;
    
    // Crear dots de navegación
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Función para cambiar testimonio
    function goToTestimonial(index) {
        testimonials[currentTestimonial].classList.remove('active');
        dots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = index;
        
        testimonials[currentTestimonial].classList.add('active');
        dots[currentTestimonial].classList.add('active');
        
        resetTestimonialInterval();
    }
    
    // Función para siguiente testimonio
    function nextTestimonial() {
        const nextIndex = (currentTestimonial + 1) % testimonials.length;
        goToTestimonial(nextIndex);
    }
    
    // Iniciar intervalo automático
    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
    
    // Reiniciar intervalo
    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }
    
    // Iniciar slider
    startTestimonialInterval();
});

// Funcionalidad para el formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí iría la lógica para enviar el formulario
    alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
    this.reset();
});

// Año actual en el footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Notificaciones FOMO
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

const fomoTimers = [5000, 10000, 15000]; // 5s, 10s, 15s
let fomoPaused = false;
let fomoTimeout;
let currentNotification = null;

function showRandomFomoNotification() {
    if (fomoPaused) {
        fomoTimeout = setTimeout(showRandomFomoNotification, 30000); // Reintentar después de 30s
        return;
    }

    const fomoContainer = document.getElementById('fomoContainer');
    fomoContainer.innerHTML = '';

    const randomMessage = fomoMessages[Math.floor(Math.random() * fomoMessages.length)];
    const randomTime = fomoTimers[Math.floor(Math.random() * fomoTimers.length)];

    const notification = document.createElement('div');
    notification.className = 'fomo-notification';
    notification.innerHTML = `
        <span>${randomMessage}</span>
        <button class="close-btn">&times;</button>
        <div class="timer"><div class="timer-progress" style="animation-duration: ${randomTime/1000}s"></div></div>
    `;

    fomoContainer.appendChild(notification);
    currentNotification = notification;

    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        notification.classList.add('hide');
        fomoPaused = true;
        setTimeout(() => {
            fomoPaused = false;
        }, 30000); // Pausa por 30s
    });

    // Eliminar notificación después del tiempo aleatorio
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }
    }, randomTime);

    // Programar próxima notificación
    const nextNotificationTime = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000; // Entre 5s y 15s
    fomoTimeout = setTimeout(showRandomFomoNotification, randomTime + nextNotificationTime);
}

// Iniciar notificaciones después de 5s
setTimeout(showRandomFomoNotification, 5000);

// Chatbot
document.addEventListener('DOMContentLoaded', function() {
    const chatbotBubble = document.getElementById('chatbotBubble');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const closeBtn = document.querySelector('.chatbot-close');
    const quickReplies = document.querySelectorAll('.quick-reply');
    let isChatOpen = false;
    
    // Abrir/cerrar chat
    chatbotBubble.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
    
    function toggleChat() {
        isChatOpen = !isChatOpen;
        chatbotWindow.classList.toggle('active', isChatOpen);
        
        if (isChatOpen && chatbotMessages.children.length === 0) {
            showGreeting();
        }
    }
    
    // Mostrar saludo según la hora
    function showGreeting() {
        const hour = new Date().getHours();
        let greeting;
        
        if (hour < 12) {
            greeting = "Buenos días, ¿te ayudo a reservar una cita?";
        } else if (hour < 19) {
            greeting = "Buenas tardes, ¿te ayudo a reservar una cita?";
        } else {
            greeting = "Buenas noches, ¿te ayudo a reservar una cita?";
        }
        
        // Mostrar indicador de que está escribiendo
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(typingIndicator);
        
        // Después de un retraso, mostrar el mensaje
        setTimeout(() => {
            chatbotMessages.removeChild(typingIndicator);
            addBotMessage(greeting);
        }, 2000);
    }
    
    // Respuestas rápidas
    quickReplies.forEach(reply => {
        reply.addEventListener('click', function() {
            const message = this.getAttribute('data-reply');
            sendUserMessage(message);
        });
    });
    
    // Enviar mensaje del usuario
    function sendUserMessage(message) {
        addUserMessage(message);
        
        // Simular retraso de respuesta
        setTimeout(() => {
            let response;
            
            switch(message) {
                case 'Precio por ecografía':
                    response = "La ecografía está costando S/. 60.00.";
                    break;
                case 'Precio por descarte de embarazo':
                    response = "El descarte está costando S/. 30.00.";
                    break;
                case 'Precio por consulta Ginecológica':
                    response = "La consulta está costando S/. 50.00.";
                    break;
                case 'Comunícame con una persona...':
                    response = "Un momento, abriendo WhatsApp para atención personalizada...";
                    break;
                default:
                    if (message.toLowerCase().includes('comunícame') || 
                        message.toLowerCase().includes('hablar') || 
                        message.toLowerCase().includes('persona')) {
                        response = "Un momento, te conectaré con un especialista...";
                    } else {
                        response = "Por favor selecciona una de las opciones rápidas para ayudarte mejor.";
                    }
            }
            
            // Mostrar indicador de que está escribiendo
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message typing-indicator';
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            chatbotMessages.appendChild(typingIndicator);
            
            // Después de un retraso, mostrar la respuesta
            setTimeout(() => {
                chatbotMessages.removeChild(typingIndicator);
                addBotMessage(response);
                
                // Redirigir a WhatsApp si es necesario
                if (response.includes('WhatsApp') || response.includes('especialista')) {
                    setTimeout(() => {
                        window.open('https://wa.me/51988218054', '_blank');
                    }, 1500);
                }
            }, 1500);
        }, 500);
    }
    
    // Añadir mensaje del bot
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Añadir mensaje del usuario
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Auto-scroll al final del chat
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});