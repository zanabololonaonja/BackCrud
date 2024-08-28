const multer = require('multer');

// Définir les options de stockage
const storage = multer.memoryStorage(); // Stocker le fichier en mémoire

// Initialiser Multer avec les options de stockage
const upload = multer({ storage });

module.exports = upload;
