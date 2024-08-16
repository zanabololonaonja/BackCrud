const { Pool } = require('pg');
require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false // En fonction de votre configuration SSL
  }
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL', err.stack);
  } else {
    console.log('Connected to PostgreSQL successfully');
  }
});

module.exports = pool;





// const { Pool } = require('pg');

// const pool = new Pool({
//   host: 'localhost',
//   user: 'postgres',
//   password: 'onja',
//   database: 'mlr1',
//   port: 5432,
// });

// pool.connect((err) => {
//   if (err) {
//     console.error('Error connecting to PostgreSQL', err.stack);
//   } else {
//     console.log('Connected to PostgreSQL successfully');
//   }
// });

// module.exports = pool;

