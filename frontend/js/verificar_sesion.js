(function() {
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    if (!nombreUsuario) {
        window.location.href = "/index.html";
    }
})();