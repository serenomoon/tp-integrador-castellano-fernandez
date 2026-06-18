import express from "express";
import {
    getProductos,
    postVenta
} from "../controllers/apiController.js";

const router = express.Router();

//Ruta de productos
router.get("/productos", getProductos);

//Ruta del ticket
router.post("/ventas", postVenta);

export default router;