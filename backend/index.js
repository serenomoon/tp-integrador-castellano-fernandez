import express from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";


const app = express(); // guardamos el objeto express
const PORT = environments.port; //guardamos el puerto desde environments

/* 
Le dice a Express que cada vez que usemos el método res.render("archivo"), busque un archivo con extensión .ejs dentro de la carpeta por defecto, que es /views. */
app.set("view engine", "ejs"); 

 //esto permite a express utilizar cors para poder intercomunicar puertos, o el frontend con el backend, es un middleware de seguridad
app.use(cors());

 //parsea a JSON la respuesta obtenida desde el FRONT y te lo convierte a objeto JS, luego lo vamos a utilizar con req.body.KEY
app.use(express.json());

/*
creamos un middleware para leer los archivos de la carpeta public(css, imagenes, etc)
*/
app.use(express.static("public"));

/*
- el servidor escucha peticiones (GET) cuando se escribe la URL en el navegador.
- "/" es la raiz del servidor
- res.send: mandamos un mensaje al navegador desde el servidor
*/
app.get("/", (req,res) => {
    res.send("Servidor de Autoservicio corriendo de diez")
});

/*
- Ahora el servidor escucha el GET para /test-db
- funcion async: para esperar a que la base de datos responda
- try/catch: para evitar calquier error de la base de datos y que no se caiga el servidor
- await: obligatorio al usar async
- connection.query: devuelve un array con 2 posiciones(conection viene del import de nuestro db.js, .query del import de mysql2)
- [rows]: destructuramos el array, nos quedamos con el resultado de la consulta sql en la posicion 0 del array, el otro lo descartamos (son metadados de la consulta/tabla) 

*/
app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT 1 + 1 AS result");
        res.json({
            status: "success",
            message: "¡Conexión a MariaDB exitosa!",
            result: rows[0].result
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error de conexión a la base de datos",
            error: error.message
        });
    }
});

/*
- endpoint para cargar en formato HTML el login de usuario
- sabe que tiene que ir a buscarlo a /views por el app.set que hicimos al principio de este archivo
*/
app.get("/admin/login", (req, res) => {
    res.render("login");
});


/*
.listen: metodo de express que abre el puerto especificado en el servidor, y escucha cualquier conexion de red entrante
*/
app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);   
});

