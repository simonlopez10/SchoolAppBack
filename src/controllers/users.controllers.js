const pool = require('../db');
const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../config');



const getUsers = async (req, res, next) => {

    // Obtener usuarios

    try {
        const { rows } = await pool.query('SELECT usuario_id, email FROM usuarios');
        return res.status(200).json({
            success: true,
            usuarios: rows,
        })

    } catch (error) {
        next(error);
    }
}

const register = async (req, res) => {

    const { email, contrasena, nombre_usuario, apellido_usuario } = req.body
    try {
        const hashedContrasena = await hash(contrasena, 10);

        await pool.query('INSERT INTO usuarios(email, contrasena, nombre_usuario, apellido_usuario) VALUES ($1, $2, $3, $4)', [email, hashedContrasena, nombre_usuario, apellido_usuario])

        return res.status(201).json({
            success: true,
            message: 'The registration was succesfull'
        })
        console.log('validation passed')
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
    }
}

const login = async (req, res) => {

    let user = req.user
    console.log(user)
    let payload = {
        id: user.usuario_id,
        email: user.email
    }

    try {

        const token = await sign(payload, SECRET)
        console.log(token)
        return res.status(200).cookie('token', token, { httpOnly: true }).json({
            success: true,
            message: 'Logged in succesfully',
            token: token
        })


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
    }
}

const protected = async (req, res, next) => {

    // Obtener info de ruta protegida

    try {
        return res.status(200).json({
            info: 'protected info',
        })
    } catch (error) {
        console.log(error.message)
    }
}

const logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('token', { httpOnly: true }).json({
            success: true,
            message: 'Logged out succesfully'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
    }
}

module.exports = {
    getUsers,
    register,
    login,
    protected,
    logout
}
