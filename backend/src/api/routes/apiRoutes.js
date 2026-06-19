import express from "express";
import { upload } from "../middlewares/upload.js";

import {
    getProductos,
    postVenta,
    postEncuesta
} from "../controllers/apiController.js";

const router = express.Router();

//Ruta de productos
router.get("/productos", getProductos);

//Ruta del ticket
router.post("/ventas", postVenta);

//Ruta de la encuesta
router.post("/encuestas", upload.single("archivo"), postEncuesta);

export default router;