import express from "express";
import { upload } from "../middlewares/upload.js";

import { postEncuesta } from "../controllers/encuestas.controllers.js";

const router = express.Router();

router.post("/", upload.single("archivo"), postEncuesta);

export default router;