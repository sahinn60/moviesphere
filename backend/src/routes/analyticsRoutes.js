const router = require('express').Router();
const { getAnalytics } = require('../controllers/analyticsController');
const adminAuth = require('../middleware/adminAuth');
const { adminLimiter } = require('../middleware/rateLimiter');

router.use(adminLimiter);
router.get('/', adminAuth, getAnalytics);

module.exports = router;
