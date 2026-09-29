const { prisma } = require('../config/database');
const { success, error, created } = require('../utils/response');

const getEpisodesBySeasonId = async (req, res, next) => {
  try {
    const episodes = await prisma.episode.findMany({
      where: { seasonId: parseInt(req.params.seasonId) },
      orderBy: { episodeNumber: 'asc' },
    });
    return success(res, episodes, 'Episodes fetched successfully');
  } catch (err) { next(err); }
};

const getEpisodeById = async (req, res, next) => {
  try {
    const episode = await prisma.episode.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { season: { include: { series: true } } },
    });
    if (!episode) return error(res, 'Episode not found', 404, 'EPISODE_NOT_FOUND');
    return success(res, episode, 'Episode fetched successfully');
  } catch (err) { next(err); }
};

// Admin
const adminCreateSeason = async (req, res, next) => {
  try {
    const season = await prisma.season.create({ data: req.body });
    return created(res, season, 'Season created successfully');
  } catch (err) { next(err); }
};

const adminUpdateSeason = async (req, res, next) => {
  try {
    const season = await prisma.season.update({ where: { id: parseInt(req.params.id) }, data: req.body });
    return success(res, season, 'Season updated successfully');
  } catch (err) { next(err); }
};

const adminDeleteSeason = async (req, res, next) => {
  try {
    await prisma.season.delete({ where: { id: parseInt(req.params.id) } });
    return success(res, null, 'Season deleted successfully');
  } catch (err) { next(err); }
};

const adminCreateEpisode = async (req, res, next) => {
  try {
    const episode = await prisma.episode.create({ data: req.body });
    return created(res, episode, 'Episode created successfully');
  } catch (err) { next(err); }
};

const adminUpdateEpisode = async (req, res, next) => {
  try {
    const episode = await prisma.episode.update({ where: { id: parseInt(req.params.id) }, data: req.body });
    return success(res, episode, 'Episode updated successfully');
  } catch (err) { next(err); }
};

const adminDeleteEpisode = async (req, res, next) => {
  try {
    await prisma.episode.delete({ where: { id: parseInt(req.params.id) } });
    return success(res, null, 'Episode deleted successfully');
  } catch (err) { next(err); }
};

module.exports = {
  getEpisodesBySeasonId, getEpisodeById,
  adminCreateSeason, adminUpdateSeason, adminDeleteSeason,
  adminCreateEpisode, adminUpdateEpisode, adminDeleteEpisode,
};
