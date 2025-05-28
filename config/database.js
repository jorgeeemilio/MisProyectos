// config/database.js  
const mysql = require('mysql2');  
const connection = mysql.createConnection({  
  host: 'localhost',  
  user: 'proyectos',  
  password: 'Studium2025;',  
  database: 'proyectos'  
});  
connection.connect();  
module.exports = connection;  