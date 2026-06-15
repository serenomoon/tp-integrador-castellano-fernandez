function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoElement = document.getElementById("carritoToggle");
    const contadorElement = document.getElementById("carritoContador");
    
    if (!contadorElement) return;
    
    // Calcular cantidad total de productos (sumando las cantidades)
    const totalProductos = carrito.reduce((sum, producto) => sum + (producto.cantidad || 1), 0);
    
    if (totalProductos > 0) {
        if (carritoElement) carritoElement.style.display = "flex";
        if (contadorElement) {
            contadorElement.textContent = totalProductos;
        }
    } else {
        if (carritoElement) carritoElement.style.display = "none";
    }
}

// Escuchar cambios en localStorage (cuando se agrega/quita un producto)
window.addEventListener("storage", function(event) {
    if (event.key === "carrito") {
        actualizarContadorCarrito();
    }
});

// También cada vez que se modifica el carrito manualmente
// Esta función se debe llamar después de modificar el carrito
function notificarCambioCarrito() {
    actualizarContadorCarrito();
    // Disparar evento personalizado
    window.dispatchEvent(new Event("carrito-actualizado"));
}

// Escuchar evento personalizado
window.addEventListener("carrito-actualizado", function() {
    actualizarContadorCarrito();
});

// Actualizar al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    actualizarContadorCarrito();
});