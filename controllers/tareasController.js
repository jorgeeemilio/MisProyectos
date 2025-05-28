const Tarea = require('../models/tareasModel');

const tareasController = {};

tareasController.list = async (req, res) => {
  // Ejemplo: lista todas las tareas
  const tareas = await Tarea.findByProyecto(req.query.idProyecto || 1);
  res.render('tareas/index', { tareas });
};

tareasController.create = (req, res) => {
  const { idProyecto, nombreProyecto } = req.params;
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const dd = String(hoy.getDate()).padStart(2, '0');
  const fechaHoy = `${yyyy}-${mm}-${dd}`;
  res.render('tareas/create', { idProyecto, nombreProyecto, fechaHoy });
};

tareasController.store = (req, res) => {
  const { idProyecto, nombreProyecto } = req.params;

  // Si usas multer con upload.fields, los archivos estarán en req.files
  let imagenTarea = null;
  let audioTarea = null;
  if (req.files) {
    if (req.files.imagenTarea && req.files.imagenTarea[0]) {
      imagenTarea = req.files.imagenTarea[0].filename;
    }
    if (req.files.audioTarea && req.files.audioTarea[0]) {
      audioTarea = req.files.audioTarea[0].filename;
    }
  } else {
    // Si usas upload.single, los archivos estarán en req.file
    imagenTarea = req.file && req.file.fieldname === 'imagenTarea' ? req.file.filename : null;
    audioTarea = req.file && req.file.fieldname === 'audioTarea' ? req.file.filename : null;
  }

  const tarea = {
    descripcionTarea: req.body.descripcionTarea,
    fechaTarea: req.body.fechaTarea,
    horaTarea: req.body.horaTarea,
    imagenTarea,
    correoTarea: req.body.correoTarea,
    urlTarea: req.body.urlTarea,
    audioTarea,
    prioridadTarea: req.body.prioridadTarea
  };

  Tarea.create(idProyecto, tarea, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al guardar la tarea');
    }
    res.redirect(`/tareas/${idProyecto}/${nombreProyecto}`);
  });
};

// Mostrar formulario de edición
tareasController.edit = async (req, res) => {
  const { idTarea, idProyecto, nombreProyecto } = req.params;
  try {
    // Busca la tarea por su ID
    const tarea = await Tarea.findById(idTarea);
    // Marca la prioridad para el select
    tarea.isBaja = tarea.prioridadTarea == 1;
    tarea.isMedia = tarea.prioridadTarea == 2;
    tarea.isAlta = tarea.prioridadTarea == 3;
    // Convierte la fecha a yyyy-mm-dd si es necesario
    if (tarea.fechaTarea) {
      if (typeof tarea.fechaTarea === 'string' && tarea.fechaTarea.includes('/')) {
        const [dd, mm, yyyy] = tarea.fechaTarea.split('/');
        tarea.fechaTarea = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
      } else if (tarea.fechaTarea instanceof Date) {
        const yyyy = tarea.fechaTarea.getFullYear();
        const mm = String(tarea.fechaTarea.getMonth() + 1).padStart(2, '0');
        const dd = String(tarea.fechaTarea.getDate()).padStart(2, '0');
        tarea.fechaTarea = `${yyyy}-${mm}-${dd}`;
      }
    }
    res.render('tareas/edit', { tarea, idProyecto, nombreProyecto });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar la tarea');
  }
};

// Guardar cambios de la tarea editada
tareasController.update = (req, res) => {
  const { idTarea, idProyecto, nombreProyecto } = req.params;
  let imagenTarea = req.body.imagenTareaActual || null;
  let audioTarea = req.body.audioTareaActual || null;

  // Si hay archivos nuevos, los reemplazamos
  if (req.files) {
    if (req.files.imagenTarea && req.files.imagenTarea[0]) {
      imagenTarea = req.files.imagenTarea[0].filename;
    }
    if (req.files.audioTarea && req.files.audioTarea[0]) {
      audioTarea = req.files.audioTarea[0].filename;
    }
  }

  const tarea = {
    descripcionTarea: req.body.descripcionTarea,
    fechaTarea: req.body.fechaTarea,
    horaTarea: req.body.horaTarea,
    imagenTarea,
    correoTarea: req.body.correoTarea,
    urlTarea: req.body.urlTarea,
    audioTarea,
    prioridadTarea: req.body.prioridadTarea
  };

  Tarea.update(idTarea, tarea, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar la tarea');
    }
    res.redirect(`/tareas/${idProyecto}/${nombreProyecto}`);
  });
};

tareasController.delete = (req, res) => {
  const { idTarea, idProyecto, nombreProyecto } = req.params;
  Tarea.delete(idTarea, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al borrar la tarea');
    }
    res.redirect(`/tareas/${idProyecto}/${nombreProyecto}`);
  });
};

tareasController.listByProyecto = async (req, res) => {
  const { idProyecto, nombreProyecto } = req.params;
  const tareas = await require('../models/tareasModel').findByProyecto(idProyecto);
  res.render('tareas/index', { tareas, idProyecto, nombreProyecto });
};

module.exports = tareasController;