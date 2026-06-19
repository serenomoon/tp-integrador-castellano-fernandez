import connection from "../database/db.js";

//funcion API-Cliente para insertar en la DB la encuesta
export const postEncuesta = async (req, res) => {
    const { email, puntuacion, recomienda, opinion } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email || !emailRegex.test(email)){
        return res.status(400).json({error: "Ingrese un email válido"})
    }//validamos el mail
    
    const nota = parseInt(puntuacion);
    if(isNaN(nota) || nota < 1 || nota > 10){
        return res.status(400).json({error: "Ingrese una puntuación entre 1 y 10"})
    }//validamos la puntuacion dentro de los rangos

    try{
        const recomiendaNum = recomienda === "1" ? 1: 0;//convertimos la puntuacion a int
        const archivoUrl = req.file ? `/uploads/${req.file.filename}` : null;//verificamos si subió un archivo o no

        const response = await connection.query("INSERT INTO encuestas (cliente_email, opinion, recomienda, puntuacion, archivoUrl) VALUES (?, ?, ?, ?, ?)", [email, opinion, recomiendaNum, nota, archivoUrl]);

        return res.status(201).json({
            status: "success",
            message: "¡Muchas gracias por completar la encuesta!"
        });

    }catch(error){
        console.error("Error al guardar encuesta:", error);
        res.status(500).json({error: error.message});
    }
}