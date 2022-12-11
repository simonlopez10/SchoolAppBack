const pool = require('../db');

const createSubject = async (req, res, next) => {

    // Creación de materia

    const { grupoId, nombre, estado = true } = req.body

    try {
        const result = await pool.query(
            'INSERT INTO materias (grupo_id, nombre_materia, estado_materia) VALUES ($1, $2, $3) RETURNING *',
            [grupoId, nombre, estado]
        );

        res.json(result.rows[0]);

    } catch (error) {
        next(error);
    }

}


const getAllSubjects = async (req, res, next) => {

    // Ver todas las materias

    try {
        const allSubjects = await pool.query('SELECT materias.*, grupos.nombre_grupo FROM materias left join grupos ON materias.grupo_id = grupos.grupo_id')
        res.json(allSubjects.rows)
    } catch (error) {
        next(error)
    }
};

const getSubjectsByGroupId = async (req, res, next) => {

    try {
        const { id } = req.params;
            
        const selectedSubjects = await pool.query('SELECT * from materias where materias.grupo_id = $1', [id]);
        res.json(selectedSubjects.rows);

    } catch(error){
        next(error)
    }
}

const getSubject = async (req, res, next) => {
    // Obtiene una materia por id

    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM materias WHERE materia_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "the subject does not exist"
            })
        }

        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const getInternalSubject = async (id) => {

    // Obtiene una materia por id

    try {
    
        const result = await pool.query('SELECT * FROM materias WHERE materia_id = $1', [id]);
        return result;

    } catch (error) {
        console.log(error)
    }
}


const updateSubject = async (req, res, next) => {

    // Creación de materias

    try {
        const { id } = req.params;
        const { grupoId, nombre, estado = true } = req.body;

        const result = await pool.query('UPDATE materias SET grupo_id = $1, nombre_materia = $2,  estado_materia = $3 WHERE materia_id = $4',
            [grupoId, nombre, estado, id]
        );

        if (result.rowCount.length === 0)
            return res.status(404).json({
                message: "La materia no ha sido encontrada"
            });

   
        const updatedSubject = await getInternalSubject(id);
        return res.json({
            'success': true,
            'data': updatedSubject.rows[0]
        });

    } catch (error) {
        next(error);
    }

};


module.exports = {
    createSubject,
    getAllSubjects,
    getSubject,
    getSubjectsByGroupId,
    updateSubject
}
