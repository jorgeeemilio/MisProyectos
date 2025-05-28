// models/ProyectoModel.js
const db = require('../config/database');
const Proyecto = {};

Proyecto.findAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT idProyecto, nombreProyecto, DATE_FORMAT(fechaProyecto, "%d/%m/%Y") AS fechaProyecto, DATE_FORMAT(fechaFinProyecto, "%d/%m/%Y") AS fechaFinProyecto, prioridadProyecto FROM proyectos WHERE fechaFinProyecto IS NULL ORDER BY fechaProyecto, nombreProyecto', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

Proyecto.findAllClosed = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT idProyecto, nombreProyecto, DATE_FORMAT(fechaProyecto, "%d/%m/%Y") AS fechaProyecto, DATE_FORMAT(fechaFinProyecto, "%d/%m/%Y") AS fechaFinProyecto, prioridadProyecto FROM proyectos WHERE fechaFinProyecto IS NOT NULL ORDER BY fechaProyecto, nombreProyecto', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

Proyecto.findById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM proyectos WHERE idProyecto = ?', [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

Proyecto.create = (proyecto, callback) => {
  const { nombreProyecto, prioridadProyecto, usuarioId } = proyecto;
  db.query(
    'INSERT INTO proyectos (nombreProyecto, fechaProyecto, prioridadProyecto, idUsuarioFK) VALUES (?, CURDATE(), ?, ?)', 
    [nombreProyecto, prioridadProyecto, usuarioId],
    callback
  );
};

Proyecto.update = (id, proyecto, callback) => {
  const { nombreProyecto, fechaProyecto, prioridadProyecto, fechaFinProyecto } = proyecto;
  if (!fechaFinProyecto) {
    db.query(
      'UPDATE proyectos SET nombreProyecto = ?, fechaProyecto = ?, prioridadProyecto = ? WHERE idProyecto = ?',
      [nombreProyecto, fechaProyecto, prioridadProyecto, id],
      callback
    );
  } else {
    db.query(
      'UPDATE proyectos SET nombreProyecto = ?, fechaProyecto = ?, prioridadProyecto = ?, fechaFinProyecto = ? WHERE idProyecto = ?',
      [nombreProyecto, fechaProyecto, prioridadProyecto, fechaFinProyecto, id],
      callback
    );
  }
};

Proyecto.delete = (id, callback) => {
  db.query('DELETE FROM Proyectos WHERE idProyecto = ?', [id], callback);
};

module.exports = Proyecto;