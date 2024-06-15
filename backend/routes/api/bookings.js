const express = require('express')

const { Booking, Spot, sequelize } = require('../../db/models')
const {requireAuth} = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');

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
    const {user} = req
    const booking = await Booking.findByPk(req.params.bookingId)

    if(!booking){
        return next(noBooking())
    }
    if(booking.userId !== user.id){
        return next(userNotAuth())
    }

    const {startDate, endDate} = req.body

    const allBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        },
        attributes: ['startDate', 'endDate']
    })

    let start = end = 0
    const isBooked = allBookings.filter(el => {
        if(!((startDate > el.endDate.split(" ")[0]) || (endDate < el.startDate.split(" ")[0]))){
        if(startDate >= el.startDate.split(" ")[0] && startDate <= el.endDate.split(" ")[0]){
            start++
        }
        if(endDate >= el.startDate.split(" ")[0] && endDate <= el.endDate.split(" ")[0]){
            end++
        }
        if(startDate < el.startDate.split(" ")[0] && endDate > el.endDate.split(" ")[0]){
            start++
            end++
        }
        return true
    }
    return false
})

    if(!isBooked.length){
        await booking.update({
                startDate,
                endDate
            })
        return res.json(booking)
    } else {
        // if(start || end){
            const err = new Error("Booking conflict");
            err.status = 403;
            err.message = "Sorry, this spot is already booked for the specified dates";
            err.errors = {}
            if(start){
              err.errors.startDate = "Start date conflicts with an existing booking"
            }
            if(end){
              err.errors.endDate = "End date conflicts with an existing booking"
            }
            return next(err);
        }

})

router.delete('/:bookingId', requireAuth, async (req,res,next) => {
    const {user} = req
    const booking = await Booking.findByPk(req.params.bookingId)

    if(!booking){
        return next(noBooking())
    }
    const spot = await Spot.findByPk(booking.spotId)
    if(booking.userId !== user.id && user.id !== spot.ownerId){
        const err = new Error("User is not Authorized to edit this booking");
        err.status = 401;
        err.message = "Booking must belong to the current user or the Spot must belong to the current user";
        return next(err)
    }
    if(booking.startDate < new Date()){
        const err = new Error("Booking has already begun");
        err.status = 403;
        err.message = "Bookings that have been started can't be deleted";
        return err;
    }
    await booking.destroy()

    return res.json(    {
        "message": "Successfully deleted"
      })
})

module.exports = router;
