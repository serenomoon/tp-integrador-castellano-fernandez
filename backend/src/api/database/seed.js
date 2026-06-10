import connection from "./db.js";
import bcrypt from "bcrypt";

async function seed(){
    try {
        console.log("Iniciando semillado de base de datos...");
        
        const passwordHash = await bcrypt.hash("castellanosaulo", 10);

        /*
        - .query: es el método de mysql2 para enviar una setencia SQL a la base de datos, este acepta dos parámetros: (SQL, [valores])
        */
        await connection.query(
            "INSERT INTO usuarios (correo, contrasena) VALUES (?, ?)",
            ["admin@autoservicio.com", passwordHash]
        );
        console.log("Usuario admin creado con exito");
        
    } catch (error) {
        console.error("Hubo un error al hacer el seed:", error);
    } finally {
        // Cerramos el pool para que el proceso de Node termine
        await connection.end();
        console.log("Conexión cerrada.");
    }
}

seed();