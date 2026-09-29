const router = require('express').Router();
const ctrl = require('../controllers/castController');
const { publicLimiter } = require('../middleware/rateLimiter');

router.use(publicLimiter);

router.get('/', ctrl.getAllCast);
router.get('/:id', ctrl.getCastById);

module.exports = router;
