const router = require('express').Router();
const adminAuth = require('../middleware/adminAuth');
const { adminLimiter, loginLimiter } = require('../middleware/rateLimiter');
const { validate, movieRules, seriesRules, episodeRules, genreRules, castRules, bannerRules, adminLoginRules, idParam } = require('../middleware/validation');

const adminCtrl = require('../controllers/adminController');
const movieCtrl = require('../controllers/movieController');
const seriesCtrl = require('../controllers/seriesController');
const episodeCtrl = require('../controllers/episodeController');
const genreCtrl = require('../controllers/genreController');
const castCtrl = require('../controllers/castController');
const bannerCtrl = require('../controllers/bannerController');

// Auth
router.post('/login', loginLimiter, adminLoginRules, validate, adminCtrl.login);
router.get('/profile', adminLimiter, adminAuth, adminCtrl.getProfile);
router.post('/create-admin', adminLimiter, adminAuth, adminCtrl.createAdmin);

// Movies
router.post('/movies', adminLimiter, adminAuth, movieRules, validate, movieCtrl.adminCreateMovie);
router.put('/movies/:id', adminLimiter, adminAuth, idParam, validate, movieCtrl.adminUpdateMovie);
router.delete('/movies/:id', adminLimiter, adminAuth, idParam, validate, movieCtrl.adminDeleteMovie);

// Series
router.post('/series', adminLimiter, adminAuth, seriesRules, validate, seriesCtrl.adminCreateSeries);
router.put('/series/:id', adminLimiter, adminAuth, idParam, validate, seriesCtrl.adminUpdateSeries);
router.delete('/series/:id', adminLimiter, adminAuth, idParam, validate, seriesCtrl.adminDeleteSeries);

// Seasons
router.post('/seasons', adminLimiter, adminAuth, episodeCtrl.adminCreateSeason);
router.put('/seasons/:id', adminLimiter, adminAuth, idParam, validate, episodeCtrl.adminUpdateSeason);
router.delete('/seasons/:id', adminLimiter, adminAuth, idParam, validate, episodeCtrl.adminDeleteSeason);

// Episodes
router.post('/episodes', adminLimiter, adminAuth, episodeRules, validate, episodeCtrl.adminCreateEpisode);
router.put('/episodes/:id', adminLimiter, adminAuth, idParam, validate, episodeCtrl.adminUpdateEpisode);
router.delete('/episodes/:id', adminLimiter, adminAuth, idParam, validate, episodeCtrl.adminDeleteEpisode);

// Genres
router.post('/genres', adminLimiter, adminAuth, genreRules, validate, genreCtrl.adminCreateGenre);
router.put('/genres/:id', adminLimiter, adminAuth, idParam, validate, genreCtrl.adminUpdateGenre);
router.delete('/genres/:id', adminLimiter, adminAuth, idParam, validate, genreCtrl.adminDeleteGenre);

// Cast
router.post('/cast', adminLimiter, adminAuth, castRules, validate, castCtrl.adminCreateCast);
router.put('/cast/:id', adminLimiter, adminAuth, idParam, validate, castCtrl.adminUpdateCast);
router.delete('/cast/:id', adminLimiter, adminAuth, idParam, validate, castCtrl.adminDeleteCast);

// Banners
router.post('/banners', adminLimiter, adminAuth, bannerRules, validate, bannerCtrl.adminCreateBanner);
router.put('/banners/:id', adminLimiter, adminAuth, idParam, validate, bannerCtrl.adminUpdateBanner);
router.delete('/banners/:id', adminLimiter, adminAuth, idParam, validate, bannerCtrl.adminDeleteBanner);

// Analytics
router.get('/analytics', adminLimiter, adminAuth, require('../controllers/analyticsController').getAnalytics);

module.exports = router;
