const pool = require('../db')

const createStudent = async (req, res, next) => {

    // Creación de estudiante

    const { grupoId, nombre, apellido, estado = true } = req.body

    try {
        const result = await pool.query(
            'INSERT INTO estudiantes (grupo_id, nombre_est, apellido_est, estado_estudiante) VALUES ($1, $2, $3, $4) RETURNING *',
            [grupoId, nombre, apellido, estado]
        );

        res.json(result.rows[0]);

    } catch (error) {
        next(error)
    }
};

const getAllStudents = async (req, res, next) => {

    // Obtener listado de todos los estudiantes

    try {
    const allStudents = await pool.query('SELECT estudiantes.*, grupos.nombre_grupo FROM estudiantes left join grupos ON estudiantes.grupo_id = grupos.grupo_id')
        res.json(allStudents.rows)
    } catch (error) {
        next(error)
    }

}


const getStudent = async (req, res, next) => {

    // Obtiene un estudiante por id

    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM estudiantes WHERE estudiante_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "the student does not exist"
            })
        }

        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const getInternalStudent = async (id) => {

    // Obtiene un estudiante por id

    try {

        const result = await pool.query('SELECT * FROM estudiantes WHERE estudiante_id = $1', [id]);

        return result;

    } catch (error) {
        next(error)
    }
}

const updateStudent = async (req, res, next) => {

    // Actualizar estudiante (sirve para editar o archivar estudiante)

    try {
        const { id } = req.params;
        const { grupoId, nombre, apellido, estado=true } = req.body;

        const result = await pool.query('UPDATE estudiantes SET grupo_id = $1, nombre_est = $2,  apellido_est = $3, estado_estudiante = $4 WHERE estudiante_id = $5',
            [grupoId, nombre, apellido, estado, id]
        );

        if (result.rowCount.length === 0)
            return res.status(404).json({
                message: "El estudiante no ha sido encontrado"
            });
        console.log(result)

        const updatedStudent = await getInternalStudent(id);
        console.log(updatedStudent.rows[0]);
        return res.json({
            'success':true,
            'data': updatedStudent.rows[0]
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getAllStudents,
    getStudent,
    createStudent,
    updateStudent
}