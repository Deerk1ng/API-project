const express = require('express')

const { Spot } = require('../../db/models')

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()

    return res.json(spots)
})

router.get('/current', async (req, res) => {
    const { user } = req

    const spots = await Spot.findAll({

    })

    return res.json(user)
})

module.exports = router;
