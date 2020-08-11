const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const UsersModel = require('../../models/users.model');

exports.EditUser = async (req, res) => {

    const { body } = req
    
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({mensaje: 'No hay resultado para la Busqueda'});
        }

        const salt = await bcryptjs.genSalt(10);
        body.password = await bcryptjs.hash(body.password, salt);

        const usuario = await UsersModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(usuario)
    } catch (err) {
        res.status(500).send(err);
    }
}