// controllers/usuariosController.js
const Usuario = require('../models/usuariosModel');
const usuariosController = {};

usuariosController.list = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.render('usuarios/index', { usuarios });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los usuarios');
  }
};

usuariosController.create = (req, res) => {
  res.render('usuarios/create');
};

usuariosController.store = (req, res) => {
  const { nombreUsuario } = req.body;
  const banderaUsuario = req.file.filename;

  Usuario.create({ nombreUsuario, banderaUsuario }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al crear el Usuario');
    } else {
      res.redirect('/usuarios');
    }
  });
};

usuariosController.edit = async (req, res) => {
  const { id } = req.params;
  try {
    const Usuario = await Usuario.findById(id);
    res.render('usuarios/edit', { Usuario });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el Usuario');
  }
};

usuariosController.update = (req, res) => {
  const { id } = req.params;
  const { nombreUsuario } = req.body;
  const banderaUsuario = req.file ? req.file.filename : req.body.banderaUsuario;

  Usuario.update(id, { nombreUsuario, banderaUsuario }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al actualizar el Usuario');
    } else {
      res.redirect('/usuarios');
    }
  });
};

usuariosController.delete = (req, res) => {
  const { id } = req.params;

  Usuario.delete(id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al borrar el Usuario');
    } else {
      res.redirect('/usuarios');
    }
  });
};

module.exports = usuariosController;