const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "894073854290-i8rd35pp2gl4nn6cbfuhb9bdnt8kjk71.apps.googleusercontent.com",
    "SpZw8BJc0V4sveCOE1-viCnj", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04FrhQZOlzGf9CgYIARAAGAQSNwF-L9Ir3StJEJKqof4AtrtbiFe1rGy1tDqJzPKjng8ChYkRM8QzwF1ytjEnu_hXYWbIrbhovUk"
});

const accessToken = oauth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: "OAuth2",
          user: "proyectofinalrestorant@gmail.com", 
          clientId: "894073854290-i8rd35pp2gl4nn6cbfuhb9bdnt8kjk71.apps.googleusercontent.com",
          clientSecret: "SpZw8BJc0V4sveCOE1-viCnj",
          refreshToken: "1//04FrhQZOlzGf9CgYIARAAGAQSNwF-L9Ir3StJEJKqof4AtrtbiFe1rGy1tDqJzPKjng8ChYkRM8QzwF1ytjEnu_hXYWbIrbhovUk",
          accessToken: accessToken

        // user: process.env.EMAIL, // TODO: your gmail account
        // pass: process.env.PASSWORD // TODO: your gmail password
    }
});

const sendNodeMail = (email, subject, msg) => {
    //La función recibe por parámetros los datos a llenar en el correo
    const mailOptions = {
        from: `Asturias F & D <proyectofinalrestorant@gmail.com>`, // email sender
        to: email, // email receiver
        subject: subject,
        html: `
            <div>
                <div style='display: flex; justify-content: center'>
                     <img src='https://i.pinimg.com/originals/8d/1b/49/8d1b4901f95dfcb9c4c835bcf35c66a3.gif' alt="..." style='margin: auto'>
                </div>
                    <h1 style='text-align: center'>${msg}</h1>
                    <h3 style='text-align: center'> Te damos la Bienvenida a Asturias Foods & Drinks </h3>
                <div>
                    <div style='display: flex; justify-content: center'>
                        <div style='margin-left: 150px'>
                            <img src='https://i.ytimg.com/vi/ddzw9Ntq7kg/maxresdefault.jpg' alt="..." style='width: 100px; height: 100px; object-fit: cover; margin-left: 20px;'> 
                            <p style='text-align: center'> Pedí online <br>
                            de manera fácil, práctica <br>
                            y sin costo adicional. </p>
                        </div>
                        <div style='margin-left: 100px; margin-right: 100px'>
                            <img src='https://cdn5.dibujos.net/dibujos/pintados/201322/comida-rapida-dibujos-de-los-usuarios-pintado-por-audreys-9817680.jpg' alt="..." style='width: 100px; height: 100px; object-fit: cover; margin-left: 20px;'>
                            <p style='text-align: center'> Descubrí cientos <br>
                            de locales y miles <br>
                            de opciones para elegir. </p>
                        </div>
                        <div>
                            <img src='https://image.freepik.com/vector-gratis/mano-sosteniendo-bolsa-papel-rojo_1262-6812.jpg' alt="..." style='width: 100px; height: 100px; object-fit: cover; margin-left: 20px;'>
                            <p style='text-align: center'> Formá parte <br>
                            de nuestra comunidad <br>
                            con millones de usuarios. </p>
                        </div>
                  </div>
             </div>
                 <div>
                        <h3 style='text-align: center'>
                            ¡Nos encanta que te hayas sumado! <br>
                            El equipo de Asturias F & D 
                        </h3>
                 </div>
                 <div>
                    <h3 style='text-align: center'> Disponible en: </h3>
                 </div>
                 <div style='display: flex; justify-content: center'>
                        <div style='margin-left: 255px'>
                            <img src='https://previews.123rf.com/images/siiixth/siiixth1607/siiixth160700046/59996959-icono-de-vector-de-la-computadora-port%C3%A1til.jpg' alt="..." style='width: 115px; height: 100px; object-fit: cover;'> 
                            <p style='text-align: center'> Web </p>
                        </div>
                        <div style='margin-left: 50px; margin-right: 50px'>
                            <img src='https://lh3.googleusercontent.com/proxy/pYD-DO8KcWP8y8zLL8aOfTK1h6RLPFKZSBn779Cu_e_hE0Dlal6VNDWkqxxeTmfWHJdMsBJUS0n2u8NkuMT-eej3XeR3op8U7zY6ppNtUcapvov5oiyYCrq82JAiqq12Uw' alt="..." style='width: 100px; height: 100px; object-fit: cover'>
                            <p style='text-align: center'> iPhone </p>
                        </div>
                        <div> 
                            <img src='https://i.pinimg.com/originals/9f/4c/c5/9f4cc55de7314756057faeb936f0cd88.png' alt="..." style='width: 100px; height: 100px; object-fit: cover;'>
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

module.exports = sendNodeMail;

