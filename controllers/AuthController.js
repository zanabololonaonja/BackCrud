const { createUser } = require('../models/User');

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


module.exports = {
  addUser,

};
