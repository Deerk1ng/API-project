const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  // check('password')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 6 })
  //   .withMessage('Password is required.'),
    check('firstName')
     .exists({checkFalsy: true})
     .isLength({min:1})
     .withMessage("First Name is required"),
     check('lastName')
     .exists({checkFalsy: true})
     .isLength({min:1})
     .withMessage("Last Name is required"),
  handleValidationErrors
];

router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);

    const userExistsEmail = await User.findOne({where: {email: email}})
    const userExistsUsername = await User.findOne({where: {username: username}})

    if(userExistsEmail || userExistsUsername){
      const err = new Error("User already exists");
      err.status = 500;
      err.message = "User already exists";
      err.errors = {}
      if(userExistsEmail){
        err.errors.email = "User with that email already exists"
      }
      if(userExistsUsername){
        err.errors.username = "User with that username already exists"
      }
      return next(err);
    }

    const user = await User.create({ email, username, hashedPassword, firstName, lastName });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };

    await setTokenCookie(res, safeUser);
    res.status(201)
    return res.json({
      user: safeUser
    });
  }
);

module.exports = router;
