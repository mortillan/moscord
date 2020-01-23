const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    company: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
    collection: 'sellers'
});

module.exports.SellerSchema = SellerSchema;
module.exports.Seller = new mongoose.model('Seller', SellerSchema);