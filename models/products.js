import mongoose from 'mongoose';

// Define the schema for products
const productsSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String
});

// Create a model for products
const Products = mongoose.model('Products', productsSchema);

export default Products;
