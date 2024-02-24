import { Router } from "express";
import { create, findAll, findOne, deleteOne, update } from "../controller/product.controller.js";

const router = Router();

router.post("/", create);

router.get("/", findAll);

router.get("/product/:id", findOne);

router.delete("/product/:id", deleteOne);

router.put("/product/:id", update);

export default router;
