const { createUser, findUserByEmail } = require('../models/User');

const addUser = async (req, res) => {
  const { useremailaddress, userpassword, username, usermiddlename, userlastname } = req.body;
  console.log('Données reçues:', { useremailaddress, userpassword, username, usermiddlename, userlastname });

  try {
    const newUser = await createUser(useremailaddress, userpassword, username, usermiddlename, userlastname);
    console.log('Nouvel utilisateur ajouté:', newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Erreur lors de l’ajout de l’utilisateur:', err.message);
    res.status(500).json({ message: 'Erreur serveur', details: err.message });
  }
};

// Fonction pour authentifier un utilisateur
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Tentative de connexion avec:', { email, password });
  
    try {
      // Recherche de l'utilisateur par email
      const user = await findUserByEmail(email);
      console.log('Utilisateur trouvé:', user);
  
      if (!user) {
        console.log('Utilisateur non trouvé pour l\'email:', email);
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Vérification du mot de passe
      if (user.userpassword !== password) {
        console.log('Mot de passe incorrect pour l\'utilisateur:', user);
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }
  
      // Connexion réussie
      console.log('Connexion réussie pour l\'utilisateur:', user);
      res.status(200).json({ message: 'Connexion réussie!', user });
    } catch (err) {
      console.error('Erreur lors de la connexion:', err.message);
      res.status(500).json({ message: 'Erreur serveur', details: err.message });
    }
  };
  
  module.exports = {
    addUser,
    loginUser,
  };