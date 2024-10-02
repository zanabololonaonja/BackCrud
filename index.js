const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const router = require('./routes/router'); // Vos routes sont déjà bien définies
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' })); // Ajustez la limite selon vos besoins

// Utilisez les routes définies dans votre routeur
app.use(router);

app.listen(process.env.PORT || 5000, () => {
    console.log('server running on port 5000');
});
