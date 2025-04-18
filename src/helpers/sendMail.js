const transporter = require('./mailer');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
const path = require('path');
const getImages = require('./getImages');
require('dotenv').config();

const sendMail = (email, subject, template, attachments) =>{
    transporter.sendMail({
        to: email, //Para quien es el correo
        subject: subject,
        html: template,
        attachments: attachments,
        // `<h1>Hola, ${firstname} ${lastname} Bienvendo a mi aplicacion de chat. Da click en <a href="http://localhost:5173/auth/email-validation?token=${token}"> Este enlace </a></h1>`
    });
}

const getTemplate = async (templatePath, templateVar) => {
        const emailTemplate = path.join(__dirname, templatePath) //navegacion de rutas
        const template = await ejs.renderFile(emailTemplate, templateVar);
        return template;
};

const sendWelcomeEmail = async (email, data) => {
    const token = jwt.sign({ email }, process.env.EMAIL_SECRET, { expiresIn: '3d', algorithm: 'HS512' });
    //Encontrar la ruta del template que denderizaremos
    const template = await getTemplate("../views/welcome-email.ejs", {
        ...data,
         token
        })

    const attachments = await getImages('/views/images');

    sendMail(email, 'Bienvenido a academlo CHAT' , template, attachments);
};


module.exports = sendWelcomeEmail;