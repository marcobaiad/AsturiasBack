const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const _ = require('lodash');
const UsersModel = require('../../models/users.model');
exports.responseRecovery = async (req, res) => {
  const { resetLink } = req.params
  const { newPass } = req.body
  console.log('req.body ->', req.body)
  if (resetLink) {
    jwt.verify(resetLink, process.env.JWT_SECRET, function (error, decodedData) {
      console.log('decodedData ->', decodedData)
      console.log('ingresamos a la funcion')
      console.log('resetLinkResponse->', resetLink)
      UsersModel.findOne({ _id: decodedData._id }, async (err, user) => {
        console.log('idData ->', decodedData._id)
        if (err || !user) {
          return res.status(400).json({ error: 'El Usuario no existe' })
        }
        const salt = await bcryptjs.genSalt(10);
        const encryptedPass = await bcryptjs.hash(newPass, salt);
        console.log('user.pass ->', encryptedPass)
        user.password = encryptedPass
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({ error: 'Error al Blanquear la Contraseña' })
          } else {
            return res.status(200).json({ mensaje: 'Cambio de Contraseña Exitoso' })
          }
        })
      })
    })
  } else {
    return res.status(401).json({ error: 'Error de Autenticacion' })
  }
}