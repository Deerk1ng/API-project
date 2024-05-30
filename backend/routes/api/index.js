const router = require('express').Router();
const { restoreUser, setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.use(restoreUser);

// backend/routes/api/index.js
// ...

router.post('/test', function(req, res) {
    return res.json({ requestBody: req.body });
  });



module.exports = router;
