const { success, error, created } = require('../utils/response');
const { getPagination, buildMeta } = require('../utils/pagination');
const { slugify } = require('../utils/slugify');
const movieService = require('../services/movieService');
const { getMovieRecommendations } = require('../services/recommendationService');
const { prisma } = require('../config/database');

const getMovies = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { movies, total } = await movieService.getMovies(req.query, skip, limit);
    return success(res, movies, 'Movies fetched successfully', 200, buildMeta(page, limit, total));
  } catch (err) { next(err); }
};

const getMovieById = async (req, res, next) => {
  try {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) return error(res, 'Movie not found', 404, 'MOVIE_NOT_FOUND');
    return success(res, movie, 'Movie fetched successfully');
  } catch (err) { next(err); }
};

const getMovieBySlug = async (req, res, next) => {
  try {
    const movie = await movieService.getMovieBySlug(req.params.slug);
    if (!movie) return error(res, 'Movie not found', 404, 'MOVIE_NOT_FOUND');
    return success(res, movie, 'Movie fetched successfully');
  } catch (err) { next(err); }
};

const getTrendingMovies = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { movies, total } = await movieService.getMovies({ ...req.query, trending: 'true', sort: 'views' }, skip, limit);
    return success(res, movies, 'Trending movies fetched', 200, buildMeta(page, limit, total));
  } catch (err) { next(err); }
};

const getPopularMovies = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { movies, total } = await movieService.getMovies({ ...req.query, popular: 'true', sort: 'views' }, skip, limit);
    return success(res, movies, 'Popular movies fetched', 200, buildMeta(page, limit, total));
  } catch (err) { next(err); }
};

const getFeaturedMovies = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const { movies, total } = await movieService.getMovies({ ...req.query, featured: 'true' }, skip, limit);
    return success(res, movies, 'Featured movies fetched', 200, buildMeta(page, limit, total));
  } catch (err) { next(err); }
};

const getMovieRecommendationsCtrl = async (req, res, next) => {
  try {
    const recommendations = await getMovieRecommendations(req.params.id);
    return success(res, recommendations, 'Recommendations fetched');
  } catch (err) { next(err); }
};

const getMovieCast = async (req, res, next) => {
  try {
    const cast = await prisma.movieCast.findMany({
      where: { movieId: parseInt(req.params.id) },
      include: { cast: true },
    });
    return success(res, cast.map((mc) => ({ ...mc.cast, characterName: mc.characterName })), 'Cast fetched');
  } catch (err) { next(err); }
};

// Admin controllers
const adminCreateMovie = async (req, res, next) => {
  try {
    const slug = slugify(req.body.title);
    const movie = await movieService.createMovie({ ...req.body, slug });
    return created(res, movie, 'Movie created successfully');
  } catch (err) { next(err); }
};

const adminUpdateMovie = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.body.title) updates.slug = slugify(req.body.title);
    const movie = await movieService.updateMovie(req.params.id, updates);
    return success(res, movie, 'Movie updated successfully');
  } catch (err) { next(err); }
};

const adminDeleteMovie = async (req, res, next) => {
  try {
    await movieService.deleteMovie(req.params.id);
    return success(res, null, 'Movie deleted successfully');
  } catch (err) { next(err); }
};

module.exports = {
  getMovies, getMovieById, getMovieBySlug, getTrendingMovies, getPopularMovies,
  getFeaturedMovies, getMovieRecommendationsCtrl, getMovieCast,
  adminCreateMovie, adminUpdateMovie, adminDeleteMovie,
};
