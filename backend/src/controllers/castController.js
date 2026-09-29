const { prisma } = require('../config/database');
const { success, error, created } = require('../utils/response');
const { getPagination, buildMeta } = require('../utils/pagination');

const getCastById = async (req, res, next) => {
  try {
    const cast = await prisma.cast.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        movieCasts: { include: { movie: { include: { genres: { include: { genre: true } } } } } },
        seriesCasts: { include: { series: { include: { genres: { include: { genre: true } } } } } },
      },
    });
    if (!cast) return error(res, 'Cast member not found', 404, 'CAST_NOT_FOUND');
    return success(res, cast, 'Cast member fetched successfully');
  } catch (err) { next(err); }
};

const getAllCast = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [castList, total] = await Promise.all([
      prisma.cast.findMany({ skip, take: limit, orderBy: { name: 'asc' } }),
      prisma.cast.count(),
    ]);
    return success(res, castList, 'Cast fetched successfully', 200, buildMeta(page, limit, total));
  } catch (err) { next(err); }
};

const adminCreateCast = async (req, res, next) => {
  try {
    const cast = await prisma.cast.create({ data: req.body });
    return created(res, cast, 'Cast member created successfully');
  } catch (err) { next(err); }
};

const adminUpdateCast = async (req, res, next) => {
  try {
    const cast = await prisma.cast.update({ where: { id: parseInt(req.params.id) }, data: req.body });
    return success(res, cast, 'Cast member updated successfully');
  } catch (err) { next(err); }
};

const adminDeleteCast = async (req, res, next) => {
  try {
    await prisma.cast.delete({ where: { id: parseInt(req.params.id) } });
    return success(res, null, 'Cast member deleted successfully');
  } catch (err) { next(err); }
};

module.exports = { getCastById, getAllCast, adminCreateCast, adminUpdateCast, adminDeleteCast };
