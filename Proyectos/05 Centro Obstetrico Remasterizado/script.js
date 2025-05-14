document.addEventListener('DOMContentLoaded', function() {
    // Variables para el carrusel
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const downBtn = document.querySelector('.down');
    const indicatorsContainer = document.querySelector('.indicators');
    
    // Datos del carrusel
    const carouselData = [
        {
            title: "Conviértete en madre sin preocupaciones",
            description: "Nuestro compromiso es acompañarte en cada paso del camino, para que puedas disfrutar de tu embarazo sin las dudas que puedan surgir.",
            pcImage: "img/PC/imagen1-pc.jpg",
            mobileImage: "img/mobile/imagen1-mobile.jpg"
        },
        {
            title: "El momento de tu vida está por llegar",
            description: "Sabemos lo importante que es este viaje, y nuestro equipo está aquí para que todo salga perfecto.",
            pcImage: "img/PC/imagen2-pc.jpg",
            mobileImage: "img/mobile/imagen2-mobile.jpg"
        },
        {
            title: "Tranquilidad en cada latido",
            description: "Con nuestra orientación y cuidado, sentirás la paz de que tu bebé está bien, y tu salud también.",
            pcImage: "img/PC/imagen3-pc.jpg",
            mobileImage: "img/mobile/imagen3-mobile.jpg"
        },
        {
            title: "Juntos, todo es más fácil",
            description: "Nuestro equipo te brindará el apoyo necesario en cada momento, porque sabemos lo importante que es sentirte acompañada.",
            pcImage: "img/PC/imagen4-pc.jpg",
            mobileImage: "img/mobile/imagen4-mobile.jpg"
        },
        {
            title: "Tu embarazo, nuestra pasión",
            description: "Nos encanta ser parte de este hermoso momento de tu vida, brindándote el mejor cuidado y apoyo en todo momento.",
            pcImage: "img/PC/imagen5-pc.jpg",
            mobileImage: "img/mobile/imagen5-mobile.jpg"
        }
    ];
    
    let currentIndex = 0;
    let intervalId;
    
    // Crear indicadores
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        carouselData.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.dataset.index = index;
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // Cambiar slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlide();
        resetInterval();
    }
    
    // Actualizar slide
    function updateSlide() {
        const slide = carouselData[currentIndex];
        heroTitle.textContent = slide.title;
        heroDescription.textContent = slide.description;
        
        // Cambiar imagen según el tamaño de pantalla
        if (window.innerWidth < 992) {
            heroSection.style.backgroundImage = `url(${slide.mobileImage})`;
        } else {
            heroSection.style.backgroundImage = `url(${slide.pcImage})`;
        }
        
        // Actualizar indicadores
        const indicators = document.querySelectorAll('.indicators span');
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Siguiente slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselData.length;
        updateSlide();
    }
    
    // Slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        updateSlide();
    }
    
    // Reiniciar intervalo
    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }
    
    // Iniciar intervalo
    function startInterval() {
        intervalId = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    downBtn.addEventListener('click', () => {
        document.querySelector('#beneficios').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Menú móvil
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Cambiar imagen al redimensionar la ventana
    window.addEventListener('resize', updateSlide);
    
    // Inicializar
    createIndicators();
    updateSlide();
    startInterval();
});