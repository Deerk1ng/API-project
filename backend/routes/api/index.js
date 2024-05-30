const router = require('express').Router();

// backend/routes/api/index.js
// ...

router.post('/test', function(req, res) {
    return res.json({ requestBody: req.body });
  });


module.exports = router;
