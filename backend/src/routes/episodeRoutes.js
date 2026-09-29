const router = require('express').Router();
const ctrl = require('../controllers/episodeController');
const { publicLimiter } = require('../middleware/rateLimiter');

router.use(publicLimiter);

router.get('/seasons/:seasonId/episodes', ctrl.getEpisodesBySeasonId);
router.get('/episodes/:id', ctrl.getEpisodeById);

module.exports = router;
