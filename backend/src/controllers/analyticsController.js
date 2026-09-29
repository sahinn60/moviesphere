const { prisma } = require('../config/database');
const { success } = require('../utils/response');

const getAnalytics = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalMovies, totalSeries, totalEpisodes, totalGenres, totalCast,
      totalViews, todayViews,
      trendingMovies, mostWatchedMovies, mostWatchedEpisodes,
    ] = await Promise.all([
      prisma.movie.count({ where: { status: 'ACTIVE' } }),
      prisma.series.count({ where: { status: 'ACTIVE' } }),
      prisma.episode.count(),
      prisma.genre.count(),
      prisma.cast.count(),
      prisma.movie.aggregate({ _sum: { views: true } }),
      prisma.watchEvent.count({ where: { createdAt: { gte: today } } }),
      prisma.movie.findMany({
        where: { trending: true, status: 'ACTIVE' },
        take: 10,
        orderBy: { views: 'desc' },
        select: { id: true, title: true, slug: true, posterUrl: true, views: true, rating: true },
      }),
      prisma.movie.findMany({
        where: { status: 'ACTIVE' },
        take: 10,
        orderBy: { views: 'desc' },
        select: { id: true, title: true, slug: true, posterUrl: true, views: true, rating: true },
      }),
      prisma.episode.findMany({
        take: 10,
        orderBy: { views: 'desc' },
        select: { id: true, title: true, views: true, season: { select: { series: { select: { title: true } } } } },
      }),
    ]);

    return success(res, {
      overview: {
        totalMovies,
        totalSeries,
        totalEpisodes,
        totalGenres,
        totalCast,
        totalViews: totalViews._sum.views || 0,
        todayViews,
      },
      trendingMovies,
      mostWatchedMovies,
      mostWatchedEpisodes,
    }, 'Analytics fetched successfully');
  } catch (err) { next(err); }
};

module.exports = { getAnalytics };
