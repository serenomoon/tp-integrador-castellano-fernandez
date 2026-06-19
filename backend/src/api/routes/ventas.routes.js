import express from "express";
import { upload } from "../middlewares/upload.js";

import { postVenta } from "../controllers/ventas.controllers.js";

const router = express.Router();

router.post("/", postVenta);

export default router;