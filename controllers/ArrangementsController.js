const db = require('../models/ArrangementsModels'); // Importez votre modèle de mise à jour

// Fonction pour mettre à jour un arrangement
const updateArrangementById = async (req, res) => {
    const { iduser, ...updateData } = req.body; // Assurez-vous que 'id' est passé dans le corps de la requête

    try {
        // Mettre à jour l'arrangement par ID
        const updatedArrangement = await db.updateArrangement(iduser, updateData);

        res.status(200).json({ message: 'Mise à jour réussie', updatedArrangement });
    } catch (error) {
        console.error('Erreur lors de la mise à jour des arrangements:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour des arrangements', error });
    }
};

module.exports = {
    updateArrangementById, // Exportez la fonction avec le nouveau nom
};
