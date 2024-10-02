const pool = require('../config/db'); // Importez la connexion à la base de données

const generateAlbumId = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM album'); // Compte le nombre d'albums existants
  const count = parseInt(result.rows[0].count, 10);
  return String(count + 1).padStart(3, '0'); // Remplit à gauche pour obtenir une chaîne de 3 caractères
};

// Fonction pour créer un album
async function createAlbum(albumData) {
  const { namealbum, iduser } = albumData; // Ne pas inclure idalbum

  if (!namealbum || !iduser) {
    throw new Error('namealbum et iduser sont requis.');
  }

  const idalbum = await generateAlbumId(); // Générez l'ID de l'album

  // Insertion dans la base de données
  const result = await pool.query(
    'INSERT INTO album (idalbum, namealbum, iduser) VALUES ($1, $2, $3) RETURNING *',
    [idalbum, namealbum, iduser] // Inclure idalbum ici
  );

  return result.rows[0]; // Retourner le nouvel album créé
}

// Nouvelle fonction pour récupérer les albums par utilisateur
const getAlbumsByUser = async (iduser) => {
  try {
    const result = await pool.query('SELECT * FROM album WHERE iduser = $1', [iduser]); // Filtrer par iduser
    return result.rows;
  } catch (err) {
    console.error('Erreur dans le modèle getAlbums:', err.message);
    throw err;
  }
};

const createUser = async (useremailaddress, userpassword, username, usermiddlename, userlastname, idphone, typeofuser, besttimeforcall) => {
  try {
    const result = await pool.query(
      'INSERT INTO public.users (useremailaddress, userpassword, username, usermiddlename, userlastname, idphone, typeofuser, besttimeforcall) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [useremailaddress, userpassword, username, usermiddlename, userlastname, idphone, typeofuser, besttimeforcall]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erreur dans le modèle createUser:', err.message);
    throw err;
  }
};

// Nouvelle fonction pour trouver un utilisateur par email
const findUserByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM public.users WHERE useremailaddress = $1', [email]);
    return result.rows[0];
  } catch (err) {
    console.error('Erreur dans le modèle findUserByEmail:', err.message);
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM public.users');
    return result.rows; // Retourne tous les utilisateurs
  } catch (err) {
    console.error('Erreur dans le modèle getAllUsers:', err.message);
    throw err;
  }
};

const updateUserInDatabase = async (data) => {
  const { iduser, username, userlastname, usermiddlename, useremailaddress, idphone, typeofuser, besttimeforcall, userphoto } = data;

  const query = `
      UPDATE public.users
      SET 
          username = $1,
          userlastname = $2,
          usermiddlename = $3,
          useremailaddress = $4,
          idphone = $5,
          typeofuser = $6,
          besttimeforcall = $7,
          userphoto = $8
      WHERE iduser = $9
  `;

  const values = [
      username,
      userlastname,
      usermiddlename,
      useremailaddress,
      idphone,
      typeofuser,
      besttimeforcall,
      userphoto,  // Ceci est un Buffer binaire pour la photo
      iduser
  ];

  try {
      const result = await pool.query(query, values);
      return result.rowCount > 0;
  } catch (err) {
      console.error("Erreur dans le modèle updateUserInDatabase:", err);
      throw new Error("Erreur lors de la mise à jour de l'utilisateur");
  }
};

const findUserById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM public.users WHERE iduser = $1', [id]);
    const user = result.rows[0];

    // Conversion de la photo au format base64 si elle est sous forme de Buffer
    if (user && user.userphoto && Buffer.isBuffer(user.userphoto)) {
      user.userphoto = `data:image/png;base64,${user.userphoto.toString('base64')}`;
    }

    return user;
  } catch (err) {
    console.error('Erreur dans le modèle findUserById:', err.message);
    throw err;
  }
};

module.exports = {
  createAlbum,
  getAlbumsByUser,
  createUser,
  findUserByEmail,
  getAllUsers,
  updateUserInDatabase,
  findUserById, // Nom de fonction modifié pour éviter les collisions
};
