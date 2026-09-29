const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');
const { JWT_SECRET, JWT_EXPIRES_IN, BCRYPT_ROUNDS } = require('../config/env');
const { success, error, created } = require('../utils/response');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return error(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS');

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return error(res, 'Invalid credentials', 401, 'INVALID_CREDENTIALS');

    const token = jwt.sign({ id: admin.id, email: admin.email, name: admin.name }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return success(res, {
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email },
      expiresIn: JWT_EXPIRES_IN,
    }, 'Login successful');
  } catch (err) { next(err); }
};

const getProfile = async (req, res, next) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    if (!admin) return error(res, 'Admin not found', 404, 'ADMIN_NOT_FOUND');
    return success(res, admin, 'Profile fetched');
  } catch (err) { next(err); }
};

const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const admin = await prisma.admin.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return created(res, admin, 'Admin created successfully');
  } catch (err) { next(err); }
};

module.exports = { login, getProfile, createAdmin };
