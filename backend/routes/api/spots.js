const express = require('express')

const { Spot, Review, Image, User, sequelize, Booking } = require('../../db/models')
const {requireAuth} = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const noSpot = function () {
    const err = new Error("Couldn't find a Spot with the specified id");
    err.status = 404;
    err.message = "Spot couldn't be found";
    return err;
  }
const userNotAuth = function() {
    const err = new Error("User is not Authorized to edit this spot");
    err.status = 401;
    err.message = "Spot must belong to the current user";
    return err;
}


router.get('/', async (req, res) => {
    const spots = {Spots: await Spot.findAll({
        attributes: { //as an object + includes will show all original keys and also add whatever is under includes
            include: [
                [sequelize.col('url'), 'previewImage'], //finds Image.url and displays under key previewImage
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'] //gets AVG under the name of avgRating
            ],
        },
        include: [
            {
                model: Image,
                attributes: []
            },
            {
                model: Review,
                attributes: []
            }
        ],
        group: ['Spot.id', 'Images.url'] // splits AVG function and keeps it from averaging all reviews
    })}

    return res.json(spots)
})

router.get('/current', requireAuth, async (req, res, next) => {
    const { user } = req

    const spots = {Spots: await Spot.findAll({
        where: {
            ownerId: user.id
        },
        attributes: { //as an object + includes will show all original keys and also add whatever is under includes
            include: [
                [sequelize.col('url'), 'previewImage'], //finds Image.url and displays under key previewImage
                [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'] //gets AVG under the name of avgRating
            ],
        },
        include: [
            {
                model: Image,
                attributes: []
            },
            {
                model: Review,
                attributes: []
            }
        ],
        group: ['Spot.id', 'Images.url']
    })}

    return res.json(spots)
})

router.get('/:spotId/bookings', requireAuth, async (req, res, next)=> {
    const { user } = req
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot) next(noSpot())

    let attr1 = attr2 = null
    if(user.id !== spot.ownerId){
        attr1 = ['spotId','startDate', 'endDate']
    } else {
        attr2 = ['id', 'firstName', 'lastName']
        attr1 = {
            include: ['id']
        }
    }
    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: {
            model: User,
            attributes: attr2
        },
        attributes: attr1
    })
    return res.json({Bookings: bookings})
})

router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        return next(noSpot())
    }
    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    const Images = await Image.findAll({
        where: {
            imageableType: 'SpotImage',
            imageableId: req.params.spotId
        },
        attributes: ['id', 'url', 'preview']
    })

    const owner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    })

    const avgRating = reviews.reduce((acc, el) => acc + el.stars, 0) / reviews.length
    const newSpot = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: reviews.length,
        avgStarRating: avgRating,
        SpotImages: Images,
        Owner: owner
    }

    return res.json(newSpot)
})

router.post('/', requireAuth, async (req, res)=> {
    const {address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req

    const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201)
    return res.json(newSpot)
})

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
    const { user } = req
    const {url, preview} = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return next(noSpot())
    }
    if(spot.ownerId !== user.id){
        return next(userNotAuth());
    }

    const newImg = await Image.create({
        url,
        preview,
        imageableType: 'SpotImage',
        imageableId: req.params.spotId
    })

    const safeImg = {
        id: newImg.id,
        url: newImg.url,
        preview: newImg.preview,
    }
    res.status(201)
    return res.json(safeImg)
})

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const {user} = req
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return next(noSpot())
    }
    if(spot.ownerId == user.id){
        const err = new Error("User cannot book their own spot");
        err.message = "Spot must NOT belong to the current user";
        return err;
    }

    const {startDate, endDate} = req.body
    const allBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['startDate', 'endDate']
    })

    let start = end = 0
    const isBooked = allBookings.filter(el => /* !((startDate > el.endDate) || (endDate < el.startDate))) */
        {
            if(!((startDate > el.endDate) || (startDate < el.startDate && endDate < el.startDate))) {
                start++
                return true
            } else if(!((endDate < el.startDate) || (endDate > el.endDate && startDate > el.endDate))){
                end++
                return true
            } else {
                return false
            }
        })
    if(!isBooked.length){
        const newBooking = await Booking.create({
            spotId: req.params.spotId,
            userId: user.id,
            startDate,
            endDate
        })
        return res.json(newBooking)
    } else {
        if(start || end){
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
    }

})

router.put('/:spotId', requireAuth, handleValidationErrors, async (req, res, next) => {
    const { user } = req
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return next(noSpot())
    }
    if(spot.ownerId !== user.id){
        return next(userNotAuth());
    }

    const {address, city, state, country, lat, lng, name, description, price} = req.body


    await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })

        return res.json(spot)

})

router.delete('/:spotId', requireAuth, async(req, res, next) => {
    const { user } = req
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return next(noSpot())
    }
    if(spot.ownerId !== user.id){
        return next(userNotAuth());
    }

    await spot.destroy()

    return res.json(    {
        "message": "Successfully deleted"
      })
})

router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return next(noSpot())
    }
    const reviews = await Review.findAll({
        where:{
          spotId: req.params.spotId
        },
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          },
          {
            model: Image,
            as: 'ReviewImages',
            attributes: ['id', 'url']
          },
        ]
        })
    return res.json({Reviews: reviews})
})

router.post('/:spotId/reviews', requireAuth, handleValidationErrors, async (req,res, next) => {
    const {user} = req
    const {review, stars} = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return next(noSpot())
    }
    const checkUserReview = await Review.findOne({
        where: {
            userId: user.id,
            spotId: req.params.spotId
        }
    })

    if(checkUserReview){
        console.log("CURRENT USER", user, user.id, checkUserReview)
        const err = new Error("User already reviewed this spot");
        err.status = 500;
        err.message = "User already has a review for this spot";
        return next(err);
    }

    const newReview = await Review.create({
        userId: user.id,
        spotId: req.params.spotId,
        review,
        stars
    })
    res.status(201)
    return res.json(newReview)
})
module.exports = router;

//
