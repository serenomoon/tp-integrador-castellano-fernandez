import connection from "../database/db.js";

//funcion de nuestra API-Cliente en donde vamos a registrar una venta exitosa
export const postVenta = async (req, res) => {
    const conn = await connection.getConnection();//reserva una conexion exclusiva del pool de conexiones que creamos.

    try{
        await conn.beginTransaction();//esta es una "transaccion", todo lo que insertemos en la base de datos va a ser TEMPORAL hasta que indiquemos que haga efectivo el insert (evitamos guardar una venta por la mitad)
        const {cliente, total, items} = req.body;

        const [result] = await conn.query(
            "INSERT INTO ventas (nombreCliente, precioTotal) VALUES (?, ?)", [cliente, total]
        )//insertamos la venta, y nos devuelve el ID del insert que acabamos de hacer en la DB de ventas

        const ventaId = result.insertId;

        for(const item of items){
            await conn.query(
                "INSERT INTO ventas_productos (venta_id, producto_id, cantidad, precioUnitario) VALUES (?, ?, ?, ?)", [ventaId, item.id, item.cantidad, item.precio_unitario]
            )
        }//no podemos usar forEach, porque es SINCRONO, entonces nos traba el flujo del programa. Registramos cada uno de los productos que compró el cliente

        await conn.commit(); //si la función llegó hasta acá sin errores, se hacen efectivos los inserts en la DB

        return res.status(201).json({
            status: "success",
            message: "¡Venta registrada con éxito!"
        });

    }catch(error){
        await conn.rollback(); //esto vuelve para atrás todos los insert "temporales" del bloque try, si es que tuvimos algún error con la conexión
        console.error("Error al registrar venta:", error);
        res.status(500).json({error: error.message});
    }finally{
        conn.release()//devuelve la conexion exclusiva del pool del conexiones de la DB
    }
}


