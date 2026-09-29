require('dotenv').config();
const { prisma, bcrypt, DEMO_VIDEO, DEMO_TRAILER, genres, castData } = require('./seedData');
const { moviesData } = require('./seedMovies');
const { seriesData } = require('./seedSeries');

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  await prisma.watchEvent.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.movieCast.deleteMany();
  await prisma.movieGenre.deleteMany();
  await prisma.seriesCast.deleteMany();
  await prisma.seriesGenre.deleteMany();
  await prisma.episode.deleteMany();
  await prisma.season.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.series.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.cast.deleteMany();
  await prisma.admin.deleteMany();
  console.log('✅ Cleaned existing data');

  // Seed admin
  const passwordHash = await bcrypt.hash('admin123456', 12);
  await prisma.admin.create({ data: { name: 'Super Admin', email: 'admin@cinevora.com', passwordHash } });
  console.log('✅ Admin created: admin@cinevora.com / admin123456');

  // Seed genres
  const createdGenres = {};
  for (const g of genres) {
    const genre = await prisma.genre.create({ data: g });
    createdGenres[g.name] = genre;
  }
  console.log(`✅ ${genres.length} genres created`);

  // Seed cast
  const createdCast = [];
  for (const c of castData) {
    const cast = await prisma.cast.create({ data: c });
    createdCast.push(cast);
  }
  console.log(`✅ ${castData.length} cast members created`);

  // Seed movies
  for (const movieData of moviesData) {
    const { genres: movieGenres, ...data } = movieData;
    const movie = await prisma.movie.create({ data });
    for (const genreName of movieGenres) {
      if (createdGenres[genreName]) {
        await prisma.movieGenre.create({ data: { movieId: movie.id, genreId: createdGenres[genreName].id } });
      }
    }
    // Assign 2-3 random cast members
    const shuffled = [...createdCast].sort(() => 0.5 - Math.random()).slice(0, 3);
    for (const cast of shuffled) {
      await prisma.movieCast.create({ data: { movieId: movie.id, castId: cast.id, characterName: `Character in ${movie.title}` } });
    }
  }
  console.log(`✅ ${moviesData.length} movies created`);

  // Seed series
  for (const seriesItem of seriesData) {
    const { genres: seriesGenres, seasons: seasonsData, ...data } = seriesItem;
    const series = await prisma.series.create({ data });
    for (const genreName of seriesGenres) {
      if (createdGenres[genreName]) {
        await prisma.seriesGenre.create({ data: { seriesId: series.id, genreId: createdGenres[genreName].id } });
      }
    }
    // Assign 2 random cast members
    const shuffled = [...createdCast].sort(() => 0.5 - Math.random()).slice(0, 2);
    for (const cast of shuffled) {
      await prisma.seriesCast.create({ data: { seriesId: series.id, castId: cast.id, characterName: `Character in ${series.title}` } });
    }
    // Create seasons and episodes
    for (const seasonData of seasonsData) {
      const { episodes: episodesData, ...sData } = seasonData;
      const season = await prisma.season.create({ data: { seriesId: series.id, ...sData } });
      for (const ep of episodesData) {
        await prisma.episode.create({ data: { seasonId: season.id, ...ep } });
      }
    }
  }
  console.log(`✅ ${seriesData.length} series created with seasons and episodes`);

  // Seed banners
  const allMovies = await prisma.movie.findMany({ where: { featured: true }, take: 5 });
  const bannerData = [
    { title: 'Galactic Odyssey', subtitle: 'An epic journey beyond the stars', imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1400&h=600&fit=crop', buttonText: 'Watch Now', active: true, sortOrder: 1 },
    { title: 'The Heist', subtitle: 'The most daring robbery ever planned', imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&h=600&fit=crop', buttonText: 'Watch Now', active: true, sortOrder: 2 },
    { title: 'Neon Dynasty', subtitle: 'The future is now', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=600&fit=crop', buttonText: 'Watch Now', active: true, sortOrder: 3 },
    { title: 'The Last Symphony', subtitle: 'Music that will change the world', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1400&h=600&fit=crop', buttonText: 'Watch Now', active: true, sortOrder: 4 },
    { title: 'Void Walker', subtitle: 'Across dimensions, beyond reality', imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1400&h=600&fit=crop', buttonText: 'Watch Now', active: true, sortOrder: 5 },
  ];

  for (let i = 0; i < bannerData.length; i++) {
    const movie = allMovies[i];
    await prisma.banner.create({ data: { ...bannerData[i], movieId: movie?.id || null } });
  }
  console.log('✅ 5 banners created');

  console.log('\n🎬 Seed completed successfully!');
  console.log('📧 Admin: admin@cinevora.com');
  console.log('🔑 Password: admin123456');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
