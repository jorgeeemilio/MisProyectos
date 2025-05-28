// routes/usuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { upload } = require('../app');

router.get('/', usuariosController.list);
router.get('/create', usuariosController.create);
router.get('/edit/:id', usuariosController.edit);
router.get('/delete/:id', usuariosController.delete);

module.exports = router;