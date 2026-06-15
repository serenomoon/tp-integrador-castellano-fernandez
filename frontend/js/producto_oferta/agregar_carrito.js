document.getElementById("btnAlertaAceptar")?.addEventListener("click", cerrarAlerta);

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(prod => prod.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    guardarCarrito();
    mostrarAlerta("Producto agregado", `${producto.name} se agregó al carrito 🛒`);
    
    notificarCambioCarrito();
    
}

function mostrarAlerta(titulo, mensaje) {
    document.getElementById("alertaTitulo").textContent = titulo;
    document.getElementById("alertaMensaje").textContent = mensaje;
    const modal = document.getElementById("modalAlerta");
    modal.style.display = "flex";
};

function cerrarAlerta() {
    const modal = document.getElementById("modalAlerta");
    modal.style.display = "none";
};