 import mongoose from "mongoose";
 import Product from "../models/product.model.js";
 export const getProducts = async (req, res) => {
     try {
         const products = await Product.find({});
         res.status(200).json({ success: true, data: products });
     } catch (error) {
         console.log("error in fetching products:", error.message);
         res.status(500).json({ success: false, message: "server Error" });
     }
 };
export const createProduct = async (req, res) => {
    const { name, price, image } = req.body; 

    if (!name || !price || !image) {
        return res.status(400).json({
            success: false,
            message: "Please Provide all fields"
        });
    }

    try {
        const newProduct = new Product({ name, price, image });
        await newProduct.save();

        res.status(201).json({
            success: true,
            data: newProduct
        });

    } catch (error) {
        console.error("Error in create product:", error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
export const updateProduct =  async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product Id"
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
 export const deleteproduct = async (req, res) => {
     const { id } = req.params;
 
     try {
         await Product.findByIdAndDelete(id);
         res.status(200).json({ success: true, message: "product deleted" });
     } catch (error) {
         res.status(500).json({ success: false, message: "Server Error" });
     }
 };