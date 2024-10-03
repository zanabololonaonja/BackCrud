const pool = require('../config/db'); // Assurez-vous d'importer votre connexion à la base de données

const updateArrangement = async (iduser, updateData) => {
    try {
        const result = await pool.query(
            `UPDATE recapitulatif SET
                typefunerailles = $1,
                lieuceremonie = $2,
                typeceremonie = $3,
                lieudeces = $4,
                transportdistance = $5,
                typevehicule = $6,
                typecercueil = $7,
                typeurne = $8,
                soins_presentation = $9,
                fleurs = $10,
                organisation_ceremonie = $11,
                lieu_repos = $12,
                concession_duree = $13,
                message_personnel = $14
            WHERE iduser = $15 RETURNING *`, 
            [
                updateData.typefunerailles,
                updateData.lieuceremonie,
                updateData.typeceremonie,
                updateData.lieudeces,
                updateData.transportdistance,
                updateData.typevehicule,
                updateData.typecercueil,
                updateData.typeurne,
                updateData.soins_presentation,
                updateData.fleurs,
                updateData.organisation_ceremonie,
                updateData.lieu_repos,
                updateData.concession_duree,
                updateData.message_personnel,
                iduser
            ]
        );

        if (result.rowCount === 0) {
            throw new Error('Aucun arrangement trouvé avec cet ID');
        }

        console.log('Arrangement mis à jour avec succès:', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Erreur dans le modèle updateArrangement:', err.message);
        throw err; 
    }
};

module.exports = {
    updateArrangement,
};
