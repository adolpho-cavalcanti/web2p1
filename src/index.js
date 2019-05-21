const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

require('./controllers/authController')(app);
require('./controllers/boxController')(app);
require('./controllers/FileController')(app);

app.listen(process.env.PORT ||3333);