// Require mongoose
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

// Define a schema for the product collection
const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: function () { return this._id.toString(); }
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
});

// Create a model from the schema
const Product = mongoose.model('Product', productSchema)

// Export the model
module.exports = Product;