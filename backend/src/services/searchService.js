const { prisma } = require('../config/database');

const search = async (q, limit = 20) => {
  if (!q || q.trim().length < 2) return { movies: [], series: [] };

  const term = q.trim();

  const [movies, series] = await Promise.all([
    prisma.movie.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { title: { contains: term, mode: 'insensitive' } },
          { director: { contains: term, mode: 'insensitive' } },
          { genres: { some: { genre: { name: { contains: term, mode: 'insensitive' } } } } },
          { cast: { some: { cast: { name: { contains: term, mode: 'insensitive' } } } } },
        ],
      },
      take: limit,
      orderBy: { views: 'desc' },
      include: {
        genres: { include: { genre: true } },
      },
    }),
    prisma.series.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { title: { contains: term, mode: 'insensitive' } },
          { genres: { some: { genre: { name: { contains: term, mode: 'insensitive' } } } } },
          { cast: { some: { cast: { name: { contains: term, mode: 'insensitive' } } } } },
        ],
      },
      take: limit,
      orderBy: { views: 'desc' },
      include: {
        genres: { include: { genre: true } },
      },
    }),
  ]);

  return {
    movies: movies.map((m) => ({ ...m, genres: m.genres.map((mg) => mg.genre) })),
    series: series.map((s) => ({ ...s, genres: s.genres.map((sg) => sg.genre) })),
  };
};

module.exports = { search };
