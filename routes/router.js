// Back/routes/router.js
const express = require('express');
const { addAlbum, getAllAlbums } = require('../controllers/UserController');

const router = express.Router();

router.post('/api/albums', addAlbum);
router.get('/api/albums', getAllAlbums);

module.exports = router;
