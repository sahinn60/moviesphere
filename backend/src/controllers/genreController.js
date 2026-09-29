const { prisma } = require('../config/database');
const { success, error, created } = require('../utils/response');
const { slugify } = require('../utils/slugify');
const { getPagination, buildMeta } = require('../utils/pagination');

const getGenres = async (req, res, next) => {
  try {
    const genres = await prisma.genre.findMany({ orderBy: { name: 'asc' } });
    return success(res, genres, 'Genres fetched successfully');
  } catch (err) { next(err); }
};

const getGenreBySlug = async (req, res, next) => {
  try {
    const genre = await prisma.genre.findUnique({ where: { slug: req.params.slug } });
    if (!genre) return error(res, 'Genre not found', 404, 'GENRE_NOT_FOUND');
    return success(res, genre, 'Genre fetched successfully');
  } catch (err) { next(err); }
};

const getMoviesByGenre = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const genre = await prisma.genre.findUnique({ where: { slug: req.params.slug } });
    if (!genre) return error(res, 'Genre not found', 404, 'GENRE_NOT_FOUND');

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where: { status: 'ACTIVE', genres: { some: { genreId: genre.id } } },
        skip, take: limit,
        orderBy: { views: 'desc' },
        include: { genres: { include: { genre: true } } },
      }),
      prisma.movie.count({ where: { status: 'ACTIVE', genres: { some: { genreId: genre.id } } } }),
    ]);

    return success(res, movies.map((m) => ({ ...m, genres: m.genres.map((mg) => mg.genre) })), 'Movies fetched', 200, buildMeta(page, limit, total));
  } catch (err) { next(err); }
};

const adminCreateGenre = async (req, res, next) => {
  try {
    const slug = slugify(req.body.name);
    const genre = await prisma.genre.create({ data: { ...req.body, slug } });
    return created(res, genre, 'Genre created successfully');
  } catch (err) { next(err); }
};

const adminUpdateGenre = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.body.name) updates.slug = slugify(req.body.name);
    const genre = await prisma.genre.update({ where: { id: parseInt(req.params.id) }, data: updates });
    return success(res, genre, 'Genre updated successfully');
  } catch (err) { next(err); }
};

const adminDeleteGenre = async (req, res, next) => {
  try {
    await prisma.genre.delete({ where: { id: parseInt(req.params.id) } });
    return success(res, null, 'Genre deleted successfully');
  } catch (err) { next(err); }
};

module.exports = { getGenres, getGenreBySlug, getMoviesByGenre, adminCreateGenre, adminUpdateGenre, adminDeleteGenre };
