const express = require('express')

const { Spot, Review, Image, User, sequelize, Booking } = require('../../db/models')
const { Op } = require('sequelize')
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


router.get('/', async (req, res, next) => {
    let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query

    let offset = limit = null
    const where = {}

    if(page || size || minLat || maxLat || minLng || maxLng || minPrice || maxPrice){
        const err = new Error("Query Body Validation Error")
        err.status = 400
        err.message = "Bad Request"
        err.errors = {}
        if(size){
            if(!isNaN(size) && size > 0){
                size = Number(size)
                if (size > 20) size = 20
                limit = size
            } else err.errors.size = "Size must be greater than or equal to 1"
        }

        if(page){
            if(!isNaN(page) && page > 0){
                page = Number(page)
                offset = (page - 1) * size
            } else err.errors.page =  "Page must be greater than or equal to 1"
        }

        if(minLat){
            if(!isNaN(minLat) && (minLat < 90 || minLat > -90)){
                where.lat = {[Op.gte]: minLat}
            } else err.errors.minLat = "Minimum latitude is invalid"
        }

        if(maxLat){
            if(!isNaN(maxLat) && (maxLat < 90 || maxLat > -90)){
                if(where.lat) where.lat = {[Op.between]: [minLat, maxLat]}
                else where.lat = {[Op.lte]: maxLat}
            } else err.errors.maxLat = "Maximum latitude is invalid"
        }

        if(minLng){
            if(!isNaN(minLng) && (minLng < 180 || minLng > -180)){
                where.lng = {[Op.gte]: minLng}
            } else err.errors.minLng = "Minimum longitude is invalid"
        }

        if(maxLng){
            if(!isNaN(maxLng) && (maxLng < 180 || maxLng > -180)){
                if(where.lng) where.lng = {[Op.between]: [minLng, maxLng]}
                else where.lng = {[Op.lte]: maxLng}
            } else err.errors.maxLng = "Maximum longitude is invalid"
        }

        if(maxPrice){
            if(!isNaN(maxPrice) && maxPrice > 0){
                where.price = {[Op.lte]: maxPrice}
            } else err.errors.maxPrice = "Maximum price must be greater than or equal to 0"
        }

        if(minPrice){
            if(!isNaN(minPrice) && minPrice > 0){
                if(where.price) where.price = {[Op.between]: [minPrice, maxPrice]}
                else where.price = {[Op.gte]: minPrice}
            } else err.errors.minPrice = "Minimum price must be greater than or equal to 0"
        }
        const keys = Object.keys(err.errors)
        if(keys.length){
            return next(err);
        }
    }


    const spots = await Spot.findAll({
        where,
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
        limit,
        offset,
        subQuery: false,
        group: ['Spot.id', 'Images.url'], // splits AVG function and keeps it from averaging all reviews
})

    return res.json({Spots: spots, page, size})
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

    let attr1 = []
    let attr2 = []
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
        return next(err);
    }

    const {startDate, endDate} = req.body
    const allBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
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
        let newBooking = await Booking.create({
            spotId: req.params.spotId,
            userId: user.id,
            startDate,
            endDate
        })
        console.log(newBooking.toJSON())
        res.status(201)
        return res.json(newBooking.toJSON())
    } else {
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
