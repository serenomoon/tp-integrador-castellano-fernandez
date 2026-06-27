import connection from "../database/db.js";

export const registrarLog = async (usuarioId) => {
    const sql = "INSERT INTO logs_auditoria (usuario_id) VALUES (?)";

    const [rows] = await connection.query(sql, [usuarioId])

    return rows;
}

export const obtenerLogs = async () => {
    const sql = "SELECT logs_auditoria.id, fecha_hora, nombre AS usuario_nombre, correo AS usuario_correo FROM logs_auditoria INNER JOIN usuarios ON logs_auditoria.usuario_id = usuarios.id ORDER BY logs_auditoria.fecha_hora DESC";

    const [rows] = await connection.query(sql)

    return rows;
}

export default{
    registrarLog,
    obtenerLogs
}