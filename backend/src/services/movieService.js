const { prisma } = require('../config/database');

const movieInclude = {
  genres: { include: { genre: true } },
  cast: { include: { cast: true } },
};

const buildMovieWhere = (query) => {
  const where = { status: 'ACTIVE' };
  if (query.search) {
    where.OR = [
      { title: { contains: query.search, mode: 'insensitive' } },
      { description: { contains: query.search, mode: 'insensitive' } },
      { director: { contains: query.search, mode: 'insensitive' } },
    ];
  }
  if (query.genre) where.genres = { some: { genre: { slug: query.genre } } };
  if (query.year) where.year = parseInt(query.year);
  if (query.language) where.language = { equals: query.language, mode: 'insensitive' };
  if (query.country) where.country = { equals: query.country, mode: 'insensitive' };
  if (query.rating) where.rating = { gte: parseFloat(query.rating) };
  if (query.featured === 'true') where.featured = true;
  if (query.trending === 'true') where.trending = true;
  if (query.popular === 'true') where.popular = true;
  return where;
};

const buildMovieOrderBy = (sort) => {
  const map = {
    rating: { rating: 'desc' },
    latest: { year: 'desc' },
    views: { views: 'desc' },
    az: { title: 'asc' },
    za: { title: 'desc' },
    newest: { createdAt: 'desc' },
  };
  return map[sort] || { views: 'desc' };
};

const formatMovie = (movie) => ({
  ...movie,
  genres: movie.genres?.map((mg) => mg.genre) || [],
  cast: movie.cast?.map((mc) => ({ ...mc.cast, characterName: mc.characterName })) || [],
});

const getMovies = async (query, skip, limit) => {
  const where = buildMovieWhere(query);
  const orderBy = buildMovieOrderBy(query.sort);
  const [movies, total] = await Promise.all([
    prisma.movie.findMany({ where, orderBy, skip, take: limit, include: movieInclude }),
    prisma.movie.count({ where }),
  ]);
  return { movies: movies.map(formatMovie), total };
};

const getMovieById = async (id) => {
  const movie = await prisma.movie.findFirst({
    where: { id: parseInt(id), status: 'ACTIVE' },
    include: movieInclude,
  });
  return movie ? formatMovie(movie) : null;
};

const getMovieBySlug = async (slug) => {
  const movie = await prisma.movie.findFirst({
    where: { slug, status: 'ACTIVE' },
    include: movieInclude,
  });
  return movie ? formatMovie(movie) : null;
};

const incrementMovieViews = async (id) => {
  return prisma.movie.update({
    where: { id: parseInt(id) },
    data: { views: { increment: 1 } },
    include: movieInclude,
  });
};

const createMovie = async (data) => {
  const { genreIds = [], castIds = [], ...movieData } = data;
  return prisma.movie.create({
    data: {
      ...movieData,
      genres: { create: genreIds.map((id) => ({ genreId: id })) },
      cast: { create: castIds.map((c) => ({ castId: c.id, characterName: c.characterName })) },
    },
    include: movieInclude,
  });
};

const updateMovie = async (id, data) => {
  const { genreIds, castIds, ...movieData } = data;
  const updates = { ...movieData };

  if (genreIds !== undefined) {
    await prisma.movieGenre.deleteMany({ where: { movieId: parseInt(id) } });
    updates.genres = { create: genreIds.map((gid) => ({ genreId: gid })) };
  }
  if (castIds !== undefined) {
    await prisma.movieCast.deleteMany({ where: { movieId: parseInt(id) } });
    updates.cast = { create: castIds.map((c) => ({ castId: c.id, characterName: c.characterName })) };
  }

  return prisma.movie.update({
    where: { id: parseInt(id) },
    data: updates,
    include: movieInclude,
  });
};

const deleteMovie = async (id) => {
  return prisma.movie.delete({ where: { id: parseInt(id) } });
};

module.exports = { getMovies, getMovieById, getMovieBySlug, incrementMovieViews, createMovie, updateMovie, deleteMovie, formatMovie };
