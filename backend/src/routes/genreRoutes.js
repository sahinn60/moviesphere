const router = require('express').Router();
const ctrl = require('../controllers/genreController');
const { publicLimiter } = require('../middleware/rateLimiter');

router.use(publicLimiter);

router.get('/', ctrl.getGenres);
router.get('/:slug', ctrl.getGenreBySlug);
router.get('/:slug/movies', ctrl.getMoviesByGenre);

module.exports = router;
