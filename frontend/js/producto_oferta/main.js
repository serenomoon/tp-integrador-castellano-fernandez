let paginaActual = 1;
let limiteProductos = 20;

async function cargarProductos(pagina) {
    let productos = [];
    try{
        const path = window.location.pathname;
        const categoria = path.includes("pantalones") ? "Pantalones" : "Remeras";

        const response = await fetch(`http://localhost:3000/api/productos?page=${pagina}&limit=${limiteProductos}&categoria=${categoria}`);

        const data = await response.json();
        productos = data.payload;
        const totalPaginas = data.totalPaginas;

        if(path.includes("pantalones")){
            renderizarProductos(productos, "oferta");
        }else{
            renderizarProductos(productos, "normal");
        }

        renderizarPaginacion(totalPaginas, pagina)
        
    }catch(error){
        console.error("Error cargando productos:", error);
    }
}

document.addEventListener("DOMContentLoaded", async function() {

    await cargarProductos(paginaActual);    
        
    const btnSalir = document.getElementById("boton-salir");
    if (btnSalir) {
        btnSalir.addEventListener("click", function() {
            localStorage.removeItem("nombreUsuario");
            window.location.href = "../index.html";
        });
    }
    
    const btnAceptar = document.getElementById("btnAlertaAceptar");
    if (btnAceptar) {
        btnAceptar.addEventListener("click", cerrarAlerta);
    }
});