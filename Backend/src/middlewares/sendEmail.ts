
export async function sendFirstRegistrationEmail( user: any ){
    try {
        const contentHTML = `
        <img src = "../../../Front-end/src/assets/img/brand/logo-syncsensors-1.png">  
        <h1>¡Te damos la bienvenida a SyncSensors!</h1>
        <h2> Estimado/a ${user.name}, es un agrado saber que formarás parte de SyncSensors.</h2>
        <p> Tu cuenta actualmente se encuentra creada dentro de la plataforma de SyncSensors. Sin embargo,
        no se le ha asignado una contraseña, entregandote la libertad a tí como usuario el poder hacerlo.Por lo tanto, a
        continuación se te dejará un botón el cual deberás clickear para crear tu contraseña y terminar de activar tu cuenta. </p>
        <ul>
            <li>Nombre usuario: ${user.name}</li>
            <li>Email de cuenta: ${user.email}</li>
        </ul>

        <button type="button" href= #>Crear contraseña</button> 

        <p>Saludos Cordiales,
        Equipo de SyncSensors</p>
        `;

        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"¡Bienvenido/a a SyncSensors!" <developers@syncsensors.com>', // sender address
            to: user.email, // list of receivers
            subject: "SyncSensors", // Subject line
            html: contentHTML, // html body
        });

            console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (error) {
        console.log(error);
    }
}

export async function sendEmailForgotPassword( user: any ){
    try {
        const contentHTML = `
        <img src = "../../../Front-end/src/assets/img/brand/logo-syncsensors-1.png">  
        <h1>Solicitud de cambio de contraseña de la cuenta de SyncSensors</h1>
        <p> Estimado/a ${user.name}:</p>
        <p> Hemos recibido una solicitud para recuperar el acceso a la cuenta de SyncSensors ${user.email}.</p>
        <p>Si la has enviado tú, puedes clickear el siguiente botón para poder generar una nueva contraseña.</p>

        <button type="button" href= #>Cambiar Contraseña</button> 

        <p>Gracias por su paciencia.</p>
        <p>Atentamente; el equipo de SyncSensors.</p> 
        `;

        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"SyncSensors" <developers@syncsensors.com>', // sender address
            to: user.email, // list of receivers
            subject: "Alerta de seguridad crítica", // Subject line
            html: contentHTML, // html body
        });

            console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (error) {
        console.log(error);
    }
}

export async function sendEmailNewPassword( user: any ){
    try {
        const contentHTML = `
        <img src = "../../../Front-end/src/assets/img/brand/logo-syncsensors-1.png">  
        <h1>Solicitud de cambio de contraseña de la cuenta de SyncSensors</h1>
        <p> Estimado/a ${user.name}:</p>
        <p> Su contraseña asociada a su cuenta: ${user.email}, ha sido actualizada de manera exitosa.</p>
        <p>Por favor, cuide de sus contraseñas. Ningún administrador de SyncSensors se la solicitará.</p>

        <p>Gracias por su paciencia.</p>
        <p>Atentamente; el equipo de SyncSensors.</p> 
        `;

        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"SyncSensors" <developers@syncsensors.com>', // sender address
            to: user.email, // list of receivers
            subject: "Actualización de contraseña", // Subject line
            html: contentHTML, // html body
        });

            console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (error) {
        console.log(error);
    }
}
