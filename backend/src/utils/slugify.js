const slugifyLib = require('slugify');

const slugify = (text) =>
  slugifyLib(text, { lower: true, strict: true, trim: true });

const uniqueSlug = async (text, model, existingId = null) => {
  const base = slugify(text);
  let slug = base;
  let counter = 1;
  while (true) {
    const where = { slug };
    if (existingId) where.id = { not: existingId };
    const existing = await model.findUnique({ where: { slug } });
    if (!existing || (existingId && existing.id === existingId)) break;
    slug = `${base}-${counter++}`;
  }
  return slug;
};

module.exports = { slugify, uniqueSlug };
