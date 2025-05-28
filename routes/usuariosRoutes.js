// routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { upload } = require('../app');

router.get('/', usuariosController.list);
router.get('/create', usuariosController.create);
//router.post('/', upload.single('banderaIdioma'), usuariosController.store);
router.get('/edit/:id', usuariosController.edit);
//router.post('/edit/:id', upload.single('banderaIdioma'), usuariosController.update);
router.get('/delete/:id', usuariosController.delete);

module.exports = router;