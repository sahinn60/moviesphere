const { validationResult, body, param, query } = require('express-validator');
const { error } = require('../utils/response');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: 'VALIDATION_ERROR',
      details: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

const movieRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 255 }),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('year').isInt({ min: 1888, max: new Date().getFullYear() + 5 }).withMessage('Invalid year'),
  body('rating').optional().isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10'),
  body('posterUrl').optional().isURL().withMessage('Invalid poster URL'),
  body('backdropUrl').optional().isURL().withMessage('Invalid backdrop URL'),
  body('trailerUrl').optional().isURL().withMessage('Invalid trailer URL'),
  body('videoUrl').optional().isURL().withMessage('Invalid video URL'),
  body('genreIds').optional().isArray().withMessage('genreIds must be an array'),
  body('castIds').optional().isArray().withMessage('castIds must be an array'),
];

const seriesRules = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 255 }),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('year').isInt({ min: 1888, max: new Date().getFullYear() + 5 }).withMessage('Invalid year'),
  body('rating').optional().isFloat({ min: 0, max: 10 }).withMessage('Rating must be between 0 and 10'),
  body('posterUrl').optional().isURL().withMessage('Invalid poster URL'),
  body('backdropUrl').optional().isURL().withMessage('Invalid backdrop URL'),
];

const episodeRules = [
  body('seasonId').isInt({ min: 1 }).withMessage('Valid seasonId is required'),
  body('episodeNumber').isInt({ min: 1 }).withMessage('Valid episode number is required'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('videoUrl').optional().isURL().withMessage('Invalid video URL'),
  body('thumbnailUrl').optional().isURL().withMessage('Invalid thumbnail URL'),
];

const genreRules = [
  body('name').trim().notEmpty().withMessage('Genre name is required').isLength({ max: 100 }),
  body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
];

const castRules = [
  body('name').trim().notEmpty().withMessage('Cast name is required').isLength({ max: 255 }),
  body('photoUrl').optional().isURL().withMessage('Invalid photo URL'),
];

const bannerRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('imageUrl').isURL().withMessage('Valid image URL is required'),
  body('sortOrder').optional().isInt({ min: 0 }),
];

const adminLoginRules = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }),
];

const idParam = [
  param('id').isInt({ min: 1 }).withMessage('Valid ID is required'),
];

module.exports = {
  validate,
  movieRules,
  seriesRules,
  episodeRules,
  genreRules,
  castRules,
  bannerRules,
  adminLoginRules,
  idParam,
};
