const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    items: [{
        item: {
            type: mongoose.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
            required: true,
        },
    }],
    userId: {
        type: String,
        required: true,
    },
    isCheckedOut: {
        type: Boolean,
        required: false,
        default: false,
    }
}, {
    timestamps: true,
    collection: 'carts'
});

module.exports.CartSchema = CartSchema;
module.exports.Cart = new mongoose.model('Cart', CartSchema);