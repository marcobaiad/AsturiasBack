const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // TODO: your gmail account
    pass: process.env.PASSWORD // TODO: your gmail password
  }
});
const SendRecoveryPassEmail = (email, subject, msg, tokenRecovery) => {
  //La función recibe por parámetros los datos a llenar en el correo
  const mailOptions = {
    from: `Asturias F & D <${process.env.EMAIL}>`, // email sender
    to: email, // email receiver
    subject: subject,
    html: `
            <div>
                  <h1 style='text-align: center'>${msg}</h1>
                <div style='display: flex; justify-content: center;'>
                     <img src='https://image.freepik.com/vector-gratis/ilustracion-concepto-olvide-contrasena_114360-1095.jpg' alt="..." style='margin: auto; height: 150px; margin-top: 20px; margin-bottom: 20px;'>
                </div>
                <div>
                    <div style='display: flex; justify-content: center; margin-left: 150px'>
                       <div>
                            <h2 style='margin-left: 180px; margin-bottom: 30px'>Haz Click en el Siguiente Boton</h2>
                            <a style='margin-left: 235px; padding: 15px; background-color: red; color: white; text-decoration: none' href="http://localhost:3000/recoverpass/${tokenRecovery}" >Ir A Recuperar Contraseña</a>
                       </div>
                    </div>
                </div>
                 <div>
                        <h3 style='text-align: center; margin-top: 30px'>
                            ¡Estamos Para Ayudarte! <br>
                            El equipo de Asturias F & D 
                        </h3>
                 </div>
              </div>
            </div>    
        ` // html body | contenido del mail
  };
  return transporter.sendMail(mailOptions);
};
module.exports = SendRecoveryPassEmail;