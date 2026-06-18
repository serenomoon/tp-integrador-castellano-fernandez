function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    // if (typeof renderizarCarrito === 'function') renderizarCarrito();
    renderizarCarrito()
}

function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarAlerta("Carrito vacío", "No hay productos en tu carrito para finalizar la compra.");
        return;
    }
    mostrarModalConfirmacion();
}

async function confirmarCompra() {
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const fechaActual = new Date().toLocaleString();
    
    const venta = {
        cliente: nombreUsuario,
        fecha: fechaActual,
        items: carrito.map(item => ({
            id: item.id,
            nombre: item.name,
            cantidad: item.cantidad,
            precio_unitario: item.price,
            subtotal: item.price * item.cantidad
        })),
        total: carrito.reduce((sum, item) => sum + (item.price * item.cantidad), 0)
    };
    
    try {
        // Enviar a la API
        const response = await fetch("http://localhost:3000/api/ventas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(venta)
        });

        if (!response.ok) throw new Error("Error al guardar la venta");

        
        cerrarModalConfirmacion();
        generarTicketPDF(venta);
        vaciarCarrito();
        mostrarAlerta("Compra exitosa", "¡Gracias por tu compra! 🎉");
        
    } catch (error) {
        console.error(error);
        mostrarAlerta("Error", "No se pudo completar la compra. Intentá de nuevo.");
    }
}