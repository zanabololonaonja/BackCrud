// Back/models/User.js
const pool = require('../config/db');

const createAlbum = async (idalbum, namealbum) => {
  try {
    const result = await pool.query(
      'INSERT INTO album (idalbum, namealbum) VALUES ($1, $2) RETURNING *',
      [idalbum, namealbum]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error in createAlbum model:', err.message); // Log l'erreur pour les diagnostics
    throw err; // Rethrow l'erreur pour qu'elle puisse être capturée par le contrôleur
  }
};

const getAlbums = async () => {
  try {
    const result = await pool.query('SELECT * FROM album');
    return result.rows;
  } catch (err) {
    console.error('Error in getAlbums model:', err.message); // Log l'erreur pour les diagnostics
    throw err; // Rethrow l'erreur pour qu'elle puisse être capturée par le contrôleur
  }
};

module.exports = {
  createAlbum,
  getAlbums,
};
