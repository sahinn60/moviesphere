const router = require('express').Router();
const ctrl = require('../controllers/seriesController');
const { publicLimiter } = require('../middleware/rateLimiter');

router.use(publicLimiter);

router.get('/', ctrl.getSeries);
router.get('/trending', ctrl.getTrendingSeries);
router.get('/popular', ctrl.getPopularSeries);
router.get('/slug/:slug', ctrl.getSeriesBySlug);
router.get('/:id', ctrl.getSeriesById);
router.get('/:id/seasons', ctrl.getSeriesSeasons);
router.get('/:id/recommendations', ctrl.getSeriesRecommendationsCtrl);

module.exports = router;
