CREATE TABLE grupos (
	grupo_id SERIAL PRIMARY KEY,
	nombre_grupo VARCHAR(15) NOT NULL,
	siglas_grupo VARCHAR(5),
	estado_grupo BOOLEAN,
	UNIQUE (nombre_grupo)
);

CREATE TABLE materias (
	materia_id SERIAL PRIMARY KEY,
	grupo_id INT REFERENCES grupos(grupo_id),  
	nombre_materia VARCHAR(100),
	estado_materia BOOLEAN,
	UNIQUE(nombre_materia)
);

CREATE TABLE grupos_materias (
    grupo_id INT REFERENCES grupos (grupo_id),
	materia_id INT REFERENCES materias (materia_id),
	PRIMARY KEY (grupo_id, materia_id)
);

CREATE TABLE estudiantes (
	estudiante_id SERIAL PRIMARY KEY NOT NULL,
	grupo_id INT REFERENCES grupos(grupo_id),
	nombre_est TEXT NOT NULL,
	apellido_est TEXT NOT NULL,
	estado_estudiante BOOLEAN
);

CREATE TABLE notas (
	nota_id SERIAL PRIMARY KEY,
	materia_id INT REFERENCES materias (materia_id),
	estudiante_id INT REFERENCES estudiantes (estudiante_id),
	nombre_nota VARCHAR(50) NOT NULL,
	valor_nota FLOAT
);

CREATE TABLE usuarios (
	usuario_id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	contrasena VARCHAR(255) NOT NULL,
	fecha_creacion DATE DEFAULT CURRENT_DATE,
	nombre_usuario VARCHAR(255),
	apellido_usuario VARCHAR(255)
);