const jsonwebtoken = require('jsonwebtoken');
const UsersModel = require('../models/users.model');

module.exports = (role) => async (req, res, next) => {
  
    try {
        
        const token = req.header('authorization').replace('Bearer ', '');
       
        const verificar = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        const userLogin = await UsersModel.findOne({ _id: verificar.user.id, token: token });
        if (!userLogin) {
            return res.status(401).json({ mensaje: 'Dentro: No Autorizado' })
        }
        if (typeof role === 'string' && verificar.user.role !== role) {
            return res.status(401).json({ mensaje: 'Dentro: No Autorizado' })

        } else if (Array.isArray(role) && !role.includes(verificar.user.role)) {
            return res.status(401).json({ mensaje: 'Dentro: No Autorizado' })
        }

        res.locals.user = userLogin;
        res.locals.token = token;
       
        next();
    }

    catch (error) {
        return res.status(401).json({ mensaje: 'Fuera: No Autorizado', error: error.message })
    }
}
