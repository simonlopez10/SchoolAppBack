// CONFIGURACION Y CREACIÓN DE LAS RUTAS DEL BACK

const { Router } = require('express');   //Sirve para crear el Router
const router = Router();

// Students controllers
const {
    getAllStudents,
    getStudent,
    createStudent,
    updateStudent  
} = require('../controllers/students.controller');

// Groups controllers
const { 
    createGroup,
    getAllGroups,
    getGroup,
    updateGroup,
} = require('../controllers/groups.controllers');

// Subjects controllers
const {
    createSubject,
    getAllSubjects,
    getSubject,
    updateSubject,
    getSubjectsByGroupId,

} = require('../controllers/subjects.controller');

// Notes controllers
const {
    createNote,
    getAllNotes,
    getNote,
    updateNote,
    getNotesBySubjectId,
} = require('../controllers/notes.controller');

// Users controllers
const {getUsers} = require('../controllers/users.controllers');
const { register, login, protected, logout } = require('../controllers/users.controllers');
const { validationMiddleware } = require('../middlewares/validations-middleware');
const { registerValidtion, loginValidation } = require('../validators/auth')
const { userAuth } = require('../middlewares/auth-middleware')

//----------------------------------------------------RUTAS MODULO USUARIOS------------------------------------------------------

router.get('/users', getUsers)
// Ruta para obtener usuarios

router.get('/protected', userAuth, protected)
// Ruta protegida para usarios registrados y logeados

router.post('/register', registerValidtion, validationMiddleware, register )
// Ruta para registar usuarios con validaciones middleware

router.post('/login', loginValidation, validationMiddleware, login)
// Ruta para hacer el login 

router.get('/logout', logout)
// Ruta para hacer el logout







//------------------------------------------------RUTAS MODULO ESTUDIANTES-------------------------------------------------

router.post('/students', createStudent)
//Ruta para la creación de un nuevo estudiante

router.get('/students', getAllStudents)
// Ruta para obtener un listado de estudiantes

router.get('/students/:id', getStudent)
// Ruta para obtener un estudiante (puede servir para mostrar el dashboard)

router.put('/students/:id', updateStudent)
// Ruta para actualizar estudiante (datos y estado)


//---------------------------------------------------RUTAS MODULO GRUPOS------------------------------------------------------

router.post('/groups', createGroup);
// Ruta para crear grupos

router.get('/groups', getAllGroups);
// Ruta para obtener un listado de grupos 

router.get('/groups/:id', getGroup);
// Ruta para obtener un grupo

router.put('/groups/:id', updateGroup);
// Ruta para actualizar un grupo (datos y estado)

//--------------------------------------------------RUTAS MODULO MATERIAS------------------------------------------------------

router.post('/subjects', createSubject);
// Ruta para crear grupos

router.get('/subjects', getAllSubjects);
// Ruta para obtener un lustado de grupos

router.get('/subjects/:id', getSubject);
// Ruta para obtener un grupo

router.get('/subjects/bygroup/:id', getSubjectsByGroupId);
// Ruta para obtener un grupo

router.put('/subjects/:id', updateSubject);
// Ruta para actualizar un grupo (datos y estado)

//----------------------------------------------------RUTAS MODULO NOTAS------------------------------------------------------

router.post('/notes', createNote);
// Ruta para crear notas

router.get('/notes', getAllNotes);
// Ruta para obtener un listado de notas

router.get('/notes/bysubject/:id', getNotesBySubjectId);
// Ruta para obtener un listado de notas (nombres) por materia (id)

router.get('/notes/:id', getNote);
// Ruta para obtener una nota por id

router.put('/notes/:id', updateNote);
// Ruta para actualizar un grupo (datos y estado)


module.exports = router