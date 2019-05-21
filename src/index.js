const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

require('./controllers/authController')(app);
require('./controllers/boxController')(app);
require('./controllers/FileController')(app);

app.listen(process.env.PORT ||3333);