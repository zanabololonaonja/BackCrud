// controllers/UserController.js
const { createAlbum, getAlbumsByUser } = require('../models/User'); // Assurez-vous que le chemin est correct

// Ajouter un nouvel album
const addAlbum = async (req, res) => {
  const albumData = {
    namealbum: req.body.namealbum,
    iduser: req.body.iduser || req.user.id, // Si iduser est passé dans la requête ou via le token/session
  };

  try {
    const newAlbum = await createAlbum(albumData);
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
};


// Récupérer les albums par utilisateur
const getAllAlbums = async (req, res) => {
  const userId = req.query.userId;

  try {
    const albums = await getAlbumsByUser(userId);
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', details: error.message });
  }
};

module.exports = {
  addAlbum,
  getAllAlbums,
  // Ajoutez d'autres exportations si nécessaire
};
