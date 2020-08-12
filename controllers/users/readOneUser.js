const UsersModel = require('../../models/users.model');
exports.GetUser = async (req, res) => {
    try {
        const user = await UsersModel.findById(req.params.id)
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'user', select: 'name' })
        if(!user){
            return res.status(400).json({mensaje: 'No Existe el usuario'})
        }
        res.send(user)
    } catch (err) {
        res.status(500).send(err);
    }
}