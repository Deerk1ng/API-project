const express = require('express')

const { Booking, Spot, sequelize } = require('../../db/models')
const {requireAuth} = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const router = express.Router();
const {environment} = require('../../config')

const noBooking = function () {
    const err = new Error("Couldn't find a Booking with the specified id");
    err.status = 404;
    err.message = "Booking couldn't be found";
    return err;
}

const userNotAuth = function() {
    const err = new Error("User is not Authorized to edit this booking");
    err.status = 401;
    err.message = "Booking must belong to the current user";
    return err;
}

router.get('/current', requireAuth, async (req,res,next) => {
    const {user} = req

    let sqlLit = `(SELECT url FROM Images WHERE Images.imageableId = Spot.id AND Images.imageableType = 'SpotImage' AND Images.preview = 1 LIMIT 1)`
    if(environment === 'production') {
      sqlLit = `(SELECT url FROM Images WHERE ${process.env.SCHEMA}.Images.imageableId = Spot.id AND ${process.env.SCHEMA}.Images.imageableType = 'SpotImage' AND ${process.env.SCHEMA}.Images.preview = 1 LIMIT 1)`
    }

    const bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: {
            model: Spot,
            attributes: [
                'id',
                'ownerId',
                'address',
                'city',
                'state',
                'country',
                'lat',
                'lng',
                'name',
                'price',
                [sequelize.literal(sqlLit), 'previewImage']
              ],
        },
        attributes: {
            include: ['id']
        }
    })
    return res.json({Bookings: bookings})
})

router.put('/:bookingId', requireAuth, handleValidationErrors, async (req,res,next) => {
    return res.json()
})

router.delete('/:bookingId', requireAuth, async (req,res,next) => {
    return res.json()
})

module.exports = router;
