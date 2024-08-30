

const express = require('express');
const upload = require('../middleware/multer');
const { addAlbum, getAllAlbums } = require('../controllers/UserController');
const { addPhoto, getAllPhoto, deletePhoto, updatePhoto } = require('../controllers/PhotosController');

const { addUser } = require('../controllers/AuthController'); // Importer les contrôleurs pour l'authentification
const router = express.Router();


router.post('/api/albums', addAlbum); //ajout album
router.get('/api/albums', getAllAlbums);

router.post('/api/photos', upload.single('attachedfile'), addPhoto); //ajout photo
router.get('/api/photos', getAllPhoto);   //affichage photos
router.delete('/api/photos/:idphoto', deletePhoto);  //suppression des photos
router.put('/api/photos/:id', upload.single('attachedfile'), updatePhoto);  // modification photo


router.post('/api/register', addUser); // ajout user 

module.exports = router;