const { createAlbum, getAlbums } = require('../models/User');

const addAlbum = async (req, res) => {
  const { idalbum, namealbum } = req.body;
  console.log('Données reçues:', { idalbum, namealbum });

  try {
    const newAlbum = await createAlbum(idalbum, namealbum);
    console.log('Nouvel album ajouté:', newAlbum);
    res.status(201).json(newAlbum);
  } catch (err) {
    console.error('Erreur lors de l’ajout de l’album:', err.message);
    res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};

const getAllAlbums = async (req, res) => {
  try {
    const albums = await getAlbums();
    res.json(albums);
  } catch (err) {
    console.error('Erreur lors de la récupération des albums:', err.message);
    res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};

// const addPhoto = async (req, res) => {
//   const { idphoto, idalbum, namephoto } = req.body;
//   const attachedfile = req.file; // Accéder au fichier via multer

//   console.log('Données reçues:', { idphoto, idalbum, namephoto, attachedfile });

//   if (!attachedfile) {
//     return res.status(400).json({ message: 'Aucun fichier téléchargé' });
//   }

//   try {
//     const newPhoto = await createPhoto(idphoto, idalbum, namephoto, attachedfile.buffer);
//     console.log('Nouvelle photo ajoutée:', newPhoto);
//     res.status(201).json(newPhoto);
//   } catch (err) {
//     console.error('Erreur lors de l’ajout de la photo:', err.message);
//     res.status(500).json({ message: 'Erreur serveur', details: err.message });
//   }
// };

module.exports = {
  addAlbum,
  getAllAlbums,

};
