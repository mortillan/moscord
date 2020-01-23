const express = require('express');
const router = express.Router();
const { Cart } = require('../models/cart')

/**
 * My cart
 */
router.get('/:userId', async function (req, res) {
    const { userId } = req.params

    const cart = await Cart.findOne({
        userId
    })

    return res.json({
        data: cart
    })
});

/**
 * Create/Update users cart
 */
router.post('/', async function (req, res) {
    const {
        products = [],
        userId,
        isCheckedOut = false,
    } = req.body

    const cart = await Cart.findOneAndUpdate({
        userId: userId,
        isCheckedOut: false,
    }, {
        items: products.map(prod => ({ item: prod.productId, quantity: prod.quantity })),
        isCheckedOut: isCheckedOut,
        userId: userId,
    }, {
        new: true,
        upsert: true,
    })

    return res.json({
        data: cart
    })
});

/**
 * Delete product
 */
router.delete('/:userId', async function (req, res) {
    const { userId } = req.params

    await Cart.findOneAndRemove({
        userId: userId,
        isCheckedOut: false
    })

    return res.json({
        data: true
    })
});

module.exports = router;
