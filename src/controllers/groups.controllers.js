const pool = require('../db');

const createGroup = async (req, res, next) => {

    // Creación de grupo

    const { nombre, siglas, estado=true } = req.body

    try {
        const result = await pool.query(
            'INSERT INTO grupos (nombre_grupo, siglas_grupo, estado_grupo) VALUES ($1, $2, $3) RETURNING *',
            [nombre, siglas, estado]
        );

        res.json(result.rows[0]);

    } catch (error) {
        next(error);
    }
}

const getAllGroups = async (req, res, next) => {

    // Obtener listado de todos los grupos 

    try {
        const allGroups = await pool.query('SELECT * FROM grupos')
        res.json(allGroups.rows)
    } catch (error) {
        next(error)
    }
}

const getGroup = async (req, res, next) => {
    // Obtiene un grupo por id

    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM grupos WHERE grupo_id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "the group does not exist"
            })
        }

        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const getInternalGroup = async (id) => {
    try {

        const result = await pool.query('SELECT * FROM grupos WHERE grupo_id = $1', [id]);

        return result;

    } catch (error) {
        next(error)
    }
}


const updateGroup = async (req, res, next) => {

    // Actualizar grupo (sirve para editar o archivar grupo)
    
    try {
        const { id } = req.params;
        const { nombre, siglas, estado=true } = req.body;

        const result = await pool.query('UPDATE grupos SET nombre_grupo = $1, siglas_grupo = $2,  estado_grupo = $3 WHERE grupo_id = $4',
            [nombre, siglas, estado, id]
        );

        if (result.rowCount.length === 0)
            return res.status(404).json({
                message: "the group has not been found"
            });
            console.log(result)

            const updatedGroup = await getInternalGroup(id);
            console.log(updatedGroup.rows[0]);
            return res.json({
                'success':true,
                'data': updatedGroup.rows[0]
            });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    createGroup,
    getAllGroups,
    getGroup,
    updateGroup
}
