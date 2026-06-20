function renderizarPaginacion(totalPaginas, pagina){
    const contenedor = document.querySelector("#paginador-contenedor");

    contenedor.innerHTML="";
    
    const btnAnterior = document.createElement("button");
    btnAnterior.className = "paginador-btn paginador-nav";

    btnAnterior.innerText = "◀";
    btnAnterior.disabled = (pagina === 1); // Desactivado si es la pág 1

    btnAnterior.addEventListener("click", () => {
        paginaActual = pagina - 1; // Restamos 1 a la variable global
        cargarProductos(paginaActual); // Volvemos a pedir al backend
    });

    contenedor.appendChild(btnAnterior); // Lo metemos al HTML

    for (let i = 1; i <= totalPaginas; i++) {
    const btnNum = document.createElement("button");
    btnNum.className = "paginador-btn";
    btnNum.innerText = i;
    
    // Si el número coincide con la página actual, le metemos la clase activa para que resalte
    if (i === pagina) {
        btnNum.classList.add("active");
    }

    btnNum.addEventListener("click", () => {
        paginaActual = i; // Seteamos la página seleccionada
        cargarProductos(paginaActual); // Traemos esos productos
    });
    
    contenedor.appendChild(btnNum); // Lo metemos al HTML
    }

    const btnSiguiente = document.createElement("button");
    btnSiguiente.className = "paginador-btn paginador-nav";
    btnSiguiente.innerText = "▶";
    btnSiguiente.disabled = (pagina === totalPaginas); // Desactivado si estamos al final

    btnSiguiente.addEventListener("click", () => {
        paginaActual = pagina + 1; // Sumamos 1
        cargarProductos(paginaActual); // Volvemos a pedir al backend
    });
    contenedor.appendChild(btnSiguiente);

}