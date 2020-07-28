const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jsonwebtoken = require('jsonwebtoken')
const UsersModel = require('../../models/users.model');

exports.loginUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { body } = req

    const userLogin = await UsersModel.findOne({ username: body.username });
    if (!userLogin) {
        return res.status(400).json({ mensaje: 'Usuario y/o Contraseña Incorrectos' })

    }

    const passCheck = await bcryptjs.compare(body.password, userLogin.password);
    if (!passCheck) {
        return res.status(400).json({ mensaje: 'Usuario y/o Contraseña Incorrectos' })
    }

    const jwt_payload = {
        user: {
            id: userLogin.id,
            username: userLogin.username,
            role: userLogin.roleType
        }
    }

    try {
        const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET, { expiresIn: process.env.TIME_EXP })
        userLogin.token = [ token ] 
        await UsersModel.update({ username: userLogin.username }, userLogin)
        res.send({ mensaje: 'Logueado Correctamente', token,  role: userLogin.roleType, id: userLogin._id })
    } catch (error) {
        return res.status(500).json({ mensaje: 'ERROR', error })
    }
}
