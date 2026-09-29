const router = require('express').Router();
const { watchMovie, watchEpisode } = require('../controllers/watchController');
const { publicLimiter } = require('../middleware/rateLimiter');

router.use(publicLimiter);

router.post('/movie/:id', watchMovie);
router.post('/episode/:id', watchEpisode);

module.exports = router;
