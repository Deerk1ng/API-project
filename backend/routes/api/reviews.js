const express = require('express')

const { Review, User, Spot, Image, sequelize } = require('../../db/models')
const {requireAuth} = require('../../utils/auth')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const noReview = function () {
    const err = new Error("Couldn't find a Review with the specified id");
    err.status = 404;
    err.message = "Review couldn't be found";
    return err;
}

const userNotAuth = function() {
    const err = new Error("User is not Authorized to edit this review");
    err.status = 401;
    err.message = "Review must belong to the current user";
    return err;
}

router.get('/current', requireAuth, async (req, res) => {
  const { user } = req

  const reviews = await Review.findAll({
    where:{
      userId: user.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
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
          [sequelize.literal(`(SELECT url FROM Images WHERE Images.imageableId = Spot.id AND Images.imageableType = 'SpotImage' AND Images.preview = 1 LIMIT 1)`), 'previewImage']
        ],
        include: [{
          model: Image,
          where: {
            preview: true
          },
          attributes: []
        }]
      },
      {
        model: Image,
        as: 'ReviewImages',
        attributes: ['id', 'url']
      },
    ],
  })

  return res.json({Reviews: reviews})
})

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const {user} = req
  const {url} = req.body
  const review = await Review.findOne({
    where: {
      id: req.params.reviewId,
    },
    include: {model: Image, as: 'ReviewImages'}
  })

  if(!review) next(noReview())
  if(review.userId !== user.id) next(userNotAuth())

  if(review.ReviewImages.length < 10){
    const newImg = await Image.create({
      url,
      preview: false,
      imageableType: 'ReviewImage',
      imageableId: req.params.reviewId
    })
    res.status(201)
    return res.json({id: newImg.id, url: newImg.url})
  } else {
    const err = new Error("Too many Images");
      err.status = 403;
      err.message = "Maximum number of images for this resource was reached";
      return next(err);
  }
})

router.put('/:reviewId', requireAuth, handleValidationErrors, async (req, res, next) => {
    const {user} = req
    const findReview = await Review.findByPk(req.params.reviewId)

    if(!findReview) next(noReview())
    if(findReview.userId !== user.id) next(userNotAuth())

    const {review, stars} = req.body

    await findReview.update({
      review,
      stars
    })

    return res.json(findReview)
})

router.delete('/:reviewId', requireAuth, handleValidationErrors, async (req, res, next) => {
    const {user} = req
    const review = await Review.findByPk(req.params.reviewId)

    if(!review) next(noReview())
    if(review.userId !== user.id) next(userNotAuth())

    await review.destroy()

    return res.json(    {
      "message": "Successfully deleted"
    })
})

module.exports = router;
