document.addEventListener('DOMContentLoaded', function() {
    // Navbar functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    }
    
    mobileMenu.addEventListener('click', toggleMenu);
    
    const navbarLinks = document.querySelectorAll('.navbar-link');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;

            if (targetId === '#inicio') {
                // Comportamiento especial para inicio (top de la página)
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Comportamiento para otras secciones
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero Slider
    const heroSection = document.querySelector('.hero-section');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroIndicators = document.querySelector('.hero-indicators');
    const prevArrow = document.querySelector('.hero-prev');
    const nextArrow = document.querySelector('.hero-next');
    
    // Slide content
    const slides = [
        {
            title: 'Conviértete en madre sin preocupaciones',
            description: 'Nuestro compromiso es acompañarte en cada paso del camino, para que puedas disfrutar de tu embarazo sin las dudas que puedan surgir.',
            pcImage: './img/PC/imagen1-pc.jpg',
            mobileImage: './img/mobile/imagen1-mobile.jpg'
        },
        {
            title: 'El momento de tu vida está por llegar',
            description: 'Sabemos lo importante que es este viaje, y nuestro equipo está aquí para que todo salga perfecto.',
            pcImage: './img/PC/imagen2-pc.jpg',
            mobileImage: './img/mobile/imagen2-mobile.jpg'
        },
        {
            title: 'Tranquilidad en cada latido',
            description: 'Con nuestra orientación y cuidado, sentirás la paz de que tu bebé está bien, y tu salud también.',
            pcImage: './img/PC/imagen3-pc.jpg',
            mobileImage: './img/mobile/imagen3-mobile.jpg'
        },
        {
            title: 'Juntos, todo es más fácil',
            description: 'Nuestro equipo te brindará el apoyo necesario en cada momento, porque sabemos lo importante que es sentirte acompañada.',
            pcImage: './img/PC/imagen4-pc.jpg',
            mobileImage: './img/mobile/imagen4-mobile.jpg'
        },
        {
            title: 'Tu embarazo, nuestra pasión',
            description: 'Nos encanta ser parte de este hermoso momento de tu vida, brindándote el mejor cuidado y apoyo en todo momento.',
            pcImage: './img/PC/imagen5-pc.jpg',
            mobileImage: './img/mobile/imagen5-mobile.jpg'
        }
    ];
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds
    
    // Create indicators
    slides.forEach((slide, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('hero-indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        heroIndicators.appendChild(indicator);
    });
    
    // Update slide
    function updateSlide() {
        const isMobile = window.innerWidth < 768; // Antes era 992
        const slide = slides[currentSlide];
        
        heroTitle.textContent = slide.title;
        heroDescription.textContent = slide.description;
        heroSection.style.backgroundImage = `url(${isMobile ? slide.mobileImage : slide.pcImage})`;
        
        // Update active indicator
        document.querySelectorAll('.hero-indicator').forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
        resetInterval();
    }
    
    // Reset autoplay interval
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    // Event listeners
    prevArrow.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    nextArrow.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    // Handle window resize
    window.addEventListener('resize', updateSlide);
    
    // Initialize slider
    updateSlide();
    resetInterval();
});

// Servicios Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // ... (código anterior se mantiene igual) ...
    
    // Servicios Modal
    const serviceCards = document.querySelectorAll('.service-card');
    const modalOverlay = document.getElementById('modalOverlay');
    const modals = document.querySelectorAll('.service-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Abrir modal al hacer clic en una card
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            const modal = document.getElementById(`${serviceId}-modal`);
            
            modalOverlay.classList.add('active');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Cerrar modal al hacer clic en el overlay o botón de cerrar
    function closeAllModals() {
        modalOverlay.classList.remove('active');
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = '';
    }
    
    modalOverlay.addEventListener('click', closeAllModals);
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Team Modal Functionality
    const teamProfileBtns = document.querySelectorAll('.profile-btn');
    const teamImageContainers = document.querySelectorAll('.team-image-container');
    const teamModalOverlay = document.getElementById('teamModalOverlay');
    const teamModals = document.querySelectorAll('.team-modal');
    const teamCloseButtons = document.querySelectorAll('.team-modal-close');
    
    // Abrir modal al hacer clic en botón de perfil o imagen
    function openTeamModal(doctorId) {
        const modal = document.getElementById(`${doctorId}-modal`);
        
        teamModalOverlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    teamProfileBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const doctorId = this.getAttribute('data-doctor');
            openTeamModal(doctorId);
        });
    });
    
    teamImageContainers.forEach(container => {
        container.addEventListener('click', function() {
            const doctorId = this.closest('.team-card').querySelector('.profile-btn').getAttribute('data-doctor');
            openTeamModal(doctorId);
        });
    });
    
    // Cerrar modal del equipo
    function closeAllTeamModals() {
        teamModalOverlay.classList.remove('active');
        teamModals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = '';
    }
    
    teamModalOverlay.addEventListener('click', closeAllTeamModals);
    
    teamCloseButtons.forEach(button => {
        button.addEventListener('click', closeAllTeamModals);
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (teamModalOverlay.classList.contains('active')) {
                closeAllTeamModals();
            }
            // También cierra los modales de servicios si están abiertos
            if (modalOverlay.classList.contains('active')) {
                closeAllModals();
            }
        }
    });

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros items abiertos y resetear sus iconos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    otherToggle.classList.replace('fa-minus', 'fa-plus');
                }
            });
            
            // Alternar el item actual
            item.classList.toggle('active');
            
            // Cambiar icono del item actual
            const toggleIcon = question.querySelector('.faq-toggle');
            if (item.classList.contains('active')) {
                toggleIcon.classList.replace('fa-plus', 'fa-minus');
            } else {
                toggleIcon.classList.replace('fa-minus', 'fa-plus');
            }
        });
    });

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.indicator');
    let currentTestimonial = 0;
    let testimonialInterval;
    const testimonialDuration = 5000; // 5 segundos
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        indicators[index].classList.add('active');
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, testimonialDuration);
    }
    
    // Click en indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            showTestimonial(index);
            startTestimonialInterval();
        });
    });
    
    // Iniciar slider automático
    startTestimonialInterval();

    
    // Actualizar año en el footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Validación básica del formulario
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí iría la lógica para enviar el formulario
            alert('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }
});