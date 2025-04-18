document.addEventListener("DOMContentLoaded", function () {
    const productos = document.querySelectorAll(".producto");

    productos.forEach((producto) => {
        producto.addEventListener("mouseenter", () => {
            producto.style.transform = "scale(1.03) rotate(1deg)";
            producto.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
            producto.style.transition = "transform 0.4s ease, box-shadow 0.4s ease";
        });

        producto.addEventListener("mouseleave", () => {
            producto.style.transform = "scale(1) rotate(0)";
            producto.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
        });
    });
});

    //----------------------------------------------------------------
    // Modo Oscuro
    //----------------------------------------------------------------

const botonModoOscuro = document.getElementById("modoOscuroBtn");
const body = document.body;
const logoImg = document.getElementById("logoImg");

// Definir las rutas de las imágenes
const logoClaro = "img/logo-adidas-W.jpg";
const logoOscuro = "img/logo-adidas-B.jpg";

// Comprobar si ya estaba en modo oscuro (para recordar la configuración)
if (localStorage.getItem("modoOscuro") === "true") {
    body.classList.add("modo-oscuro");
    logoImg.src = logoOscuro;
    botonModoOscuro.textContent = "☀️";
}

botonModoOscuro.addEventListener("click", () => {
    const esModoOscuro = body.classList.toggle("modo-oscuro"); // Alternar modo

    // Cambiar la imagen del logo INMEDIATAMENTE
    logoImg.src = esModoOscuro ? logoOscuro : logoClaro;

    // Cambiar el icono del botón
    botonModoOscuro.textContent = esModoOscuro ? "☀️" : "🌙";

    // Guardar la preferencia en el almacenamiento local
    localStorage.setItem("modoOscuro", esModoOscuro);
});

//----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.querySelector("nav ul");

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active"); // Muestra u oculta el menú
    });
});
//----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.querySelector(".menu");

    menuBtn.addEventListener("click", function () {
        menu.classList.toggle("active"); // Muestra u oculta el menú
    });
});

    //----------------------------------------------------------------
    // ChatBot
    //----------------------------------------------------------------

    document.addEventListener("DOMContentLoaded", function () {
        const chatToggle = document.getElementById("chat-toggle");
        const chatContainer = document.getElementById("chat-container");
        const sendBtn = document.getElementById("send-btn");
        const userInput = document.getElementById("user-input");
        const messages = document.getElementById("messages");
    
        // Inicializa el chat como oculto
        chatContainer.style.display = "none";
    
        // Mostrar / ocultar el chatbot con un solo clic
        chatToggle.addEventListener("click", () => {
            chatContainer.style.display = chatContainer.style.display === "none" ? "flex" : "none";
        });
    
        // Función para responder automáticamente
        function botResponse(userText) {
            let response = "";
    
            if (userText.includes("hola")) {
                response = "¡Hola! ¿En qué puedo ayudarte?";
            } else if (userText.includes("precio")) {
                response = "Tenemos descuentos especiales. ¿Sobre qué producto necesitas información?";
            } else if (userText.includes("envío")) {
                response = "Hacemos envíos a todo el país en 3-5 días hábiles.";
            } else {
                response = "No estoy seguro de entender. ¿Podrías reformular tu pregunta?";
            }
    
            return response;
        }
    
        // Función para enviar mensajes
        function sendMessage() {
            let userText = userInput.value.trim();
            if (userText === "") return;
    
            // Mostrar el mensaje del usuario
            let userMessage = document.createElement("div");
            userMessage.textContent = userText;
            userMessage.classList.add("user-message");
            messages.appendChild(userMessage);
    
            // Obtener y mostrar la respuesta del bot
            setTimeout(() => {
                let botMessage = document.createElement("div");
                botMessage.textContent = botResponse(userText.toLowerCase());
                botMessage.classList.add("bot-message");
                messages.appendChild(botMessage);
    
                // Redirigir a WhatsApp si el usuario quiere hablar con alguien real
                if (userText.includes("hablar con alguien")) {
                    setTimeout(() => {
                        window.open("https://wa.me/51988218054", "_blank"); // Reemplaza con tu número
                    }, 2000);
                }
            }, 1000);
    
            userInput.value = "";
            messages.scrollTop = messages.scrollHeight;
        }
    
        // Enviar mensaje con el botón
        sendBtn.addEventListener("click", sendMessage);
    
        // Enviar mensaje con la tecla Enter
        userInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    });

    //----------------------------------------------------------------
    // Pagos
    //----------------------------------------------------------------
    
    document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById("modal-pago");
        const botonesComprar = document.querySelectorAll(".btn"); 
        const cerrarModal = document.querySelector(".cerrar-modal");
        
        const btnYape = document.getElementById("btn-yape");
        const btnTarjeta = document.getElementById("btn-tarjeta");
        
        const pagoYape = document.getElementById("pago-yape");
        const pagoTarjeta = document.getElementById("pago-tarjeta");
        
        const confirmarYape = document.getElementById("confirmar-yape");
        const confirmarTarjeta = document.getElementById("confirmar-tarjeta");
    
        let productoSeleccionado = "";
        let precioSeleccionado = "";
    
        // Abrir modal al hacer clic en cualquier botón "Comprar"
        botonesComprar.forEach(boton => {
            boton.addEventListener("click", function (event) {
                event.preventDefault();
                productoSeleccionado = this.parentElement.querySelector("h3").textContent;
                precioSeleccionado = this.parentElement.querySelector("p").textContent;
                modal.style.display = "flex";
            });
        });
    
        // Cerrar modal
        cerrarModal.addEventListener("click", function () {
            modal.style.display = "none";
            pagoYape.style.display = "none";
            pagoTarjeta.style.display = "none";
        });
    
        // Mostrar Yape
        btnYape.addEventListener("click", function () {
            pagoYape.style.display = "block";
            pagoTarjeta.style.display = "none";
        });
    
        // Mostrar Tarjeta
        btnTarjeta.addEventListener("click", function () {
            pagoTarjeta.style.display = "block";
            pagoYape.style.display = "none";
        });
    
        // Confirmar Pago con Yape (Redirección a WhatsApp)
        confirmarYape.addEventListener("click", function () {
            const mensaje = `Hola, acabo de realizar el pago de *${productoSeleccionado}* por *${precioSeleccionado}* con Yape.`;
            const numeroWhatsApp = "51999999999"; // Reemplaza con tu número
            window.location.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        });
    
        // Confirmar Pago con Tarjeta (Redirección a WhatsApp)
        confirmarTarjeta.addEventListener("click", function () {
            const mensaje = `Hola, acabo de realizar el pago de *${productoSeleccionado}* por *${precioSeleccionado}* con Tarjeta.`;
            const numeroWhatsApp = "51999999999"; // Reemplaza con tu número
            window.location.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        });
    });

    //----------------------------------------------------------------
    // Pagos
    //----------------------------------------------------------------

    let servicioSeleccionado = "";

document.querySelectorAll(".btn-delivery").forEach((boton) => {
    boton.addEventListener("click", function () {
        servicioSeleccionado = this.getAttribute("data-delivery");
        alert(`Has seleccionado ${servicioSeleccionado} como tu servicio de entrega.`);
    });
});

document.getElementById("confirmar-delivery").addEventListener("click", function () {
    if (!servicioSeleccionado) {
        alert("Por favor, selecciona un servicio de delivery.");
        return;
    }
    
    // Mensaje automático en WhatsApp con la opción de delivery seleccionada
    let mensaje = `Hola, acabo de realizar un pedido y seleccioné ${servicioSeleccionado} como servicio de entrega.`;
    let numeroWhatsApp = "51XXXXXXXXX"; // Reemplaza con tu número
    
    let urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;
    
    window.location.href = urlWhatsApp;
});