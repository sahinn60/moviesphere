const router = require('express').Router();
const ctrl = require('../controllers/movieController');
const { publicLimiter } = require('../middleware/rateLimiter');

router.use(publicLimiter);

router.get('/', ctrl.getMovies);
router.get('/trending', ctrl.getTrendingMovies);
router.get('/popular', ctrl.getPopularMovies);
router.get('/featured', ctrl.getFeaturedMovies);
router.get('/slug/:slug', ctrl.getMovieBySlug);
router.get('/:id', ctrl.getMovieById);
router.get('/:id/cast', ctrl.getMovieCast);
router.get('/:id/recommendations', ctrl.getMovieRecommendationsCtrl);

module.exports = router;
