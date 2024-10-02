const { createPhoto, getPhoto, removePhoto, updatePhotoById,createEstimation,getEstimationsByUserId  } = require('../models/PhotoModel');


// AJOUT
const addPhoto = async (req, res) => {
    const { idphoto, idalbum, namephoto } = req.body;
    const attachedfile = req.file; // Accéder au fichier via multer
  
    console.log('Données reçues:', { idphoto, idalbum, namephoto, attachedfile });
  
    if (!attachedfile) {
        return res.status(400).json({ message: 'Aucun fichier téléchargé' });
    }
  
    try {
        const newPhoto = await createPhoto(idphoto, idalbum, namephoto, attachedfile.buffer);
        console.log('Nouvelle photo ajoutée:', newPhoto);
        res.status(201).json(newPhoto);
    } catch (err) {
        console.error('Erreur lors de l’ajout de la photo:', err.message);
        res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
};


// AFFICHE
const getAllPhoto = async (req, res) => {
  const { idalbum } = req.query; // Récupère l'idalbum depuis les query params s'il est fourni

  try {
    console.log(`Fetching photos${idalbum ? ` for album ID: ${idalbum}` : ''}`); // Console log pour vérifier l'idalbum

    // Si idalbum est présent, récupérer uniquement les photos associées, sinon récupérer toutes les photos
    const photos = await getPhoto(idalbum); // Modification de la fonction getPhoto pour accepter un paramètre idalbum
    console.log('Photos fetched from the database:', photos); // Affiche les photos récupérées avant conversion

    // Convertir chaque fichier binaire en base64
    const photosWithBase64 = photos.map((photo) => {
      const base64File = photo.attachedfile ? photo.attachedfile.toString('base64') : null;
      console.log(`Photo ID: ${photo.idphoto} converted to base64: ${!!base64File}`); // Log de la conversion en base64
      return {
        ...photo,
        attachedfile: base64File,
      };
    });

    console.log('Returning photos with base64 conversion:', photosWithBase64); // Log des photos après conversion
    res.json(photosWithBase64);
  } catch (err) {
    console.error('Erreur lors de la récupération des photos:', err.message); // Affiche l'erreur en cas de problème
    res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};
// supprimer
const deletePhoto = async (req, res) => {
    const { idphoto } = req.params;

    try {
        const result = await removePhoto(idphoto);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Photo non trouvée' });
        }

        res.status(200).json({ message: 'Photo supprimée avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression de la photo:', err.message);
        res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
};


// MODIFIER
const updatePhoto = async (req, res) => {
    const { id } = req.params;
    const { idalbum, namephoto } = req.body;
    const attachedfile = req.file ? req.file.buffer : null;
  
    try {
      const updatedPhoto = await updatePhotoById(id, idalbum, namephoto, attachedfile);
      if (updatedPhoto) {
        res.status(200).json(updatedPhoto);
      } else {
        res.status(404).json({ message: 'Photo not found' });
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour de la photo:', err.message);
      res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
  };


  const addEstimation = async (req, res) => {
    const {
        iduser, 
        typefunerailles, 
        lieuCeremonie, 
        typeCeremonie, 
        lieuDeces, 
        transportDistance, 
        typeVehicule, 
        typeCercueil, 
        typeUrne, 
        soinsPresentation, 
        fleurs, 
        organisation_ceremonie, 
        lieuRepos, 
        concessionDuree, 
        messagePersonnel
    } = req.body;

    console.log('Données reçues dans addEstimation:', req.body);

    try {
        const newEstimation = await createEstimation(
            iduser,
            typefunerailles, // Utilisez le bon nom ici
            lieuCeremonie,
            typeCeremonie,
            lieuDeces,
            transportDistance,
            typeVehicule,
            typeCercueil,
            typeUrne,
            soinsPresentation,
            fleurs,
            organisation_ceremonie, // Si nécessaire
            lieuRepos,
            concessionDuree,
            messagePersonnel
        );

        console.log('Nouvelle estimation ajoutée:', newEstimation);
        res.status(201).json(newEstimation);
    } catch (err) {
        console.error('Erreur lors de l’ajout de l’estimation:', err.message);
        res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
};


const getEstimations = async (req, res) => {
  const { iduser } = req.params; // Assurez-vous d'utiliser un paramètre d'URL pour l'iduser
  console.log(`Récupération des estimations pour l'iduser: ${iduser}`);

  try {
      const estimations = await getEstimationsByUserId(iduser);
      console.log('Estimations récupérées:', estimations);
     
      res.status(200).json(estimations);
  } catch (err) {
      console.error('Erreur lors de la récupération des estimations:', err.message);
      res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};

module.exports = {
    addPhoto,
    getAllPhoto,
    deletePhoto,
    updatePhoto,
    addEstimation,
    getEstimations
};
