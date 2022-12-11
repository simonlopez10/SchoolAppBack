const pool = require('../db');


const createNote = async (req, res, next) => {

    // Creación de grupo

    const { grupoId, materiaId, nombre } = req.body

    try {
        const result = await pool.query(
            'INSERT INTO notas (grupo_id, materia_id, nombre_nota) VALUES ($1, $2, $3) RETURNING *',
            [grupoId, materiaId, nombre]
        );

        res.json(result.rows[0]);

    } catch (error) {
        next(error);
    }
}

const getAllNotes = async (req, res, next) => {

    // Obtener listado de todos las notas

    try {
        const allNotes = await pool.query(`
                    SELECT 
                        notas.*, 
                        materias.nombre_materia, 
                        grupos.nombre_grupo,
                        grupos.siglas_grupo
                    FROM 
                        notas 
                    LEFT JOIN materias 
                        ON notas.materia_id = materias.materia_id 
                    LEFT JOIN grupos 
                        ON notas.grupo_id = grupos.grupo_id
                    `
                )
        res.json(allNotes.rows)
    } catch (error) {
        next(error)
    }
}

const getNotesBySubjectId = async (req, res, next) => {

    try {
        const { id } = req.params;
            
        const selectedSubjects = await pool.query('SELECT * from notas where notas.materia_id = $1', [id]);
        res.json(selectedSubjects.rows);

    } catch(error){
        next(error)
    }
}

const getNote = async (req, res, next) => {
    // Obtiene un grupo por id

    try {
        const { id } = req.params;

        const result = await pool.query(`
                SELECT 
                    notas.*,
                    materias.nombre_materia,
                    grupos.nombre_grupo
                FROM 
                    notas
                LEFT JOIN materias
                    ON notas.materia_id = materias.materia_id
                LEFT JOIN grupos 
                    ON notas.grupo_id = grupos.grupo_id
                WHERE nota_id = $1`, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "the note does not exist"
            })
        }

        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const getInternalNote = async (id) => {
    // Obtiene una nota por id

    try {

        const result = await pool.query('SELECT * FROM notas WHERE nota_id = $1', [id]);

        return result;

    } catch (error) {
        next(error)
    }
}

const updateNote = async (req, res, next) => {

    // Actualizar nota (sirve para editar o archivar nota)

    try {
        const { id } = req.params;
        const { materiaId, estudianteId, nombre, valor} = req.body;

        const result = await pool.query('UPDATE notas SET materia_id = $1, estudiante_id = $2,  nombre_nota = $3, valor_nota = $4 WHERE nota_id = $5',
            [materiaId, estudianteId, nombre, valor, id]
        );

        if (result.rowCount.length === 0)
            return res.status(404).json({
                message: "La nota no ha sido encontrada"
            });
        
        const updatedNote = await getInternalNote(id);
        return res.json({
            'success':true,
            'data': updatedStudent.rows[0]
        });

        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createNote,
    getAllNotes,
    getNotesBySubjectId,
    getNote,
    updateNote
}