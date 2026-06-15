document.addEventListener("DOMContentLoaded", function() {

    const nombre = localStorage.getItem("nombreUsuario");
    const bienvenida = document.getElementById("bienvenida");
    if (nombre && bienvenida) {
        bienvenida.textContent = `HOLA ${nombre.toUpperCase()}`;
    }
    
    // if (typeof renderizarCarrito === 'function') {
    //     renderizarCarrito();
    // }
    renderizarCarrito();
    
    const btnFinalizar = document.getElementById("btn-finalizar-compra");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", finalizarCompra);
    }
    
    const btnConfirmarSi = document.getElementById("btnConfirmarSi");
    if (btnConfirmarSi) {
        btnConfirmarSi.addEventListener("click", confirmarCompra);
    }
    
    const btnConfirmarNo = document.getElementById("btnConfirmarNo");
    if (btnConfirmarNo) {
        btnConfirmarNo.addEventListener("click", cerrarModalConfirmacion);
    }
    
    const btnAceptar = document.getElementById("btnAlertaAceptar");
    if (btnAceptar) {
        btnAceptar.addEventListener("click", cerrarAlerta);
    }
    
    const btnSalir = document.getElementById("boton-salir");
    if (btnSalir) {
        btnSalir.addEventListener("click", function() {
            localStorage.removeItem("nombreUsuario");
            window.location.href = "../index.html";
        });
    }
});