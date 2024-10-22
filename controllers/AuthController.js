const { createUser, findUserByEmail, getAllUsers, updateUserInDatabase, findUserById, createUserWithPhoto, getContactsByUserId,findContactByEmailAndPin,findOwnerById, } = require('../models/User'); // Importer les fonctions du modèle

const addUser = async (req, res) => {
  const { useremailaddress, userpassword, username, usermiddlename, userlastname, idphone, typeofuser, besttimeforcall } = req.body;
  const userphoto = req.file ? req.file.path : null; // chemin de la photo si elle est téléchargée

  try {
    const newUser = await createUser(useremailaddress, userpassword, username, usermiddlename, userlastname, idphone, typeofuser, besttimeforcall, userphoto);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};

// Fonction pour authentifier un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Tentative de connexion avec:', { email, password });

  try {
      const user = await findUserByEmail(email);
      console.log('Utilisateur trouvé:', user);

      if (!user) {
          console.log('Utilisateur non trouvé pour l\'email:', email);
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      if (user.userpassword !== password) {
          console.log('Mot de passe incorrect pour l\'utilisateur:', user);
          return res.status(401).json({ message: 'Mot de passe incorrect' });
      }

      // Connexion réussie, préparation des données de l'utilisateur
      console.log('Connexion réussie pour l\'utilisateur:', user);
      
      // Convertir userphoto en Base64
      if (Buffer.isBuffer(user.userphoto)) {
          user.userphoto = `data:image/png;base64,${user.userphoto.toString('base64')}`;
      }

      res.status(200).json({ message: 'Connexion réussie!', user });
  } catch (err) {
      console.error('Erreur lors de la connexion:', err.message);
      res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};

  const fetchAllUsers = async (req, res) => {
    try {
      const users = await getAllUsers(); // Utilise la nouvelle fonction du modèle
      res.status(200).json(users); // Retourne les utilisateurs
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err.message);
      res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
  };

  const updateUser = async (req, res) => {
    const { iduser, username, userlastname, usermiddlename, useremailaddress, idphone, typeofuser, besttimeforcall } = req.body;
    const userphoto = req.file ? req.file.buffer : null; // Utilisez .buffer au lieu de .path pour le fichier binaire
    
    try {
      const updated = await updateUserInDatabase({
        iduser,
        userphoto,  // Ceci est maintenant un Buffer pour les fichiers binaires
        username,
        userlastname,
        usermiddlename,
        useremailaddress,
        idphone,
        typeofuser,
        besttimeforcall
      });
  
      if (updated) {
        let updatedUserData = await findUserById(iduser);
        res.status(200).json(updatedUserData);
      } else {
        res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
  };
  



const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
      const user = await findUserById(id);
      console.log('Utilisateur récupéré:', user);
      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      
      // Convertir userphoto en Base64 si c'est un Buffer
      if (Buffer.isBuffer(user.userphoto)) {
          user.userphoto = `data:image/png;base64,${user.userphoto.toString('base64')}`;
      }

      res.status(200).json(user);
  } catch (err) {
      console.error('Erreur lors de la récupération de l’utilisateur:', err.message);
      res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};



// Ajouter un nouvel utilisateur avec photo
const addUserWithPhoto = async (req, res) => {
  const { prenom, nom, email, mpass, relation, iduser } = req.body; // Récupérer les données de la requête
  const photo = req.file ? req.file.buffer : null; // Récupérer le fichier sous forme de buffer

  // Vérifier si une photo a été fournie
  if (!photo) {
    return res.status(400).json({ message: 'Aucune photo fournie' });
  }

  try {
    // Insérer l'utilisateur avec la photo et iduser dans la base de données
    const newUser = await createUserWithPhoto(prenom, nom, email, mpass, relation, iduser, photo);
    res.status(201).json(newUser); // Retourner l'utilisateur ajouté
  } catch (err) {
    console.error('Erreur lors de l’ajout de l’utilisateur:', err.message);
    res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};



const fetchContactsByUser = async (req, res) => {
  const { iduser } = req.params; // Récupère l'iduser depuis les paramètres de la requête
  try {
    const contacts = await getContactsByUserId(iduser); // Appel à la fonction du modèle
    res.status(200).json(contacts); // Retourne les contacts associés à cet iduser
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};

// Fonction pour authentifier un contact d'urgence et récupérer les informations du propriétaire
const authenticateContact = async (req, res) => {
  const { email, nom } = req.body;

  try {
    // Rechercher le contact d'urgence par email et nom
    const contact = await findContactByEmailAndPin(email, nom);

    if (!contact) {
      return res.status(404).json({ message: 'Contact non trouvé ou mauvais PIN' });
    }

    // Rechercher les informations du propriétaire associé au contact
    const owner = await findOwnerById(contact.iduser);

    if (!owner) {
      return res.status(404).json({ message: 'Propriétaire non trouvé' });
    }

    // Renvoyer les informations du contact et du propriétaire
    res.status(200).json({
      message: 'Connexion réussie!',
      contact,
      owner: {
        iduser: owner.id,
        username: owner.username,
        useremail: owner.email,
        userlastname: owner.lastname,
      }
    });
  } catch (err) {
    console.error('Erreur lors de l\'authentification du contact:', err.message);
    res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};

// Exporter les fonctions nécessaires
module.exports = {
  addUser,
  loginUser,
  fetchAllUsers, 
  updateUser,  
  getUserById,
  addUserWithPhoto,
  fetchContactsByUser,
  authenticateContact,
};