const express = require('express')

const { Review } = require('../../db/models')
const {requireAuth} = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const noReview = function () {
    const err = new Error("Couldn't find a Spot with the specified id");
    err.status = 404;
    err.message = "Spot couldn't be found";
    return err;
  }
const userNotAuth = function() {
    const err = new Error("User is not Authorized to edit this spot");
    err.status = 401;
    err.message = "Spot does not belong to user";
    return err;
}

router.get('/', async (req, res) => {

})


module.exports = router;
