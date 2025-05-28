// controllers/proyectoController.js
const Proyecto = require('../models/proyectoModel');
const proyectoController = {};

function formatDateToInput(fecha) {
  if (!fecha) return '';
  // Si es un objeto Date, conviértelo a yyyy-mm-dd
  if (fecha instanceof Date) {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  // Si ya está en formato yyyy-mm-dd, retorna igual
  if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
  // Si está en formato dd/mm/yyyy, conviértelo
  if (typeof fecha === 'string') {
    const parts = fecha.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return fecha;
  }
  return '';
}

proyectoController.list = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.render('proyectos/index', { proyectos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los proyectos');
  }
};

proyectoController.listClosed = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAllClosed();
    res.render('proyectos/closed', { proyectos });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los proyectos');
  }
};

proyectoController.create = (req, res) => {
  res.render('proyectos/create');
};

proyectoController.store = (req, res) => {
  const { nombreProyecto, prioridadProyecto } = req.body;
  const usuarioId = req.session.usuarioId; // Obtén el id del usuario logueado

  if (!usuarioId) {
    return res.status(401).send('No autorizado');
  }

  Proyecto.create({ nombreProyecto, prioridadProyecto, usuarioId }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al crear el Proyecto');
    } else {
      res.redirect('/proyectos');
    }
  });
};

proyectoController.edit = async (req, res) => {
  const { id } = req.params;
  try {
    const proyecto = await Proyecto.findById(id); // Cambia aquí
    // En tu controlador antes de renderizar
    proyecto.isBaja = proyecto.prioridadProyecto == 1;
    proyecto.isMedia = proyecto.prioridadProyecto == 2;
    proyecto.isAlta = proyecto.prioridadProyecto == 3;
    proyecto.fechaProyecto = formatDateToInput(proyecto.fechaProyecto);
    proyecto.fechaFinProyecto = formatDateToInput(proyecto.fechaFinProyecto);
    res.render('proyectos/edit', { proyecto }); // Si tu vista espera "Proyecto"
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el Proyecto');
  }
};

proyectoController.update = (req, res) => {
  const { id } = req.params;
  const { nombreProyecto } = req.body;
  const { fechaProyecto } = req.body;
  const { prioridadProyecto } = req.body;
  const { fechaFinProyecto } = req.body;


  Proyecto.update(req.params.id, req.body, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al actualizar el Proyecto');
    } else {
      res.redirect('/proyectos');
    }
  });
};

proyectoController.delete = (req, res) => {
  const { id } = req.params;

  Proyecto.delete(id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al borrar el Proyecto');
    } else {
      res.redirect('/proyectos');
    }
  });
};

module.exports = proyectoController;