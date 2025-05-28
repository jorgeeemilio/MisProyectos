// routes/proyectosRoutes.js
const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const tareasController = require('../controllers/tareasController');


router.get('/', proyectoController.list);
router.post('/', proyectoController.store);
router.get('/create', proyectoController.create);
router.get('/closed', proyectoController.listClosed);
router.get('/edit/:id', proyectoController.edit);
router.post('/edit/:id', proyectoController.update);
router.get('/delete/:id', proyectoController.delete);
router.get('/:idProyecto/tareas', tareasController.listByProyecto);

module.exports = router;