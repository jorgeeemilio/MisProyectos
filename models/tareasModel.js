// models/TareasModel.js
const db = require('../config/database');
const Tarea = {};

Tarea.findByProyecto = (idProyecto) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT idTarea, descripcionTarea, DATE_FORMAT(fechaTarea, "%d/%m/%Y") AS fechaTarea, horaTarea, imagenTarea, correoTarea, urlTarea, audioTarea, prioridadProyecto, idProyectoFK FROM tareas WHERE idProyectoFK = ? ORDER BY fechaTarea',
      [idProyecto],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

Tarea.create = (idProyecto, tarea, callback) => {
  const {
    descripcionTarea,
    fechaTarea,
    horaTarea,
    imagenTarea,
    correoTarea,
    urlTarea,
    audioTarea,
    prioridadTarea
  } = tarea;

  db.query(
    `INSERT INTO tareas 
      (descripcionTarea, fechaTarea, horaTarea, imagenTarea, correoTarea, urlTarea, audioTarea, prioridadProyecto, idProyectoFK)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      descripcionTarea,
      fechaTarea,
      horaTarea,
      imagenTarea,
      correoTarea,
      urlTarea,
      audioTarea,
      prioridadTarea,
      idProyecto
    ],
    callback
  );
};

// Buscar una tarea por su ID
Tarea.findById = (idTarea) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM tareas WHERE idTarea = ?',
      [idTarea],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

// Actualizar una tarea
Tarea.update = (idTarea, tarea, callback) => {
  const {
    descripcionTarea,
    fechaTarea,
    horaTarea,
    imagenTarea,
    correoTarea,
    urlTarea,
    audioTarea,
    prioridadTarea
  } = tarea;

  db.query(
    `UPDATE tareas SET 
      descripcionTarea = ?, 
      fechaTarea = ?, 
      horaTarea = ?, 
      imagenTarea = ?, 
      correoTarea = ?, 
      urlTarea = ?, 
      audioTarea = ?, 
      prioridadProyecto = ?
    WHERE idTarea = ?`,
    [
      descripcionTarea,
      fechaTarea,
      horaTarea,
      imagenTarea,
      correoTarea,
      urlTarea,
      audioTarea,
      prioridadTarea,
      idTarea
    ],
    callback
  );
};

Tarea.delete = (idTarea, callback) => {
  db.query(
    'DELETE FROM tareas WHERE idTarea = ?',
    [idTarea],
    callback
  );
};

module.exports = Tarea;