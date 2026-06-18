async function cargarComponentesComunes() {
    const headerElement = document.querySelector("header:not(.header-logo)");
    const footerElement = document.querySelector("footer");

    // Detectamos si estamos en una subcarpeta (pages/) o en la raíz
    const path = window.location.pathname;
    const esSubcarpeta = path.includes("/pages/");
    
    // Si estamos en la raíz (index.html), los recursos están en ./
    // Si estamos en pages/, los recursos están en ../
    const basePath = esSubcarpeta ? "../" : "./";
    const pagesPath = esSubcarpeta ? "./" : "./pages/";
    
    // 1. Cargar e Inyectar el Header (si el elemento existe en el HTML actual)
    if (headerElement) {
        try {
            const response = await fetch(`${basePath}components/header.html`);
            if (!response.ok) throw new Error("No se pudo cargar el header.");
            let html = await response.text();
            
            // Reemplazar los placeholders por las rutas dinámicas correctas
            html = html.replace(/{basePath}/g, basePath);
            html = html.replace(/{pagesPath}/g, pagesPath);
            
            headerElement.innerHTML = html;
            
            // Inicializar el evento del botón Salir después de inyectarlo en el DOM
            configurarBotonSalir(basePath);
        } catch (error) {
            console.error("Error cargando el header component:", error);
        }
    }

    // 2. Cargar e Inyectar el Footer (si el elemento existe)
    if (footerElement) {
        try {
            const response = await fetch(`${basePath}components/footer.html`);
            if (!response.ok) throw new Error("No se pudo cargar el footer.");
            const html = await response.text();
            footerElement.innerHTML = html;
        } catch (error) {
            console.error("Error cargando el footer component:", error);
        }
    }
}

// Configura el botón Salir dinámicamente según la ubicación del archivo
function configurarBotonSalir(basePath) {
    const btnSalir = document.getElementById("boton-salir");
    if (btnSalir) {
        btnSalir.addEventListener("click", function () {
            // Limpiar todo el estado de la compra e iniciar sesión del cliente
            localStorage.removeItem("nombreUsuario");
            localStorage.removeItem("carrito");
            localStorage.removeItem("ultimoTicket");
            
            // Redirigir al index.html de la raíz
            window.location.href = `${basePath}index.html`;
        });
    }
}

// Inicializar la carga cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", cargarComponentesComunes);
