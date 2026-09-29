const router = require('express').Router();
const { search } = require('../services/searchService');
const { success } = require('../utils/response');
const { publicLimiter } = require('../middleware/rateLimiter');

router.use(publicLimiter);

router.get('/', async (req, res, next) => {
  try {
    const { q, limit } = req.query;
    const results = await search(q, parseInt(limit) || 20);
    return success(res, results, 'Search results fetched');
  } catch (err) { next(err); }
});

module.exports = router;
