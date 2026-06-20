const path = window.location.pathname;
const esIndex = path.includes("index.html") || path === "/";

function validarNombre(nombre) {
    nombre = nombre.trim();
    
    if (nombre === "") {
        return { valido: false, mensaje: "Por favor, ingresá tu nombre" };
    }
    if (nombre.length < 3) {
        return { valido: false, mensaje: "El nombre debe tener al menos 3 caracteres" };
    }
    if (nombre.length > 30) {
        return { valido: false, mensaje: "El nombre no puede tener más de 30 caracteres" };
    }
    const regexSoloLetras = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s\.\,\-\']+$/;
    if (!regexSoloLetras.test(nombre)) {
        return { valido: false, mensaje: "El nombre solo puede contener letras, espacios, puntos, comas, guiones o apóstrofes" };
    }
    if (/\d/.test(nombre)) {
        return { valido: false, mensaje: "El nombre no puede contener números" };
    }
    if (/[!@#$%^&*()_+={}\[\]|\\:;"'<>?]/.test(nombre) && !/[\.\,\-\']/.test(nombre)) {
        return { valido: false, mensaje: "El nombre contiene caracteres no válidos" };
    }
    
    return { valido: true, mensaje: "", name: nombre };
}

// Verifico si esta en el index
if (esIndex) {

    const nombreUsuario = localStorage.getItem("nombreUsuario");
    if (nombreUsuario) {
        window.location.href = "./pages/remeras.html";
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("formNombre");
        const inputNombre = document.getElementById("nombreUsuario");
        
        if (!form) return;
        
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let nombre = inputNombre.value;
            
            const resultado = validarNombre(nombre);
            
            if (!resultado.valido) {
                alert(resultado.mensaje);
                return;
            }
            
            localStorage.setItem("nombreUsuario", resultado.name);
            window.location.href = "./pages/remeras.html";
        });
    });
} 

// Si es otra pagina chqueo el nombre
else {
    document.addEventListener("DOMContentLoaded", () => {
        const nombre = localStorage.getItem("nombreUsuario");
        const bienvenida = document.getElementById("bienvenida");
        if (bienvenida && nombre) {
            bienvenida.textContent = `HOLA ${nombre.toUpperCase()}`;
        }
    });
}