const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const reviewsRouter = require('./reviews.js')
const bookingsRouter = require('./bookings.js')
const { restoreUser, setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User, Image, Spot, Review } = require('../../db/models');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);


const userNotAuth = function() {
  const err = new Error("User is not Authorized to edit this spot");
  err.status = 401;
  err.message = "Spot must belong to the current user";
  return next(err);
}


router.delete('/spot-images/:imageId', requireAuth, async (req, res, next) => {
  const { user } = req
  const image = await Image.findOne({
    where: {
      id: req.params.imageId,
      imageableType: 'SpotImage'
    },
    include: {
      model: Spot,
      attributes: ['ownerId']
    }
  })
  if(!image){
    const err = new Error("Couldn't find a Spot with the specified id");
    err.status = 404;
    err.message = "Spot Image couldn't be found";
    return next(err);
  }

  if(user.id !== image.Spot.ownerId){
    const err = new Error("User is not Authorized to edit this spot");
    err.status = 401;
    err.message = "Spot must belong to the current user";
    return next(err);
  }

  await image.destroy()

  return res.json(    {
    "message": "Successfully deleted"
  })
})


router.delete('/review-images/:imageId', requireAuth, async (req, res, next) => {
  const { user } = req
  const image = await Image.findOne({
    where: {
      id: req.params.imageId,
      imageableType: 'ReviewImage'
    },
    include: {
      model: Review,
      attributes: ['userId']
    }
  })
  if(!image){
    const err = new Error("Couldn't find a Spot with the specified id");
    err.status = 404;
    err.message = "Review Image couldn't be found";
    return next(err);
  }

  if(user.id !== image.Review.userId){
    const err = new Error("User is not Authorized to edit this spot");
    err.status = 401;
    err.message = "Review must belong to the current user";
    return next(err);
  } else {
    await image.destroy()

    return res.json(    {
      "message": "Successfully deleted"
    })
  }
})


router.post('/test', function(req, res) {
    return res.json({ requestBody: req.body });
  });



module.exports = router;
