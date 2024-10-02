

// models/EstimationModel.js

const pool = require('../config/db'); // Assurez-vous que cela pointe vers votre configuration de base de données

// AJOUT
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
        return result.rows[0];
    } catch (err) {
        console.error('Erreur dans le modèle createEstimation:', err.message);
        throw err;
    }
};

module.exports = { createEstimation };
