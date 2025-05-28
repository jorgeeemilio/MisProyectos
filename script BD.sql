CREATE DATABASE proyectos CHARSET utf8mb4 COLLATE utf8mb4_spanish2_ci;
USE proyectos;
CREATE TABLE usuarios (
    idUsuario INT AUTO_INCREMENT,
    nombreUsuario VARCHAR(45),
    claveUsuario VARCHAR(255),
    tipoUsuario TINYINT,
    PRIMARY KEY(idUsuario)
);
CREATE TABLE proyectos (
    idProyecto INT AUTO_INCREMENT,
    nombreProyecto VARCHAR(45),
    fechaProyecto DATE,
    fechaFinProyecto DATE,
    prioridadProyecto INT,
    idUsuarioFK INT,
    PRIMARY KEY (idProyecto),
    FOREIGN KEY (idUsuarioFK)
        REFERENCES usuarios (idUsuario)
);
CREATE TABLE tareas (
    idTarea INT AUTO_INCREMENT,
    descripcionTarea VARCHAR(45),
    fechaTarea DATE,
    horaTarea DATE,
    imagenTarea VARCHAR(100),
    correoTarea VARCHAR(100), 
    urlTarea VARCHAR(100), 
    audioTarea VARCHAR(100), 
    prioridadProyecto INT,
    idProyectoFK INT,
    PRIMARY KEY (idTarea),
    FOREIGN KEY (idProyectoFK)
        REFERENCES proyectos (idProyecto)
);

CREATE USER 'proyectos'@'localhost' IDENTIFIED BY 'Studium2025;';
GRANT SELECT, INSERT, DELETE, UPDATE ON proyectos.* TO 'proyectos'@'localhost';
FLUSH PRIVILEGES;
SHOW GRANTS FOR 'proyectos'@'localhost';