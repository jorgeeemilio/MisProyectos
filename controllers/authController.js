const usuariosModel = require('../models/usuariosModel');

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = (req, res) => {
  const { nombreUsuario, claveUsuario } = req.body;
  usuariosModel.validateCredentials(
    { body: { nombreUsuario, claveUsuario } },
    {
      status: (code) => ({
        json: (data) => {
          if (code === 200) {
            // Login exitoso, redirige o guarda sesión
            req.session.usuario = data.usuario;
            req.session.usuarioId = data.usuario.idUsuario; // o el nombre de tu campo de id
            console.log('Usuario logueado:', req.session.usuario.idUsuario);
            return res.redirect('/proyectos'); // Cambia la ruta según tu app
          } else {
            // Error de login
            return res.render('login', { error: data.message });
          }
        },
      }),
    }
  );
};