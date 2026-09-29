const router = require('express').Router();
const ctrl = require('../controllers/bannerController');
const { publicLimiter } = require('../middleware/rateLimiter');

router.use(publicLimiter);
router.get('/', ctrl.getBanners);

module.exports = router;
