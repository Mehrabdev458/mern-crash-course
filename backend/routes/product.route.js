import express from"express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { createProduct, deleteproduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();
/* GET */
router.get("/", getProducts)

/* POST */
router.post("/", createProduct);
// update
router.put("/:id",updateProduct);


/* DELETE */
router.delete("/:id", deleteproduct);
export default router;