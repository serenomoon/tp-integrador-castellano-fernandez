function renderizarCarrito() {
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="carrito-vacio">
                <p>🛒 Tu carrito está vacío</p>
                <a href="./remeras.html" class="btn-seguir-comprando">Seguir comprando</a>
            </div>
        `;
        document.getElementById("total-precio").textContent = "$0";
        return;
    }

    let htmlCarrito = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        const subtotal = producto.price * producto.cantidad;
        total += subtotal;
        
        htmlCarrito += `
            <div class="card-carrito" data-id="${producto.id}">
                <div class="card-carrito-img">
                    <img src="${producto.image}" alt="${producto.name}">
                </div>
                <div class="card-carrito-info">
                    <h3>${producto.name.toUpperCase()}</h3>
                    <p>ID: ${producto.id}</p>
                </div>
                <div class="card-carrito-cantidad">
                    <button class="btn-cantidad btn-restar" data-id="${producto.id}">-</button>
                    <span class="cantidad-numero">${producto.cantidad}</span>
                    <button class="btn-cantidad btn-sumar" data-id="${producto.id}">+</button>
                </div>
                <div class="card-carrito-precio">
                    <p>$${producto.price} c/u</p>
                    <p class="subtotal">Subtotal: $${subtotal}</p>
                </div>
                <div class="card-carrito-eliminar">
                    <button class="btn-eliminar" data-id="${producto.id}">✖</button>
                </div>
            </div>
        `;
    });

    contenedorCarrito.innerHTML = htmlCarrito;
    document.getElementById("total-precio").textContent = `$${total}`;

    document.querySelectorAll(".btn-sumar").forEach(btn => {
        btn.addEventListener("click", function() {
            const id = parseInt(this.getAttribute("data-id"));
            const producto = carrito.find(p => p.id === id);
            if (producto) {
                producto.cantidad++;
                guardarCarrito();
                renderizarCarrito();
            }
        });
    });

    document.querySelectorAll(".btn-restar").forEach(btn => {
        btn.addEventListener("click", function() {
            const id = parseInt(this.getAttribute("data-id"));
            const producto = carrito.find(p => p.id === id);
            if (producto) {
                if (producto.cantidad > 1) {
                    producto.cantidad--;
                } else {
                    quitarUnaUnidad(id);
                }
                guardarCarrito();
                renderizarCarrito();
            }
        });
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", function() {
            const id = parseInt(this.getAttribute("data-id"));
            eliminarProducto(id);
        });
    });
}