let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
    window.mostrarConfirmacion(
        "Agregar al carrito", 
        `¿Querés agregar ${producto.name} al carrito? 🛒`,
        () => {
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
            notificarCambioCarrito();
            window.mostrarExito("¡Agregado!", `${producto.name} se agregó al carrito correctamente.`);
        }
    );
}