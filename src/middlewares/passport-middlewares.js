const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../config');
const pool = require('../db');


const cookieExtractor = function (req) {
    let token = null
    if (req && req.cookies) token = req.cookies['token']
    return token
}

const opts = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor,
}

passport.use(
    new Strategy(opts, async ({ id }, done) => {

        try {
            const { rows } = await pool.query(
                'SELECT usuario_id, email FROM usuarios WHERE usuario_id = $1',
                [id]
            )

            if (!rows.length) {
                throw new Error('401 not authorized');
            }

            let user = { id: rows[0].usuario_id, email: rows[0].email }

            return await done(null, user)

        } catch (error) {
            console.log(error.message)
            done(null, false)
        }

    })
)