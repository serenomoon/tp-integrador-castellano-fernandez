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
        const productosInsertados = [];
        for (let productos of productosDefecto) {
            let imagenAleatoria = productos.imagenUrl;
            if (productos.categoria === "Remeras") {
                imagenAleatoria = imagenesRemeras[Math.floor(Math.random() * imagenesRemeras.length)];
            } else if (productos.categoria === "Pantalones") {
                imagenAleatoria = imagenesPantalones[Math.floor(Math.random() * imagenesPantalones.length)];
            }
            const [result] = await connection.query(
                "INSERT INTO productos (nombre, descripcion, precio, imagenUrl, categoria, activo) VALUES (?, ?, ?, ?, ?, ?)", 
                [productos.nombre, productos.descripcion, productos.precio, imagenAleatoria, productos.categoria, productos.activo]
            );
            
            // Guardamos el ID insertado y el precio para usarlo en las ventas
            productosInsertados.push({
                id: result.insertId,
                nombre: productos.nombre,
                precio: parseFloat(productos.precio)
            });
        }
        console.log(`Productos semillados con éxito (${productosInsertados.length} productos).`);

        // 3. Generar 20 Ventas de Prueba
        console.log("Generando 20 ventas de prueba...");
        const nombresClientes = ["Axel Castellano", "Saulo Fernández", "María Becerra", "Lionel Messi", "Diego Maradona", "Emiliano Martínez", "Rodrigo De Paul", "Julián Álvarez", "Lautaro Martínez", "Ángel Di María", "Clara Benítez", "Lucas Gómez", "Sofía Rodríguez", "Mateo Díaz", "Valentina Paz", "Bautista Silva", "Catalina Herrera", "Tomás Peralta", "Camila Ruiz", "Facundo Castro"];
        
        for (let i = 0; i < 20; i++) {
            // Nombre de cliente aleatorio
            const nombreCliente = nombresClientes[i % nombresClientes.length];
            
            // Fecha aleatoria en los últimos 30 días
            const diasAtras = Math.floor(Math.random() * 30);
            const fechaVenta = new Date();
            fechaVenta.setDate(fechaVenta.getDate() - diasAtras);
            
            // Insertar la venta vacía con total provisorio en 0
            const [ventaResult] = await connection.query(
                "INSERT INTO ventas (nombreCliente, fecha, precioTotal) VALUES (?, ?, 0)",
                [nombreCliente, fechaVenta]
            );
            const ventaId = ventaResult.insertId;

            // Determinar cuántos productos distintos tendrá esta venta (entre 1 y 4)
            const cantProductosDistintos = Math.floor(Math.random() * 4) + 1;
            let precioTotalVenta = 0;

            // Barajar productos para elegir algunos sin repetir en la misma venta
            const productosBarajados = [...productosInsertados].sort(() => 0.5 - Math.random());
            const productosElegidos = productosBarajados.slice(0, cantProductosDistintos);

            for (let prod of productosElegidos) {
                const cantidad = Math.floor(Math.random() * 3) + 1; // cantidad entre 1 y 3
                const precioUnitario = prod.precio;
                
                await connection.query(
                    "INSERT INTO ventas_productos (venta_id, producto_id, cantidad, precioUnitario) VALUES (?, ?, ?, ?)",
                    [ventaId, prod.id, cantidad, precioUnitario]
                );

                precioTotalVenta += cantidad * precioUnitario;
            }

            // Actualizar la venta con su precio total real
            await connection.query(
                "UPDATE ventas SET precioTotal = ? WHERE id = ?",
                [precioTotalVenta, ventaId]
            );
        }
        console.log("✅ 20 ventas y detalles de venta inyectados con éxito.");



    } catch (error) {
        console.error("❌ Hubo un error al hacer el seed:", error);
    } finally {
        await connection.end();
        console.log("🔌 Conexión cerrada.");
    }
}

seed();