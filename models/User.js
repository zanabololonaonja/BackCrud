const pool = require('../config/db');

const createAlbum = async (idalbum, namealbum) => {
  try {
    const result = await pool.query(
      'INSERT INTO album (idalbum, namealbum) VALUES ($1, $2) RETURNING *',
      [idalbum, namealbum]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erreur dans le modèle createAlbum:', err.message);
    throw err;
  }
};

const getAlbums = async () => {
  try {
    const result = await pool.query('SELECT * FROM album');
    return result.rows;
  } catch (err) {
    console.error('Erreur dans le modèle getAlbums:', err.message);
    throw err;
  }
};

// const createPhoto = async (idphoto, idalbum, namephoto, attachedfile) => {
//   try {
//     const result = await pool.query(
//       'INSERT INTO photo (idphoto, idalbum, namephoto, attachedfile) VALUES ($1, $2, $3, $4) RETURNING *',
//       [idphoto, idalbum, namephoto, attachedfile]
//     );
//     return result.rows[0];
//   } catch (err) {
//     console.error('Erreur dans le modèle createPhoto:', err.message);
//     throw err;
//   }
// };

module.exports = {
  createAlbum,
  getAlbums,
  // createPhoto,
};
