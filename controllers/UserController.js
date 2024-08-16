// backend/controllers/UserController.js
const { createAlbum, getAlbums } = require('../models/User');

const addAlbum = async (req, res) => {
  const { idalbum, namealbum } = req.body;
  console.log('Received data:', { idalbum, namealbum });

  try {
    const newAlbum = await createAlbum(idalbum, namealbum);
    console.log('New album added:', newAlbum);
    res.status(201).json(newAlbum);
  } catch (err) {
    console.error('Error adding album:', err.message);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};

const getAllAlbums = async (req, res) => {
  try {
    const albums = await getAlbums();
    res.json(albums);
  } catch (err) {
    console.error('Error fetching albums:', err.message);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
};

module.exports = {
  addAlbum,
  getAllAlbums,
};
