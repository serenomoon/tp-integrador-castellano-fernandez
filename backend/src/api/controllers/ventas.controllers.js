import ventaModels from "../models/ventaModels.js";

//funcion de nuestra API-Cliente en donde vamos a registrar una venta exitosa
export const postVenta = async (req, res) => {
    const { cliente, total, items } = req.body;

    try {
        await ventaModels.registrarVenta({ cliente, total, items });

        return res.status(201).json({
            status: "success",
            message: "¡Venta registrada con éxito!"
        });

    } catch (error) {
        console.error("Error al registrar venta:", error);
        res.status(500).json({ error: error.message });
    }
}
