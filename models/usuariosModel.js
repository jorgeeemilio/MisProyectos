const db = require('../config/database');
const Usuario = {};
// Obtener todos los usuarios
Usuario.getAll = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};
// Obtener un usuario por ID
Usuario.getById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(results[0]);
  });
};
// Crear un nuevo usuario
Usuario.create = (req, res) => {
  const { nombre, email, password } = req.body;
  db.query('INSERT INTO usuarios (nombreUsuario, claveUsuario, tipoUsuario) VALUES (?, ?, ?)', [nombre, clave, tipo], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, nombre, email });
  });
};
// Actualizar un usuario
Usuario.update = (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;
  db.query('UPDATE usuarios SET nombreUsuario = ?, claveUsuario = ?, tipoUsuario = ? WHERE idUsuario = ?', [nombre, clave, tipo, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ id, nombre, email });
  });
};
// Eliminar un usuario
Usuario.delete = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE idUsuario = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(204).send();
  });
};
// Validar credenciales de usuario
Usuario.validateCredentials = (req, res) => {
  const { nombreUsuario, claveUsuario } = req.body;
  db.query(
    'SELECT * FROM usuarios WHERE nombreUsuario = ? AND claveUsuario = MD5(?)',
    [nombreUsuario, claveUsuario],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
      res.status(200).json({ message: 'Credenciales válidas', usuario: results[0]});
    }
  );
};
// Exportar el modelo de usuario
module.exports = Usuario;