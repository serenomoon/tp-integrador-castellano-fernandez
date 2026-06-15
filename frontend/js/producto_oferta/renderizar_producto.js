// js/renderizar.js
function renderizarProductos(array, type) {
    const contenedorProductos = document.getElementById("contenedor-productos");
    if (!contenedorProductos) return;
    
    let htmlProductos = "";

    // Filtrar por tipo si es necesario
    const productosFiltrados = type ? array.filter(p => p.type === type) : array;

    productosFiltrados.forEach(producto => {
        htmlProductos += `
            <div class="card-producto" data-id="${producto.id}" data-name="${producto.name}" data-image="${producto.image}" data-price="${producto.price}">
                <div>
                    <img src="${producto.image}" alt="${producto.name}">
                </div>
                <div class="card-producto-info">
                    <div>
                        <h3>${producto.name.toUpperCase()}</h3>
                        <p>ID: ${producto.id}</p>
                    </div>
                    <p>$${producto.price}</p>
                </div>
            </div>
        `;
    });

    contenedorProductos.innerHTML = htmlProductos;

    // Agregar eventos a las cards
    document.querySelectorAll(".card-producto").forEach(card => {
        card.addEventListener("click", function() {
            const producto = {
                id: parseInt(this.getAttribute("data-id")),
                name: this.getAttribute("data-name"),
                image: this.getAttribute("data-image"),
                price: parseInt(this.getAttribute("data-price"))
            };
            if (typeof agregarAlCarrito !== 'undefined') {
                agregarAlCarrito(producto);
            }
        });
    });
}