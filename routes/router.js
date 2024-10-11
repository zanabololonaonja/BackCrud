const express = require('express');
const upload = require('../middleware/multer'); // Importer le middleware multer
const { addAlbum, getAllAlbums } = require('../controllers/UserController');
const { addPhoto, getAllPhoto, deletePhoto, updatePhoto,  addEstimation,getEstimations,addTestament, getTestaments  } = require('../controllers/PhotosController');
const { addUser, loginUser, fetchAllUsers, updateUser, getUserById,addUserWithPhoto } = require('../controllers/AuthController'); // Importer les contrôleurs pour l'authentification
const { updateArrangementById } = require('../controllers/ArrangementsController'); // Importer le contrôleur d'arrangements


const router = express.Router();

router.post('/api/contact', upload.single('photo'), addUserWithPhoto); // Route pour ajouter un utilisateur




// Route pour mettre à jour les arrangements
router.put('/api/updatearrangements', updateArrangementById);  


// Route pour ajouter un testament
router.post('/api/testamentsadd', addTestament);

// Route pour récupérer les testaments d'un utilisateur
router.get('/api/testaments/:iduser', getTestaments);

// Routes pour albums
router.post('/api/albums', addAlbum); // Ajout album
router.get('/api/albums', getAllAlbums); // Affichage des albums

// Routes pour utilisateurs
router.get('/users', fetchAllUsers); // Afficher tous les utilisateurs
router.post('/api/register', addUser); // Ajout utilisateur
router.post('/api/login', loginUser); // Connexion utilisateur

// Nouvelle route pour mettre à jour un utilisateur avec upload de photo
router.put('/api/update', upload.single('userphoto'), updateUser); // Mettre à jour utilisateur avec photo

// Routes pour photos
router.post('/api/photos', upload.single('attachedfile'), addPhoto); // Ajout photo
router.get('/api/photos', getAllPhoto); // Affichage photos
router.delete('/api/photos/:idphoto', deletePhoto); // Suppression des photos
router.put('/api/photos/:id', upload.single('attachedfile'), updatePhoto); // Modification photo


// Route pour ajouter une estimation
router.post('/api/estimation', addEstimation); // Ajout estimation
router.get('/api/recapitulatif/:iduser', getEstimations);  // Modification ici


// Route pour récupérer un utilisateur par ID
router.get('/getUser/:id', getUserById);




module.exports = router;
