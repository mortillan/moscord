const express = require('express');
const router = express.Router();
const { Seller } = require('../models/seller')

/**
 * List sellers
 */
router.get('/', async function (req, res) {
  const { p = 1, f = 10, s = '' } = req.query

  const limit = f < 1 ? 10 : parseInt(f)
  const offset = p < 0 ? 0 : parseInt(p) * limit

  let predicate = {}
  if (s && s !== '') {
      const search = {
          $regex: '.*' + s + '.*'
      }
      predicate['name'] = search
      predicate['company'] = search
  }
  
  const sellers = await Seller.find(predicate).skip(offset).limit(limit).sort({ _id: -1 })
  const totalCount = await Seller.countDocuments({})

  return res.json({
    data: sellers,
    meta: {
      totalCount
    }
  })
});

/**
 * Create new seller
 */
router.post('/', async function (req, res) {
  const {
    name,
    company,
  } = req.body

  const seller = await Seller.create({
    name,
    company,
  })

  return res.json({
    data: seller
  })
});

/**
 * Update seller
 */
router.put('/:id', async function (req, res) {
  const { id } = req.params
  const { name, company } = req.body

  const seller = await Seller.findByIdAndUpdate(id, {
    name,
    company
  }, {
    new: true
  })

  return res.json({
    data: seller
  })
});

/**
 * Delete seller
 */
router.delete('/:id', async function (req, res) {
  const { id } = req.params

  await Seller.findByIdAndRemove(id)

  return res.json({
    data: true
  })
});

module.exports = router;
