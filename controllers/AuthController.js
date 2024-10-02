const { createUser, findUserByEmail, getAllUsers, updateUserInDatabase ,findUserById  } = require('../models/User');

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


  module.exports = {
    addUser,
    loginUser,
    fetchAllUsers, 
    updateUser,  
    getUserById,
  };