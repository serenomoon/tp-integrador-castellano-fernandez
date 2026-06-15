let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
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

function quitarUnaUnidad(id) {
    const index = carrito.findIndex(prod => prod.id === id);
    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
        guardarCarrito();
        renderizarCarrito();
        
        notificarCambioCarrito();
        
    }
}

function eliminarProducto(id) {
    carrito = carrito.filter(prod => prod.id !== id);
    guardarCarrito();
    renderizarCarrito();
    
    notificarCambioCarrito();
}