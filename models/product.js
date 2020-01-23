const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    seller: {
        type: mongoose.ObjectId,
        ref: 'Seller'
    }
}, {
    timestamps: true,
    collection: 'products'
});

module.exports.ProductSchema = ProductSchema;
module.exports.Product = new mongoose.model('Product', ProductSchema);