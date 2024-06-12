const express = require('express')

const { Booking } = require('../../db/models')
const {requireAuth} = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

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
    return res.json()
})

router.put('/:bookingId', requireAuth, handleValidationErrors, async (req,res,next) => {
    return res.json()
})

router.delete('/:bookingId', requireAuth, async (req,res,next) => {
    return res.json()
})

module.exports = router;
