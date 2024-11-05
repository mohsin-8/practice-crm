const ProductsModel = require("../models/Products");

exports.CreateProduct = async (req, res) => {
    try {
        const { name, price, productImage, productDetails } = req.body;

        const product = new ProductsModel({
            name,
            price,
            productImage,
            productDetails
        });

        await product.save();
        res.status(200).json({ message: "product created successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};