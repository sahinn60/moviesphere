const { success, error, created } = require('../utils/response');
const { getPagination, buildMeta } = require('../utils/pagination');
const { slugify } = require('../utils/slugify');
const seriesService = require('../services/seriesService');
const { getSeriesRecommendations } = require('../services/recommendationService');

const getSeries = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { series, total } = await seriesService.getSeries(req.query, skip, limit);
    return success(res, series, 'Series fetched successfully', 200, buildMeta(page, limit, total));
  } catch (err) { next(err); }
};

const getSeriesById = async (req, res, next) => {
  try {
    const series = await seriesService.getSeriesById(req.params.id);
    if (!series) return error(res, 'Series not found', 404, 'SERIES_NOT_FOUND');
    return success(res, series, 'Series fetched successfully');
  } catch (err) { next(err); }
};

const getSeriesBySlug = async (req, res, next) => {
  try {
    const series = await seriesService.getSeriesBySlug(req.params.slug);
    if (!series) return error(res, 'Series not found', 404, 'SERIES_NOT_FOUND');
    return success(res, series, 'Series fetched successfully');
  } catch (err) { next(err); }
};

const getTrendingSeries = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { series, total } = await seriesService.getSeries({ ...req.query, trending: 'true', sort: 'views' }, skip, limit);
    return success(res, series, 'Trending series fetched', 200, buildMeta(page, limit, total));
  } catch (err) { next(err); }
};

const getPopularSeries = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { series, total } = await seriesService.getSeries({ ...req.query, popular: 'true', sort: 'views' }, skip, limit);
    return success(res, series, 'Popular series fetched', 200, buildMeta(page, limit, total));
  } catch (err) { next(err); }
};

const getSeriesSeasons = async (req, res, next) => {
  try {
    const seasons = await seriesService.getSeriesSeasons(req.params.id);
    return success(res, seasons, 'Seasons fetched successfully');
  } catch (err) { next(err); }
};

const getSeriesRecommendationsCtrl = async (req, res, next) => {
  try {
    const recommendations = await getSeriesRecommendations(req.params.id);
    return success(res, recommendations, 'Recommendations fetched');
  } catch (err) { next(err); }
};

// Admin
const adminCreateSeries = async (req, res, next) => {
  try {
    const slug = slugify(req.body.title);
    const series = await seriesService.createSeries({ ...req.body, slug });
    return created(res, series, 'Series created successfully');
  } catch (err) { next(err); }
};

const adminUpdateSeries = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.body.title) updates.slug = slugify(req.body.title);
    const series = await seriesService.updateSeries(req.params.id, updates);
    return success(res, series, 'Series updated successfully');
  } catch (err) { next(err); }
};

const adminDeleteSeries = async (req, res, next) => {
  try {
    await seriesService.deleteSeries(req.params.id);
    return success(res, null, 'Series deleted successfully');
  } catch (err) { next(err); }
};

module.exports = {
  getSeries, getSeriesById, getSeriesBySlug, getTrendingSeries, getPopularSeries,
  getSeriesSeasons, getSeriesRecommendationsCtrl,
  adminCreateSeries, adminUpdateSeries, adminDeleteSeries,
};
