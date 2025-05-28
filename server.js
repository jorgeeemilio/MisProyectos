// server.js
const { app } = require('./app');
const usuariosRoutes = require('./routes/usuariosRoutes');
const authRoutes = require('./routes/authRoutes');
const proyectosRoutes = require('./routes/proyectosRoutes');
const tareasRoutes = require('./routes/tareasRoutes');
const requireLogin = require('./middlewares/authMiddleware');

app.use('/', authRoutes);
app.use('/usuarios', requireLogin, usuariosRoutes);
app.use('/proyectos', requireLogin, proyectosRoutes);
app.use('/tareas', requireLogin, tareasRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});