CREATE DATABASE school-app-db

CREATE TABLE grupos (
	grupo_id SERIAL PRIMARY KEY,
	nombre_grupo VARCHAR(15) NOT NULL,
	siglas_grupo VARCHAR(5),
	estado_grupo BOOLEAN,
	UNIQUE (nombre_grupo)
);

CREATE TABLE materias (
	materia_id SERIAL PRIMARY KEY,
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
	tipo_iden VARCHAR(25),
	num_iden SMALLINT,
	estado_estudiante BOOLEAN,
	UNIQUE (num_iden)
);

CREATE TABLE notas (
	nota_id SERIAL PRIMARY KEY,
	materia_id INT REFERENCES materias (materia_id),
	grupo_id INT REFERENCES grupos (grupo_id),
	nombre_nota VARCHAR(50) NOT NULL,
	estado_nota BOOLEAN
);

CREATE TABLE estudiantes_notas (
	estudiante_id INT REFERENCES estudiantes (estudiante_id),
	nota_id INT REFERENCES notas (nota_id),
	grupo_id INT REFERENCES grupos (grupo_id)
	valor_nota NUMERIC,
	PRIMARY KEY (nota_id, estudiante_id)
)

