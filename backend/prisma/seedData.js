const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const DEMO_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const DEMO_TRAILER = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

const genres = [
  { name: 'Action', slug: 'action', imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=400&fit=crop' },
  { name: 'Adventure', slug: 'adventure', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop' },
  { name: 'Comedy', slug: 'comedy', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop' },
  { name: 'Drama', slug: 'drama', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop' },
  { name: 'Horror', slug: 'horror', imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=400&fit=crop' },
  { name: 'Romance', slug: 'romance', imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop' },
  { name: 'Sci-Fi', slug: 'sci-fi', imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=400&fit=crop' },
  { name: 'Thriller', slug: 'thriller', imageUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=600&h=400&fit=crop' },
  { name: 'Documentary', slug: 'documentary', imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&h=400&fit=crop' },
  { name: 'Animation', slug: 'animation', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop' },
];

const castData = [
  { name: 'Marcus Stone', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', biography: 'Award-winning actor known for action and drama roles.' },
  { name: 'Elena Vasquez', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', biography: 'Versatile actress with roles in sci-fi and thriller films.' },
  { name: 'James Holloway', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', biography: 'Character actor with over 20 years of experience.' },
  { name: 'Sophia Chen', photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', biography: 'Rising star in international cinema.' },
  { name: 'David Park', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', biography: 'Known for intense dramatic performances.' },
  { name: 'Amara Williams', photoUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop', biography: 'Acclaimed actress and producer.' },
  { name: 'Ryan Mitchell', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop', biography: 'Action star and martial arts expert.' },
  { name: 'Isabella Torres', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', biography: 'Award-winning actress from Spain.' },
  { name: 'Nathan Cross', photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop', biography: 'Veteran actor known for villain roles.' },
  { name: 'Zoe Laurent', photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop', biography: 'French actress with international acclaim.' },
  { name: 'Carlos Rivera', photoUrl: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop', biography: 'Latin American cinema icon.' },
  { name: 'Priya Sharma', photoUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop', biography: 'Bollywood and Hollywood crossover star.' },
  { name: 'Oliver Bennett', photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop', biography: 'British character actor.' },
  { name: 'Layla Hassan', photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop', biography: 'Middle Eastern cinema pioneer.' },
  { name: 'Tom Briggs', photoUrl: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop', biography: 'Australian actor and director.' },
  { name: 'Nina Petrov', photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop', biography: 'Eastern European film star.' },
  { name: 'Alex Kim', photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop', biography: 'Korean-American actor.' },
  { name: 'Grace O\'Brien', photoUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop', biography: 'Irish actress known for period dramas.' },
  { name: 'Felix Wagner', photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop', biography: 'German actor and filmmaker.' },
  { name: 'Maya Johnson', photoUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&h=200&fit=crop', biography: 'American actress and activist.' },
];

module.exports = { prisma, bcrypt, DEMO_VIDEO, DEMO_TRAILER, genres, castData };
