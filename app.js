// app.js
const express = require('express');
const exphbs = require('express-handlebars');
const multer = require('multer');
const path = require('path');
const session = require('express-session');

const app = express();

// Configura express-handlebars
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configura multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'audioTarea') {
      cb(null, path.join(__dirname, 'public/audios'));
    } else if (file.fieldname === 'imagenTarea') {
      cb(null, path.join(__dirname, 'public/images'));
    } else {
      cb(null, path.join(__dirname, 'public/uploads'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.use(session({
  secret: 'tu_secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
}));

// Exporta app y upload para que puedan ser utilizados en otros archivos
module.exports = { app, upload };