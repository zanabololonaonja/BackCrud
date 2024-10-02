const pool = require('../config/db');

// AJOUT
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

// AFFICHE
const getPhoto = async () => {
    try {
        const result = await pool.query('SELECT * FROM photo');
        return result.rows;
    } catch (err) {
        console.error('Erreur dans le modèle getPhoto:', err.message);
        throw err;
    }
};

// supprimer
const removePhoto = async (idphoto) => {
    try {
        const result = await pool.query('DELETE FROM photo WHERE idphoto = $1', [idphoto]);
        return result;
    } catch (err) {
        console.error('Erreur dans le modèle removePhoto:', err.message);
        throw err;
    }
};

// MODIFIER
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
  


  const createEstimation = async (
    iduser,
    typefunerailles,
    lieuceremonie,
    typeceremonie,
    lieudeces,
    transportdistance,
    typevehicule,
    typecercueil,
    typeurne,
    soins_presentation,
    fleurs,
    organisation_ceremonie,
    lieu_repos,
    concession_duree,
    message_personnel
) => {
    try {
        const result = await pool.query(
            `INSERT INTO recapitulatif (
                iduser, typefunerailles, lieuceremonie, typeceremonie, lieudeces, 
                transportdistance, typevehicule, typecercueil, typeurne, 
                soins_presentation, fleurs, organisation_ceremonie, lieu_repos, 
                concession_duree, message_personnel
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
            [
                iduser,
                typefunerailles,
                lieuceremonie,
                typeceremonie,
                lieudeces,
                transportdistance,
                typevehicule,
                typecercueil,
                typeurne,
                soins_presentation,
                fleurs,
                organisation_ceremonie,
                lieu_repos,
                concession_duree,
                message_personnel
            ]
        );
        console.log('Estimation insérée avec succès:', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Erreur dans le modèle createEstimation:', err.message);
        throw err; // Re-throw error for handling in controller
    }
};


const getEstimationsByUserId = async (iduser) => {
    try {
        const result = await pool.query(
            `SELECT * FROM recapitulatif WHERE iduser = $1`,
            [iduser]
        );
        return result.rows; // Retourne toutes les estimations de cet utilisateur
    } catch (err) {
        console.error('Erreur dans le modèle getEstimationsByUserId:', err.message);
        throw err; // Propagation de l'erreur
    }
};



module.exports = {
    createPhoto,
    getPhoto,
    removePhoto,
    updatePhotoById,
    createEstimation ,
    getEstimationsByUserId 
};
