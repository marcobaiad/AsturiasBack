const UsersModel = require('../../models/users.model');
const jwt = require('jsonwebtoken');
const SendRecoveryPassEmail = require('../../middlewares/recoveryPassEmail');
exports.recoveyPass = async (req, res) => {
  const user = await UsersModel(req.body)
  let mailExists = await UsersModel.findOne({ email: user.email });
  console.log(mailExists)
  console.log('id encriptado ->', user.id)
  console.log('id mail ->', mailExists.id)
  const tokenRecovery = jwt.sign({ _id: mailExists.id }, process.env.JWT_SECRET)
  console.log('tokenRecoveyPass ->', tokenRecovery)
  const mailContent = {
    email: user.email,
    subject: 'Recuperacion de Contraseña',
    msg: '¡Ya Casi Recuperas tu Contraseña Falta Un Paso Mas!',
    tokenRecovery: tokenRecovery
  }
  if (mailExists) {
    await SendRecoveryPassEmail(mailContent.email, mailContent.subject, mailContent.msg, mailContent.tokenRecovery)
    res.status(200).json({ mensaje: 'Se Envio correctamente', idEncriptado: user.id, tokenRecovery })
  } else {
    res.status(400).json({ mensaje: 'El Mail No Existe' })
  }
}
