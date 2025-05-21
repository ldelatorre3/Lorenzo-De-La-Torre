// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const mobileBreakpoint = 992;
    let currentSlide = 0;
    let testimonialIndex = 0;
    let notificationInterval;
    let notificationPaused = false;
    let chatbotOpen = false;
    
    // Datos para el carrusel
    const slides = [
        {
            title: "Conviértete en madre sin preocupaciones",
            description: "Nuestro compromiso es acompañarte en cada paso del camino, para que puedas disfrutar de tu embarazo sin las dudas que puedan surgir.",
            pcImg: "./img/PC/imagen1-pc.jpg",
            mobileImg: "./img/mobile/imagen1-mobile.jpg"
        },
        {
            title: "El momento de tu vida está por llegar",
            description: "Sabemos lo importante que es este viaje, y nuestro equipo está aquí para que todo salga perfecto.",
            pcImg: "./img/PC/imagen2-pc.jpg",
            mobileImg: "./img/mobile/imagen2-mobile.jpg"
        },
        {
            title: "Tranquilidad en cada latido",
            description: "Con nuestra orientación y cuidado, sentirás la paz de que tu bebé está bien, y tu salud también.",
            pcImg: "./img/PC/imagen3-pc.jpg",
            mobileImg: "./img/mobile/imagen3-mobile.jpg"
        },
        {
            title: "Juntos, todo es más fácil",
            description: "Nuestro equipo te brindará el apoyo necesario en cada momento, porque sabemos lo importante que es sentirte acompañada.",
            pcImg: "./img/PC/imagen4-pc.jpg",
            mobileImg: "./img/mobile/imagen4-mobile.jpg"
        },
        {
            title: "Tu embarazo, nuestra pasión",
            description: "Nos encanta ser parte de este hermoso momento de tu vida, brindándote el mejor cuidado y apoyo en todo momento.",
            pcImg: "./img/PC/imagen5-pc.jpg",
            mobileImg: "./img/mobile/imagen5-mobile.jpg"
        }
    ];
    
    // Datos para testimonios
    const testimonials = [
        {
            name: "Lita Chavez",
            location: "Lima",
            rating: 5,
            text: "Excelente atención por parte del Dr. Honores. Me sentí muy cómoda durante toda mi gestación y el parto fue maravilloso gracias a su equipo.",
            image: "./img/paciente-test1.jpg"
        },
        {
            name: "María Fernández",
            location: "Callao",
            rating: 4,
            text: "La Dra. Barzola es una excelente profesional. Siempre atenta y con mucha paciencia para responder todas mis dudas durante el embarazo.",
            image: "./img/paciente-test2.jpg"
        },
        {
            name: "Ana Torres",
            location: "San Isidro",
            rating: 5,
            text: "El personal es muy amable y profesional. Las instalaciones son limpias y modernas. Recomiendo totalmente este centro médico.",
            image: "./img/paciente-test3.jpg"
        },
        {
            name: "Lucía Mendoza",
            location: "Miraflores",
            rating: 5,
            text: "La atención pediátrica de la Dra. Casas es excepcional. Mi bebé recibe el mejor cuidado posible y siempre salgo de la consulta con todas mis dudas resueltas.",
            image: "./img/paciente-test4.jpg"
        }
    ];
    
    // Datos para preguntas frecuentes
    const faqs = [
        {
            question: "¿A partir de qué semana se puede realizar la primera ecografía?",
            answer: "La primera ecografía se puede realizar a partir de la semana 6 de gestación, cuando ya es posible visualizar el saco gestacional y el embrión."
        },
        {
            question: "¿Con qué frecuencia debo asistir a controles prenatales?",
            answer: "En un embarazo normal, se recomienda:<ul><li>1 control mensual hasta la semana 28</li><li>1 control cada 15 días entre las semanas 28 y 36</li><li>1 control semanal a partir de la semana 36 hasta el parto</li></ul>"
        },
        {
            question: "¿Qué métodos de planificación familiar ofrecen?",
            answer: "Ofrecemos diversos métodos anticonceptivos:<ul><li>Pastillas anticonceptivas</li><li>DIU</li><li>Implante subdérmico</li><li>Inyecciones</li><li>Métodos de barrera</li></ul>"
        },
        {
            question: "¿Cuánto tiempo debo esperar para un nuevo embarazo después de una cesárea?",
            answer: "Se recomienda esperar al menos 18 meses después de una cesárea para permitir que el útero se recupere completamente y reducir riesgos en el siguiente embarazo."
        }
    ];
    
    // Datos para notificaciones FOMO
    const notifications = [
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
    
    // Datos para respuestas rápidas del chatbot
    const quickReplies = {
        "Precio por ecografía": "La ecografía está costando S/. 60.00.",
        "Precio por descarte de embarazo": "El descarte está costando S/. 30.00.",
        "Precio por consulta Ginecológica": "La consulta está costando S/. 50.00.",
        "Comunícame con una persona...": "Un momento, abriendo WhatsApp para atención personalizada..."
    };
    
    // Inicialización
    initNavbar();
    initHeroSlider();
    initServices();
    initTeam();
    initFAQs();
    initTestimonials();
    initContactForm();
    initFOMONotifications();
    initChatbot();
    updateCopyrightYear();
    
    // Funciones de inicialización
    function initNavbar() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Smooth scrolling para enlaces
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    function initHeroSlider() {
        const heroSection = document.querySelector('.hero-section');
        const heroContent = document.querySelector('.hero-content');
        const sliderDots = document.querySelector('.slider-dots');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        // Crear puntos de navegación
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
        
        // Cargar primera imagen
        updateSlide();
        
        // Event listeners para flechas
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
        
        // Carrusel automático
        let slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
        
        // Pausar al pasar el mouse
        heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSection.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000);
        });
        
        function goToSlide(index) {
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;
            
            currentSlide = index;
            updateSlide();
        }
        
        function updateSlide() {
            const slide = slides[currentSlide];
            const isMobile = window.innerWidth < mobileBreakpoint;
            
            // Actualizar imagen de fondo
            heroSection.style.backgroundImage = `url('${isMobile ? slide.mobileImg : slide.pcImg}')`;
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
            heroSection.style.backgroundRepeat = 'no-repeat';
            
            // Actualizar contenido
            heroContent.querySelector('h1').textContent = slide.title;
            heroContent.querySelector('p').textContent = slide.description;
            
            // Actualizar puntos de navegación
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Actualizar al cambiar tamaño de pantalla
        window.addEventListener('resize', updateSlide);
    }
    
    function initServices() {
        const serviceCards = document.querySelectorAll('.service-card');
        const serviceModal = document.getElementById('service-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeModal = document.querySelector('.close-modal');
        
        // Datos de servicios
        const servicesData = {
            "ginecologia": {
                title: "Ginecología",
                description: "Consulta especializada en salud femenina, incluyendo revisiones anuales, diagnóstico y tratamiento de enfermedades ginecológicas, y seguimiento de la salud reproductiva."
            },
            "obstetricia": {
                title: "Obstetricia",
                description: "Acompañamiento durante el embarazo, parto y puerperio. Controles prenatales, ecografías y preparación para el nacimiento de tu bebé."
            },
            "medicina-general": {
                title: "Medicina General",
                description: "Atención médica integral para mujeres en todas las etapas de la vida, desde la adolescencia hasta la adultez y la tercera edad."
            },
            "pediatria": {
                title: "Pediatría",
                description: "Cuidado especializado para tus hijos desde el nacimiento hasta la adolescencia, con énfasis en prevención, crecimiento y desarrollo."
            },
            "controles-prenatales": {
                title: "Controles Prenatales",
                description: "Seguimiento médico del embarazo para garantizar la salud de la madre y el bebé, incluyendo ecografías, análisis y recomendaciones nutricionales."
            },
            "planificacion-familiar": {
                title: "Planificación Familiar",
                description: "Asesoramiento y métodos anticonceptivos para ayudarte a planificar tu familia según tus necesidades y proyectos de vida."
            },
            "analisis-clinicos": {
                title: "Análisis Clínicos",
                description: "Realización de pruebas de laboratorio para diagnóstico y seguimiento de diversas condiciones médicas, con resultados confiables y oportunos."
            }
        };
        
        // Event listeners para cards de servicios
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceId = card.getAttribute('data-service');
                const service = servicesData[serviceId];
                
                modalTitle.textContent = service.title;
                modalDescription.innerHTML = service.description;
                
                // Establecer imagen de fondo según el servicio
                const iconClass = card.querySelector('i').className;
                serviceModal.querySelector('.modal-content').style.backgroundImage = `none`;
                
                serviceModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Cerrar modal
        closeModal.addEventListener('click', () => {
            serviceModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                serviceModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    function initTeam() {
        const doctorCards = document.querySelectorAll('.team-card');
        const doctorModal = document.getElementById('doctor-modal');
        const doctorName = document.getElementById('doctor-name');
        const doctorInfo = document.getElementById('doctor-info');
        const closeModal = document.querySelectorAll('.close-modal')[1];
        
        // Datos del equipo médico
        const teamData = {
            "Dra. Graciela Barzola": {
                info: "Obstetra con más de 15 años de experiencia en seguimiento de embarazos de alto y bajo riesgo. Especializada en medicina fetal y ecografía obstétrica. Graduada con honores de la Universidad Nacional Mayor de San Marcos y con maestría en Salud Pública.",
                linkedin: "#"
            },
            "Dr. Carlos Honores": {
                info: "Ginecólogo especializado en cirugía laparoscópica y tratamientos de infertilidad. Miembro de la Sociedad Peruana de Obstetricia y Ginecología. Más de 10 años de experiencia en diagnóstico y tratamiento de patologías ginecológicas.",
                linkedin: "#"
            },
            "Dra. Maria Casas": {
                info: "Pediatra con especialización en neonatología. Amplia experiencia en cuidado de recién nacidos y seguimiento del desarrollo infantil. Miembro activo de la Sociedad Peruana de Pediatría y conferencista en temas de nutrición infantil.",
                linkedin: "#"
            }
        };
        
        // Event listeners para cards de doctores
        doctorCards.forEach(card => {
            const doctorImg = card.querySelector('.doctor-img');
            const doctorBtn = card.querySelector('.btn-doctor');
            const doctorTitle = card.querySelector('h3').textContent;
            const linkedinBtn = card.querySelector('.btn-linkedin');
            
            // Abrir modal al hacer clic en imagen o botón
            [doctorImg, doctorBtn].forEach(element => {
                element.addEventListener('click', () => {
                    const doctor = teamData[doctorTitle];
                    
                    doctorName.textContent = doctorTitle;
                    doctorInfo.textContent = doctor.info;
                    
                    doctorModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Configurar LinkedIn
            if (teamData[doctorTitle]) {
                linkedinBtn.href = teamData[doctorTitle].linkedin;
            }
        });
        
        // Cerrar modal
        closeModal.addEventListener('click', () => {
            doctorModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === doctorModal) {
                doctorModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    function initFAQs() {
        const faqContainer = document.querySelector('.faq-container');
        
        // Agregar preguntas frecuentes adicionales
        faqs.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item');
            
            faqItem.innerHTML = `
                <button class="faq-question">
                    <i class="fas fa-heartbeat"></i>
                    <span>${faq.question}</span>
                    <i class="fas fa-plus"></i>
                </button>
                <div class="faq-answer">
                    ${faq.answer}
                </div>
            `;
            
            faqContainer.appendChild(faqItem);
        });
        
        // Event listeners para preguntas
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const plusIcon = question.querySelector('.fa-plus');
                
                // Cerrar todas las respuestas primero
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    if (ans !== answer) {
                        ans.classList.remove('show');
                        ans.previousElementSibling.querySelector('.fa-plus').classList.remove('active');
                    }
                });
                
                // Alternar la respuesta actual
                answer.classList.toggle('show');
                plusIcon.classList.toggle('active');
            });
        });
    }
    
    function initTestimonials() {
        const testimonialsContainer = document.querySelector('.testimonials-container');
        const testimonialDots = document.querySelector('.testimonial-dots');
        
        // Crear puntos de navegación para testimonios
        testimonials.forEach((testimonial, index) => {
            const dot = document.createElement('span');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(index));
            testimonialDots.appendChild(dot);
        });
        
        // Mostrar primer testimonio
        showTestimonial(0);
        
        // Carrusel automático
        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            showTestimonial(testimonialIndex);
        }, 5000);
        
        function showTestimonial(index) {
            testimonialIndex = index;
            const testimonial = testimonials[index];
            
            // Actualizar contenido
            const testimonialElement = document.querySelector('.testimonial');
            testimonialElement.innerHTML = `
                <div class="testimonial-content">
                    <img src="${testimonial.image}" alt="Testimonio ${index + 1}" class="testimonial-img">
                    <div class="testimonial-text">
                        <div class="testimonial-header">
                            <h3>${testimonial.name}</h3>
                            <div class="testimonial-rating">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${testimonial.location}</span>
                                <div class="stars">
                                    ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
                                </div>
                            </div>
                        </div>
                        <p>"${testimonial.text}"</p>
                    </div>
                </div>
            `;
            
            // Actualizar puntos de navegación
            document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }
    
    function initContactForm() {
        const form = document.getElementById('form-contacto');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío del formulario
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Enviado';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    function initFOMONotifications() {
        const fomoNotification = document.querySelector('.fomo-notification');
        const fomoMessage = document.querySelector('.fomo-message');
        const closeFomo = document.querySelector('.close-fomo');
        const fomoTimer = document.querySelector('.fomo-timer');
        
        function showRandomNotification() {
            if (notificationPaused) return;
            
            const randomIndex = Math.floor(Math.random() * notifications.length);
            fomoMessage.textContent = notifications[randomIndex];
            
            // Mostrar notificación
            fomoNotification.classList.add('show');
            
            // Configurar temporizador
            const duration = [5000, 10000, 15000][Math.floor(Math.random() * 3)];
            fomoTimer.style.animationDuration = `${duration}ms`;
            
            // Ocultar después de la duración
            setTimeout(() => {
                if (fomoNotification.classList.contains('show')) {
                    fomoNotification.classList.remove('show');
                }
            }, duration);
            
            // Programar próxima notificación
            const nextNotificationDelay = duration + [5000, 10000, 15000][Math.floor(Math.random() * 3)];
            notificationInterval = setTimeout(showRandomNotification, nextNotificationDelay);
        }
        
        // Cerrar notificación
        closeFomo.addEventListener('click', () => {
            fomoNotification.classList.remove('show');
            clearTimeout(notificationInterval);
            
            // Pausar notificaciones por 30 segundos
            notificationPaused = true;
            setTimeout(() => {
                notificationPaused = false;
                showRandomNotification();
            }, 30000);
        });
        
        // Mostrar primera notificación después de 5 segundos
        setTimeout(showRandomNotification, 5000);
    }
    
    function initChatbot() {
        const chatbotBubble = document.querySelector('.chatbot-bubble');
        const chatbotWindow = document.querySelector('.chatbot-window');
        const closeChatbot = document.querySelector('.close-chatbot');
        const quickReplies = document.querySelectorAll('.quick-reply');
        const botMessage = document.querySelector('.bot-message');
        
        // Alternar ventana del chatbot
        chatbotBubble.addEventListener('click', () => {
            chatbotOpen = !chatbotOpen;
            chatbotWindow.classList.toggle('open', chatbotOpen);
            
            if (chatbotOpen) {
                showGreeting();
            }
        });
        
        // Cerrar chatbot
        closeChatbot.addEventListener('click', () => {
            chatbotOpen = false;
            chatbotWindow.classList.remove('open');
        });
        
        // Respuestas rápidas
        quickReplies.forEach(reply => {
            reply.addEventListener('click', () => {
                const replyText = reply.textContent;
                let response = "";
                
                if (replyText.includes("ecografía")) {
                    response = "La ecografía está costando S/. 60.00.";
                } else if (replyText.includes("descarte")) {
                    response = "El descarte está costando S/. 30.00.";
                } else if (replyText.includes("Ginecológica")) {
                    response = "La consulta está costando S/. 50.00.";
                } else if (replyText.includes("persona")) {
                    response = "Un momento, abriendo WhatsApp para atención personalizada...";
                    setTimeout(() => {
                        window.open('https://wa.me/51988218054', '_blank');
                    }, 2000);
                }
                
                botMessage.textContent = response;
            });
        });
        
        function showGreeting() {
            const hour = new Date().getHours();
            let greeting = "";
            
            if (hour < 12) {
                greeting = "Buenos días";
            } else if (hour < 19) {
                greeting = "Buenas tardes";
            } else {
                greeting = "Buenas noches";
            }
            
            // Simular "escribiendo"
            botMessage.textContent = "";
            setTimeout(() => {
                botMessage.textContent = `${greeting}, ¿te ayudo a reservar una cita?`;
            }, 1500);
        }
    }
    
    function updateCopyrightYear() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling para la flecha de scroll down
    document.querySelector('.scroll-down').addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});