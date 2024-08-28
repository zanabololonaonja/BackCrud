const { createPhoto, getPhoto, removePhoto, updatePhotoById } = require('../models/PhotoModel');


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
    try {
        const photos = await getPhoto();  // Fonction qui récupère les photos de la base de données
        
        // Convertir chaque fichier binaire en base64
        const photosWithBase64 = photos.map(photo => {
            return {
                ...photo,
                attachedfile: photo.attachedfile ? photo.attachedfile.toString('base64') : null, // Convertir en base64 si attachedfile existe
            };
        });

        res.json(photosWithBase64);
    } catch (err) {
        console.error('Erreur lors de la récupération des photos:', err.message);
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
  
module.exports = {
    addPhoto,
    getAllPhoto,
    deletePhoto,
    updatePhoto
};
