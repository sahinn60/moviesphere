const { prisma } = require('../config/database');

const getMovieRecommendations = async (movieId, limit = 12) => {
  const movie = await prisma.movie.findUnique({
    where: { id: parseInt(movieId) },
    include: { genres: { include: { genre: true } } },
  });

  if (!movie) return [];

  const genreIds = movie.genres.map((mg) => mg.genreId);

  const recommendations = await prisma.movie.findMany({
    where: {
      id: { not: parseInt(movieId) },
      status: 'ACTIVE',
      OR: [
        { genres: { some: { genreId: { in: genreIds } } } },
        { director: movie.director || undefined },
        { year: { gte: movie.year - 3, lte: movie.year + 3 } },
      ],
    },
    orderBy: [{ views: 'desc' }, { rating: 'desc' }],
    take: limit,
    include: { genres: { include: { genre: true } } },
  });

  return recommendations.map((m) => ({ ...m, genres: m.genres.map((mg) => mg.genre) }));
};

const getSeriesRecommendations = async (seriesId, limit = 12) => {
  const series = await prisma.series.findUnique({
    where: { id: parseInt(seriesId) },
    include: { genres: { include: { genre: true } } },
  });

  if (!series) return [];

  const genreIds = series.genres.map((sg) => sg.genreId);

  const recommendations = await prisma.series.findMany({
    where: {
      id: { not: parseInt(seriesId) },
      status: 'ACTIVE',
      genres: { some: { genreId: { in: genreIds } } },
    },
    orderBy: [{ views: 'desc' }, { rating: 'desc' }],
    take: limit,
    include: { genres: { include: { genre: true } } },
  });

  return recommendations.map((s) => ({ ...s, genres: s.genres.map((sg) => sg.genre) }));
};

module.exports = { getMovieRecommendations, getSeriesRecommendations };
