document.addEventListener("DOMContentLoaded", function() {

    // const nombre = localStorage.getItem("nombreUsuario");
    // const bienvenida = document.getElementById("bienvenida");
    // if (nombre && bienvenida) {
    //     bienvenida.textContent = `HOLA ${nombre.toUpperCase()}`;
    // }
    
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    
    const path = window.location.pathname;
    if (path.includes("ofertas")) {
        renderizarProductos(productos, "oferta");
    } else {
        renderizarProductos(productos, "normal");
    }
    
    const btnSalir = document.getElementById("boton-salir");
    if (btnSalir) {
        btnSalir.addEventListener("click", function() {
            localStorage.removeItem("nombreUsuario");
            window.location.href = "../index.html";
        });
    }
    
    const btnAceptar = document.getElementById("btnAlertaAceptar");
    if (btnAceptar) {
        btnAceptar.addEventListener("click", cerrarAlerta);
    }
});