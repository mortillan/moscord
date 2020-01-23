const express = require('express');
const router = express.Router();
const { Product } = require('../models/product')

/**
 * List products
 */
router.get('/', async function (req, res) {
    const { p = 1, f = 10, s = '' } = req.query

    const limit = f < 1 ? 10 : parseInt(f)
    const offset = p < 1 ? 1 : (parseInt(p) - 1) * limit
    
    let predicate = {}
    if (s && s !== '') {
        const search = {
            $regex: '.*' + s + '.*'
        }
        predicate['name'] = search
        predicate['description'] = search
    }

    const products = await Product.find(predicate).populate('seller').skip(offset).limit(limit).sort({ _id: -1 })
    const totalCount = await Product.countDocument({})

    return res.json({
        data: products,
        meta: {
            totalCount
        }
    })
});

/**
 * Create new product
 */
router.post('/', async function (req, res) {
    const {
        name,
        description,
        seller,
    } = req.body

    const product = await Product.create({
        name,
        description,
        seller
    })

    return res.json({
        data: product
    })
});

/**
 * Update product
 */
router.put('/:id', async function (req, res) {
    const { id } = req.params
    const { name, description, seller } = req.body

    const product = await Product.findByIdAndUpdate(id, {
        name,
        description,
        seller,
    }, {
        new: true
    })

    return res.json({
        data: product
    })
});

/**
 * Delete product
 */
router.delete('/:id', async function (req, res) {
    const { id } = req.params

    await Product.findByIdAndRemove(id)

    return res.json({
        data: true
    })
});

module.exports = router;
