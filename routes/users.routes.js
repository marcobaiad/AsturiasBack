const express = require('express');
const { check } = require('express-validator')
const authorize = require('../middlewares/authorize')
const router = express.Router();
 
const usuarioControllerRegister = require('../controllers/users/registerUsers')
const usuarioControllerLogin = require('../controllers/users/loginUsers')
const usuarioControllerLogout = require('../controllers/users/logoutUsers')
const usuariosControllerReadSeveral = require('../controllers/users/readSeveralUser')
const usuarioControllerReadOne = require('../controllers/users/readOneUser')
const usuarioControllerDelete = require('../controllers/users/deleteUsers')

router.post('/login', [
    check('username', 'usuarioError: Campo Vacio.').notEmpty(),
    check('password', 'contraseñaError: Campo Vacio').notEmpty(),
], usuarioControllerLogin.loginUser)
router.post('/', [
    check('name', 'Campo Nombre Vacio').notEmpty(),
    check('lastname', 'Campo Apellido Vacio').notEmpty(),
    check('address', 'Ingresar un Mail Correcto').notEmpty(),
    check('age', 'Campo Edad Vacio').notEmpty(),
    check('phonenumber', 'Campo Celular Vacio').notEmpty(),
    check('email', 'Campo Mail Vacio').notEmpty(),
    check('email', 'Ingresar un Mail Correcto').isEmail(),
    check('username', 'Campo Vacio. Usuario').notEmpty(),
    check('password', ' Campo Vacio. Contraseña').notEmpty(),
    check('password', 'la contraseña debe tener un minimo de 8 caracteres').isLength({ min: 8 }),
], usuarioControllerRegister.registerUser)

router.get('/logout', authorize([ 'user', 'admin' ]), usuarioControllerLogout.logoutUser)
router.get('/:id',authorize('user'), usuarioControllerReadOne.GetUser)
router.get('/',authorize('admin'), usuariosControllerReadSeveral.GetUsers) 

router.delete('/:id',authorize('admin'), usuarioControllerDelete.DeleteUser)

module.exports = router;
 