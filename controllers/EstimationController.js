
// controllers/EstimationController.js

const { createEstimation } = require('../models/EstimationModel'); // Importer la fonction pour créer une estimation

// AJOUT
const addEstimation = async (req, res) => {
    const {
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
    } = req.body;

    console.log('Données reçues:', req.body);

    try {
        const newEstimation = await createEstimation(
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
        );

        console.log('Nouvelle estimation ajoutée:', newEstimation);
        res.status(201).json(newEstimation);
    } catch (err) {
        console.error('Erreur lors de l’ajout de l’estimation:', err.message);
        res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
};

module.exports = { addEstimation };
