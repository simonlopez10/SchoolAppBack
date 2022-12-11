const { check } = require('express-validator');
const pool = require('../db');
const { compare } = require('bcryptjs');

// password
const password = check('contrasena').isLength({min: 6, max: 15}).withMessage('Password has to be between 6 and 15 characters')

// email
const email = check('email').isEmail().withMessage('Please provide valid email')

// Check if email exists in db
const emailExists = check('email').custom(async (value) => {
    const {rows} = await pool.query('SELECT * FROM usuarios WHERE email = $1', [
        value,
    ])

    if (rows.length) {
        throw new Error('Email already exists')
    }
});

// Login validation
const loginFieldsCheck = check('email').custom(async (value, {req}) => {
    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [value]);
    if (!user.rows.length) {
        throw new Error('Email does not exists')
    }

    const validPassword = await compare(req.body.contrasena, user.rows[0].contrasena);
    if (!validPassword) {
        throw new Error('Wrong password')
    }

    req.user = user.rows[0]

})

module.exports = {
    registerValidtion: [email, password, emailExists],
    loginValidation: [loginFieldsCheck],
}

