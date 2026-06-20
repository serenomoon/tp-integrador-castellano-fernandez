import productModels from "../models/producto.models.js";

//funcion de nuestra API-Cliente que le va a devolver todos los productos al cliente
export const getProductos = async (req, res) => {
    try{
        const rows = await productModels.getProductosActivos();
        
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
        return res.json({
            payload: productosMapeados,
            total: productosMapeados.length
        });
        
    }catch(error){
        console.error("Error obteniendo productos:", error);
        res.status(500).json({error: error.message});
    }
}


export const getProdDescripcion = async (req, res) => {
    const id = req.id;
    
    try{
        const rows = await productModels.getProductosId(id);

        if(rows.length === 0){
            return res.status(404).json({error: "No existe el producto"});
        }

        const prod = rows[0];

        const productoMapeado = {
            id: prod.id,
            name: prod.nombre,
            description: prod.descripcion,
            price: parseFloat(prod.precio),
            image: prod.imagenUrl.startsWith('http') ? prod.imagenUrl : `http://localhost:3000${prod.imagenUrl}`,
            category: prod.categoria
        };

        return res.json({payload: productoMapeado});

    }catch(error){
        console.error(error);
        res.status(500).json({ error: error.message })
    }

};
