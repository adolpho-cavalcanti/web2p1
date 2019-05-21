const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(function(req,res,next) {
    res.locals = null;
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/auth', (req, res) => {
    res.render('auth');
});

app.get('/file', (req, res) => {
    res.render('file');
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

require('./controllers/authController')(app);
require('./controllers/boxController')(app);
require('./controllers/FileController')(app);

app.listen(process.env.PORT ||3333);