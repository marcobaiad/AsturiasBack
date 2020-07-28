const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const UsersModel = require('../../models/users.model');
const sendNodeMail = require('../../middlewares/nodemailer');

exports.registerUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
  
    const { body } = req

    let name = ({ name: body.name })
    
    let lastname = ({ lastname: body.lastname })

    let phonenumber = ({phonenumber: body.phonenumber})

    let address = ({address: body.address})
   
    let email = ({ email: body.email })
   
    let edad = ({ age: body.age });
  
    if (edad.age < 18) {
        return res.status(400).json({ mensaje: 'No podes tener cuenta, debes ser mayor de edad' })
    }

    let userExists = await UsersModel.findOne({ username: body.username });
    if (userExists) {
        return res.status(400).json({ mensaje: 'El Usuario ya existe' })
    }
    
    let mailExists = await UsersModel.findOne({ email: body.email });
    if (mailExists) {
        console.log(mailExists)
        return res.status(400).json({ mensaje: 'El mail ya se encuentra en uso' })
    }

    const user = {
        name: body.name,
        lastname: body.lastname,
        address: body.address,
        phonenumber: body.phonenumber,
        age: body.age,
        email: body.email,
        username: body.username,
        tokens: []
    };

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(body.password, salt);

    const usuario = new UsersModel(user);

    const mailContent = {
      email: body.email,
      subject: 'Registro exitoso ' + body.name,
      msg: '¡Hola ' + body.name + '!',
      }

    try {
        await usuario.save(); 
        await sendNodeMail(mailContent.email, mailContent.subject, mailContent.msg)
        res.send({ mensaje: 'Tu Usuario se Registro Correctamente' })
    } catch (error) {
        res.status(500).send(error);
    }
}