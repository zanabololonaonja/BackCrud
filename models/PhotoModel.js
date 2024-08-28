const pool = require('../config/db');

const createPhoto = async (idphoto, idalbum, namephoto, attachedfile) => {
    try {
        const result = await pool.query(
            'INSERT INTO photo (idphoto, idalbum, namephoto, attachedfile) VALUES ($1, $2, $3, $4) RETURNING *',
            [idphoto, idalbum, namephoto, attachedfile]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Erreur dans le modèle createPhoto:', err.message);
        throw err;
    }
};

const getPhoto = async () => {
    try {
        const result = await pool.query('SELECT * FROM photo');
        return result.rows;
    } catch (err) {
        console.error('Erreur dans le modèle getPhoto:', err.message);
        throw err;
    }
};

// Fonction pour supprimer une photo par idphoto
const removePhoto = async (idphoto) => {
    try {
        const result = await pool.query('DELETE FROM photo WHERE idphoto = $1', [idphoto]);
        return result;
    } catch (err) {
        console.error('Erreur dans le modèle removePhoto:', err.message);
        throw err;
    }
};


const updatePhotoById = async (id, idalbum, namephoto, attachedfile) => {
    try {
      const query = `
        UPDATE photo
        SET idalbum = $1,
            namephoto = $2,
            attachedfile = COALESCE($3, attachedfile) -- Update if a new file is provided, otherwise keep the existing file
        WHERE idphoto = $4
        RETURNING *
      `;
      const values = [idalbum, namephoto, attachedfile, id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Erreur dans le modèle updatePhotoById:', err.message);
      throw err;
    }
  };
  

module.exports = {
    createPhoto,
    getPhoto,
    removePhoto,
    updatePhotoById
};
