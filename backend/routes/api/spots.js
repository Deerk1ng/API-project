const express = require('express')

const { Spot, Review, Image, User, sequelize } = require('../../db/models')
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
    err.message = "Spot does not belong to user";
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
    //need to add preview image and avgRating aggregate data instead of hard coded
    // if(!user){
    //     const err = new Error('User not logged in');
    //     err.status = 401;
    //     err.message = 'User not logged in';
    //     return next(err);
    // }
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
        group: ['Spot.id']
    })}

    return res.json(spots)
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
        }) //does not handle errors well

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

    spot.destroy()

    return res.json(    {
        "message": "Successfully deleted"
      })
})

module.exports = router;

//
