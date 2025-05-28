// routes/tareasRoutes.js
const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const { upload } = require('../app');

// Formulario para nueva tarea
router.get('/create/:idProyecto/:nombreProyecto', tareasController.create);

// Guardar nueva tarea
// Si usas archivos, usa: router.post('/create/:idProyecto', upload.fields([{ name: 'imagenTarea' }, { name: 'audioTarea' }]), tareasController.store);
router.post(
  '/create/:idProyecto/:nombreProyecto',
  upload.fields([
    { name: 'imagenTarea', maxCount: 1 },
    { name: 'audioTarea', maxCount: 1 }
  ]),
  tareasController.store
);

// Listar tareas por proyecto
router.get('/:idProyecto/:nombreProyecto', tareasController.listByProyecto);

// Borrar tarea (incluye id de la tarea y nombre del proyecto)
router.get('/delete/:idTarea/:idProyecto/:nombreProyecto', tareasController.delete);

// Mostrar formulario de edición
router.get('/edit/:idTarea/:idProyecto/:nombreProyecto', tareasController.edit);

// Guardar cambios de la tarea editada (usa multer si hay archivos)
router.post(
  '/edit/:idTarea/:idProyecto/:nombreProyecto',
  upload.fields([
    { name: 'imagenTarea', maxCount: 1 },
    { name: 'audioTarea', maxCount: 1 }
  ]),
  tareasController.update
);

module.exports = router;