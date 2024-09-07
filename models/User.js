const pool = require('../config/db');

const createAlbum = async (idalbum, namealbum) => {
  try {
    const result = await pool.query(
      'INSERT INTO album (idalbum, namealbum) VALUES ($1, $2) RETURNING *',
      [idalbum, namealbum]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erreur dans le modèle createAlbum:', err.message);
    throw err;
  }
};

const getAlbums = async () => {
  try {
    const result = await pool.query('SELECT * FROM album');
    return result.rows;
  } catch (err) {
    console.error('Erreur dans le modèle getAlbums:', err.message);
    throw err;
  }
};



const createUser = async (useremailaddress, userpassword, username, usermiddlename, userlastname) => {
  try {
    const result = await pool.query(
      'INSERT INTO public.users (useremailaddress, userpassword, username, usermiddlename, userlastname) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [useremailaddress, userpassword, username, usermiddlename, userlastname]
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




module.exports = {
  createAlbum ,
  getAlbums,
  createUser,
  findUserByEmail,

};
