const express = require('express');
const { CLIENT_URL } = require('./config');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const cors = require('cors');
const morgan = require('morgan');

// import passport middleware
require('./middlewares/passport-middlewares')


// Rutas 
const schoolRoutes = require('./routes/school.routes');


// Servidor
const app = express();


// Morgan: Middleware de nIvel de solicitud HTTP
app.use(morgan('dev'));

// MIDDLEWARES
// Leer json e inicializar middlewares
app.use(express.json());
// Utilizar cookies
app.use(cookieParser());
// Pasaporte
app.use(passport.initialize())
// Cors: Comunicar servidores de forma simple. el back contrsuido con express y el back de react
app.use(cors({origin: CLIENT_URL, credentials: true}));


// Servidor llamando rutas
app.use(schoolRoutes);

// Middleware de error predeterminado, los controllers lo llaman al usar el parametro next
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

// Inicializacion del servidor en puerto 3000
app.listen(4000)
console.log('Server on port 4000')