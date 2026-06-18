import connection from "../database/db.js";

//funcion de nuestra API-Cliente que le va a devolver todos los productos al cliente
export const getProductos = async (req, res) => {
    try{
        const activo = true;
        const [rows] = await connection.query("SELECT * FROM productos WHERE activo = ?", [activo]);
        
        //Este quilombo es gracias a Saulo que se cagó en el español que manejamos en la DB
        const productosMapeados = rows.map(prod => {
            return {
                id: prod.id,
                name: prod.nombre,
                price: parseFloat(prod.precio),
                // Si la imagen ya tiene http no le agregamos nada, sino le ponemos el host del backend
                image: prod.imagenUrl.startsWith('http') ? prod.imagenUrl : `http://localhost:3000${prod.imagenUrl}`,
                type: prod.categoria === 'Pantalones' ? 'oferta' : 'normal'
            };
        });
        return res.json(productosMapeados);
        
    }catch(error){
        res.status(500).json({error: error.message})
        console.log(error)
    }
}

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
        res.status(500).json({error: error.message});
        console.log(error);
    }finally{
        conn.release()//devuelve la conexion exclusiva del pool del conexiones de la DB
    }
}