import dotenv from "dotenv";

//dotenv es la herramienta que puede leer el archivo .env
dotenv.config();

/*
convertimos en objeto JS todos los datos del .env
*/
export default {
    port: process.env.PORT || 3000,
    sessionSecret: process.env.SESSION_SECRET || "clave_por_defecto_desarrollo",

    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        
    }
};