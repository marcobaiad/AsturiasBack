const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // TODO: your gmail account
        pass: process.env.PASSWORD // TODO: your gmail password
    }
});
const SendOrderEmail = (email, subject, msg) => {
    //La función recibe por parámetros los datos a llenar en el correo
    const mailOptions = {
        from: `Asturias F & D <${process.env.EMAIL}>`, // email sender
        to: email, // email receiver
        subject: subject,
        html: `
            <div>
                <div style='display: flex; justify-content: center;'>
                    <img src='https://st2.depositphotos.com/3586665/10821/v/450/depositphotos_108216062-stock-illustration-delivery-boy-ride-scooter-with.jpg' alt="..." style='margin: auto; height: 150px'>
                </div>
                    <h1 style='text-align: center'>${msg}</h1>
                    <h3 style='text-align: center'> Gracias Por Tu Compra </h3>
                <div>
                    <div style='display: flex; justify-content: center; margin-left: 150px'>
                       <div>
                            <h1>Recuerda Que Ya Puedes Puntuar Nuestro Servicio</h1>
                            <img src="http://i.imgur.com/VDbzbqF.gif" alt="" style='margin-left: 200px'/>
                            <h2 style='margin-left: 180px; margin-bottom: 30px'>Haz Click en el Siguiente Boton</h2>
                            <a style='margin-left: 250px; padding: 15px; background-color: red; color: white;' href="http://localhost:3000/user/orders" >Ir A Calificar El Servicio</a>
                       </div>
                  </div>
             </div>
                 <div>
                        <h3 style='text-align: center; margin-top: 30px'>
                            ¡Que Disfrutes de Tu Pedido! <br>
                            El equipo de Asturias F & D 
                        </h3>
                 </div>
                 <div>
                    <h3 style='text-align: center'> Disponible en: </h3>
                 </div>
                 <div style='display: flex; justify-content: center'>
                        <div style='margin-left: 190px'>
                            <img src='https://previews.123rf.com/images/siiixth/siiixth1607/siiixth160700046/59996959-icono-de-vector-de-la-computadora-port%C3%A1til.jpg' alt="..." style='width: 180px; height: 150px; object-fit: cover;'> 
                            <p style='text-align: center'> Web </p>
                        </div>
                        <div style='margin-left: 50px; margin-right: 50px'>
                            <img src='https://i.pinimg.com/originals/b2/16/c4/b216c450da0e3bd5ca578f0bdccd841f.png' alt="..." style='width: 100px; height: 150px; object-fit: cover'>
                            <p style='text-align: center'> iPhone </p>
                        </div>
                        <div> 
                            <img src='https://i.pinimg.com/originals/9f/4c/c5/9f4cc55de7314756057faeb936f0cd88.png' alt="..." style='width: 100px; height: 150px; object-fit: cover;'>
                            <p style='text-align: center'> Android </p>
                        </div>
                 </div>
                 <div>
                    <h2 style='margin-left: 80px'> Seguinos en las Redes </h2>
                    <div style='display: flex'>
                        <div>
                            <a href="https://www.facebook.com/"> <img src="https://i.pinimg.com/originals/cd/83/fd/cd83fd9c7c5f2d2094187adf237ed4fe.jpg" alt="" target:'_blank' style='width: 100px;'/> </a>
                        </div>
                        <div style='margin-left: 40px'>
                            <a href="https://twitter.com/"> <img src="https://images.vexels.com/media/users/3/153967/isolated/lists/58c578f0017e92a7f116db08379b6a2d-twitter-icono-de-trazo-de-color.png" alt=""target:'_blank' style='width: 100px;' /> </a>
                        </div>
                        <div>
                            <a href="https://www.instagram.com/?hl=es-la"> <img src="https://img.blogs.es/anexom/wp-content/uploads/2017/02/social-instagram-e1487063466713.png" alt="" target:'_blank' style='width: 175px;'/> </a>
                        </div>
                    </div>
                 </div>
              </div>
            </div>    
        ` // html body | contenido del mail
    };
    return transporter.sendMail(mailOptions);
};
module.exports = SendOrderEmail;