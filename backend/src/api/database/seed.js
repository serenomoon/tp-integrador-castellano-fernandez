import connection from "./db.js";
import bcrypt from "bcrypt";
import productosDefecto from "./productos.json" with {type: "json"};

async function seed() {
    try {
        console.log("🚀 Iniciando semillado de base de datos...");

        const nombre = "Admin Principal";
        const correo = "admin@autoservicio.com";
        const contrasena = "castellanosaulo";
        const rol = "admin";

        // 1. Verificar si el usuario ya existe
        const [existentes] = await connection.query(
            "SELECT id FROM usuarios WHERE correo = ?",
            [correo]
        );

        if (existentes.length > 0) {
            console.log(`⚠️ El usuario con correo "${correo}" ya existe.`);
            console.log(`   ID: ${existentes[0].id}`);
            console.log("   Saltando creación...");

            // Opcional: actualizar la contraseña si cambió
            const passwordHash = await bcrypt.hash(contrasena, 10);
            await connection.query(
                "UPDATE usuarios SET contrasena = ? WHERE correo = ?",
                [passwordHash, correo]
            );
            console.log("🔄 Contraseña actualizada.");

        } else {
            // 2. Crear el usuario
            const passwordHash = await bcrypt.hash(contrasena, 10);
            const [result] = await connection.query(
                "INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)",
                [nombre, correo, passwordHash, rol]
            );

            console.log("✅ Usuario admin creado con éxito:");
            console.log(`   - ID: ${result.insertId}`);
            console.log(`   - Nombre: ${nombre}`);
            console.log(`   - Correo: ${correo}`);
            console.log(`   - Rol: ${rol}`);
        }

        const imagenesRemeras = [
            "/uploads/remera01.webp", 
            "/uploads/remera02.jpg",
            "/uploads/remera03.jpg",
            "/uploads/remera04.jpg",
            "/uploads/remera05.jpg",
            "/uploads/remera05.webp"
        ];

        const imagenesPantalones = [
            "/uploads/pantalon01.jpg",
            "/uploads/pantalon02.jpg",
            "/uploads/pantalon03.jpg",
            "/uploads/pantalon04.jpg",
            "/uploads/pantalon05.jpg"
        ];


        // En vez de chequear si hay o no y frenar, hacemos:
        console.log("Limpiando productos existentes...");
        // Apagamos el chequeo de foreign keys
        await connection.query("SET FOREIGN_KEY_CHECKS = 0");

        // Vaciamos las tablas
        await connection.query("TRUNCATE TABLE productos");
        await connection.query("TRUNCATE TABLE ventas_productos");
        await connection.query("TRUNCATE TABLE ventas");

        // Volvemos a prender el chequeo de foreign keys
        await connection.query("SET FOREIGN_KEY_CHECKS = 1");

        console.log("Insertando productos por defecto...");
        for (let productos of productosDefecto) {
            let imagenAleatoria = productos.imagenUrl;
            if (productos.categoria === "Remeras") {
                imagenAleatoria = imagenesRemeras[Math.floor(Math.random() * imagenesRemeras.length)];
            } else if (productos.categoria === "Pantalones") {
                imagenAleatoria = imagenesPantalones[Math.floor(Math.random() * imagenesPantalones.length)];
            }
            await connection.query(
                "INSERT INTO productos (nombre, descripcion, precio, imagenUrl, categoria, activo) VALUES (?, ?, ?, ?, ?, ?)", 
                [productos.nombre, productos.descripcion, productos.precio, imagenAleatoria, productos.categoria, productos.activo]
            );
        }
        console.log("Productos semillados con éxito.");



    } catch (error) {
        console.error("❌ Hubo un error al hacer el seed:", error);
    } finally {
        await connection.end();
        console.log("🔌 Conexión cerrada.");
    }
}

seed();