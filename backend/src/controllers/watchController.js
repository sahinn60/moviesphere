const { prisma } = require('../config/database');
const { success, error } = require('../utils/response');
const movieService = require('../services/movieService');

const watchMovie = async (req, res, next) => {
  try {
    const movie = await prisma.movie.findFirst({
      where: { id: parseInt(req.params.id), status: 'ACTIVE' },
      include: { genres: { include: { genre: true } }, cast: { include: { cast: true } } },
    });
    if (!movie) return error(res, 'Movie not found', 404, 'MOVIE_NOT_FOUND');

    await prisma.movie.update({ where: { id: movie.id }, data: { views: { increment: 1 } } });

    const { sessionId, watchDuration = 0 } = req.body;
    if (sessionId) {
      await prisma.watchEvent.create({
        data: { contentType: 'MOVIE', movieId: movie.id, sessionId, watchDuration: parseInt(watchDuration) || 0 },
      });
    }

    const related = await prisma.movie.findMany({
      where: {
        id: { not: movie.id },
        status: 'ACTIVE',
        genres: { some: { genreId: { in: movie.genres.map((mg) => mg.genreId) } } },
      },
      take: 10,
      orderBy: { views: 'desc' },
      include: { genres: { include: { genre: true } } },
    });

    return success(res, {
      movie: { ...movie, genres: movie.genres.map((mg) => mg.genre), cast: movie.cast.map((mc) => ({ ...mc.cast, characterName: mc.characterName })) },
      videoUrl: movie.videoUrl,
      related: related.map((m) => ({ ...m, genres: m.genres.map((mg) => mg.genre) })),
    }, 'Watch data fetched successfully');
  } catch (err) { next(err); }
};

const watchEpisode = async (req, res, next) => {
  try {
    const episode = await prisma.episode.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { season: { include: { series: true, episodes: { orderBy: { episodeNumber: 'asc' } } } } },
    });
    if (!episode) return error(res, 'Episode not found', 404, 'EPISODE_NOT_FOUND');

    await prisma.episode.update({ where: { id: episode.id }, data: { views: { increment: 1 } } });

    const { sessionId, watchDuration = 0 } = req.body;
    if (sessionId) {
      await prisma.watchEvent.create({
        data: { contentType: 'EPISODE', episodeId: episode.id, sessionId, watchDuration: parseInt(watchDuration) || 0 },
      });
    }

    const allEpisodes = episode.season.episodes;
    const currentIdx = allEpisodes.findIndex((e) => e.id === episode.id);
    const nextEpisode = allEpisodes[currentIdx + 1] || null;

    return success(res, {
      episode,
      videoUrl: episode.videoUrl,
      series: episode.season.series,
      nextEpisode,
      allEpisodes,
    }, 'Watch data fetched successfully');
  } catch (err) { next(err); }
};

module.exports = { watchMovie, watchEpisode };
