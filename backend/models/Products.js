const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
    productDetails: { type: String, required: true },
});

const ProductsModel = mongoose.model("Products", ProductsSchema);
module.exports = ProductsModel;