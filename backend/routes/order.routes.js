import { Router } from "express";

import { create, findAll, findOne, update, deleteOrder } from "../controller/order.controller.js";

const router = Router();

router.post("/order", create);
router.get("/orders", findAll);
router.get("/order/:id", findOne);
router.put("/order/:id", update);
router.delete("/order/:id", deleteOrder);

export default router;
