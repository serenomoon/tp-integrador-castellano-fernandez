function mostrarAlerta(titulo, mensaje) {
    const modal = document.getElementById("modalAlerta");
    document.getElementById("alertaTitulo").textContent = titulo;
    document.getElementById("alertaMensaje").textContent = mensaje;
    modal.style.display = "flex";
}

function cerrarAlerta() {
    const modal = document.getElementById("modalAlerta");
    modal.style.display = "none";
}

function mostrarModalConfirmacion() {
    const modal = document.getElementById("modalConfirmacion");
    modal.style.display = "flex";
}

function cerrarModalConfirmacion() {
    const modal = document.getElementById("modalConfirmacion");
    modal.style.display = "none";
}