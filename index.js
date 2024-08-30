// Back/index.js
const express = require('express');
const app = express();
const router = require('./routes/router');
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(router);
app.listen(process.env.PORT, () => {
    console.log('server running on port 5000');
});
