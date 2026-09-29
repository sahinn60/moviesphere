const { prisma } = require('../config/database');
const { success, error, created } = require('../utils/response');

const getBanners = async (req, res, next) => {
  try {
    const banners = await prisma.banner.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        movie: { select: { id: true, title: true, slug: true, posterUrl: true } },
        series: { select: { id: true, title: true, slug: true, posterUrl: true } },
      },
    });
    return success(res, banners, 'Banners fetched successfully');
  } catch (err) { next(err); }
};

const adminCreateBanner = async (req, res, next) => {
  try {
    const banner = await prisma.banner.create({ data: req.body });
    return created(res, banner, 'Banner created successfully');
  } catch (err) { next(err); }
};

const adminUpdateBanner = async (req, res, next) => {
  try {
    const banner = await prisma.banner.update({ where: { id: parseInt(req.params.id) }, data: req.body });
    return success(res, banner, 'Banner updated successfully');
  } catch (err) { next(err); }
};

const adminDeleteBanner = async (req, res, next) => {
  try {
    await prisma.banner.delete({ where: { id: parseInt(req.params.id) } });
    return success(res, null, 'Banner deleted successfully');
  } catch (err) { next(err); }
};

module.exports = { getBanners, adminCreateBanner, adminUpdateBanner, adminDeleteBanner };
