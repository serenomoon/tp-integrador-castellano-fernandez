import mysql2 from "mysql2/promise";
import environments from "../config/environments.js";

const {database} = environments;

/*
- Creamos un "pool" de conexiones ya que un único enlace físico con la base de datos solo puede procesar una consulta a la vez. El pool nos permite mantener múltiples conexiones abiertas simultáneamente. Así, cuando varios usuarios hacen peticiones concurrentes, cada una se procesa en una conexión independiente de forma paralela, optimizando la respuesta del servidor.
*/
const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default connection;