const UsersModel = require('../../models/users.model');

exports.logoutUser = async (req, res) => {
     try {

        await UsersModel.updateOne({ _id: res.locals.user.id }, { $set: { token: [] } })
        res.json({ mensaje: 'Deslogueo ok' })
    } catch (error) {
        res.status(500).send({ mensaje: 'Error', error })
    }
}