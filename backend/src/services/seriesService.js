const { prisma } = require('../config/database');

const seriesInclude = {
  genres: { include: { genre: true } },
  cast: { include: { cast: true } },
  seasons: { orderBy: { seasonNumber: 'asc' }, include: { episodes: { orderBy: { episodeNumber: 'asc' } } } },
};

const seriesListInclude = {
  genres: { include: { genre: true } },
  cast: { include: { cast: true } },
  seasons: { orderBy: { seasonNumber: 'asc' } },
};

const formatSeries = (s) => ({
  ...s,
  genres: s.genres?.map((sg) => sg.genre) || [],
  cast: s.cast?.map((sc) => ({ ...sc.cast, characterName: sc.characterName })) || [],
});

const buildSeriesWhere = (query) => {
  const where = { status: 'ACTIVE' };
  if (query.search) where.title = { contains: query.search, mode: 'insensitive' };
  if (query.genre) where.genres = { some: { genre: { slug: query.genre } } };
  if (query.year) where.year = parseInt(query.year);
  if (query.language) where.language = { equals: query.language, mode: 'insensitive' };
  if (query.featured === 'true') where.featured = true;
  if (query.trending === 'true') where.trending = true;
  if (query.popular === 'true') where.popular = true;
  return where;
};

const getSeries = async (query, skip, limit) => {
  const where = buildSeriesWhere(query);
  const orderBy = query.sort === 'rating' ? { rating: 'desc' } : query.sort === 'latest' ? { year: 'desc' } : { views: 'desc' };
  const [seriesList, total] = await Promise.all([
    prisma.series.findMany({ where, orderBy, skip, take: limit, include: seriesListInclude }),
    prisma.series.count({ where }),
  ]);
  return { series: seriesList.map(formatSeries), total };
};

const getSeriesById = async (id) => {
  const s = await prisma.series.findFirst({
    where: { id: parseInt(id), status: 'ACTIVE' },
    include: seriesInclude,
  });
  return s ? formatSeries(s) : null;
};

const getSeriesBySlug = async (slug) => {
  const s = await prisma.series.findFirst({
    where: { slug, status: 'ACTIVE' },
    include: seriesInclude,
  });
  return s ? formatSeries(s) : null;
};

const getSeriesSeasons = async (seriesId) => {
  return prisma.season.findMany({
    where: { seriesId: parseInt(seriesId) },
    orderBy: { seasonNumber: 'asc' },
    include: { episodes: { orderBy: { episodeNumber: 'asc' } } },
  });
};

const createSeries = async (data) => {
  const { genreIds = [], castIds = [], ...seriesData } = data;
  return prisma.series.create({
    data: {
      ...seriesData,
      genres: { create: genreIds.map((id) => ({ genreId: id })) },
      cast: { create: castIds.map((c) => ({ castId: c.id, characterName: c.characterName })) },
    },
    include: seriesListInclude,
  });
};

const updateSeries = async (id, data) => {
  const { genreIds, castIds, ...seriesData } = data;
  const updates = { ...seriesData };
  if (genreIds !== undefined) {
    await prisma.seriesGenre.deleteMany({ where: { seriesId: parseInt(id) } });
    updates.genres = { create: genreIds.map((gid) => ({ genreId: gid })) };
  }
  if (castIds !== undefined) {
    await prisma.seriesCast.deleteMany({ where: { seriesId: parseInt(id) } });
    updates.cast = { create: castIds.map((c) => ({ castId: c.id, characterName: c.characterName })) };
  }
  return prisma.series.update({ where: { id: parseInt(id) }, data: updates, include: seriesListInclude });
};

const deleteSeries = async (id) => prisma.series.delete({ where: { id: parseInt(id) } });

module.exports = { getSeries, getSeriesById, getSeriesBySlug, getSeriesSeasons, createSeries, updateSeries, deleteSeries, formatSeries };
