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

/**
 * Envía un correo al usuario cuando es registrado en el sistema para que pueda crear su contraseña.
 * @param user -> el cual contiene todos los datos del usuario.
 */
export async function sendFirstRegistrationEmail( user: any , token: any){
    try {
        const contentHTML = `
        <h1>¡Te damos la bienvenida a SyncSensors!</h1>
        <h2> Estimado/a ${user.name}, es un agrado saber que formarás parte de SyncSensors.</h2>
        <p> Tu cuenta actualmente se encuentra creada dentro de la plataforma de SyncSensors. Sin embargo,
        no se le ha asignado una contraseña, entregandote la libertad a tí como usuario el poder hacerlo.Por lo tanto, a
        continuación se te dejará un enlace el cual deberás clickear para crear tu contraseña y terminar de activar tu cuenta. </p>
        <ul>
            <li>Nombre usuario: ${user.name}</li>
            <li>Email de cuenta: ${user.email}</li>
        </ul>

        <p>http://localhost:4200/user/resetPassword/${token}</p>

        <p>Saludos Cordiales,
        Equipo de SyncSensors</p>
        <a href="https://ibb.co/QMH6S51"><img src="https://i.ibb.co/fHNC6cP/logo-syncsensors-1.png" alt="logo-syncsensors-1" border="0"></a>   
        `;

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"¡Bienvenido/a a SyncSensors!" <developers@syncsensors.com>', // sender address
            to: user.email, // list of receivers
            subject: "SyncSensors", // Subject line
            html: contentHTML, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log(error);
    }
}

/**
 * Envía un correo al usuario notificandole la solicitud de cambio de contraseña.
 * @param user -> el cual contiene todos los datos del usuario.
 */
export async function sendEmailForgotPassword( user: any , token: any){
    try {
        const contentHTML = `     
        <h1>Solicitud de cambio de contraseña de la cuenta de SyncSensors</h1>
        <p> Estimado/a ${user.name}:</p>
        <p> Hemos recibido una solicitud para recuperar el acceso a la cuenta de SyncSensors ${user.email}.</p>
        <p>Si la has enviado tú, puedes clickear el siguiente enlace para poder generar una nueva contraseña.</p>

        <p>http://localhost:4200/user/resetPassword/${token}</p>

        <p>Gracias por su paciencia.</p>
        <p>Atentamente; el equipo de SyncSensors.</p> 
        <a href="https://ibb.co/QMH6S51"><img src="https://i.ibb.co/fHNC6cP/logo-syncsensors-1.png" alt="logo-syncsensors-1" border="0"></a>   
        `;

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"SyncSensors" <developers@syncsensors.com>', // sender address
            to: user.email, // list of receivers
            subject: "Alerta de seguridad crítica", // Subject line
            html: contentHTML, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log(error);
    }
}

/**
 * Envía un correo al usuario indicando que su contraseña ha sido actualizada.
 * @param user -> el cual contiene todos los datos del usuario.
 */
export async function sendEmailNewPassword( user: any ){
    try {
        const contentHTML = `
        <h1>Solicitud de cambio de contraseña de la cuenta de SyncSensors</h1>
        <p> Estimado/a ${user.name}:</p>
        <p> Su contraseña asociada a su cuenta: ${user.email}, ha sido actualizada de manera exitosa.</p>
        <p>Por favor, cuide de sus contraseñas. Ningún administrador de SyncSensors se la solicitará.</p>

        <p>Gracias por su paciencia.</p>
        <p>Atentamente; el equipo de SyncSensors.</p> 
        <a href="https://ibb.co/QMH6S51"><img src="https://i.ibb.co/fHNC6cP/logo-syncsensors-1.png" alt="logo-syncsensors-1" border="0"></a>   
        `;

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"SyncSensors" <developers@syncsensors.com>', // sender address
            to: user.email, // list of receivers
            subject: "Actualización de contraseña", // Subject line
            html: contentHTML, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log(error);
    }
}

/**
 * Envía un correo al usuario indicando que su contraseña ha sido actualizada.
 * @param company -> el cual contiene todos los datos de la compañia
 * @param station -> el cual contiene todos los datos de la estación
 * @param sensor -> el cual contiene todos los datos del sensor
 * @param alert -> el cual contiene todos los datos de la alerta
 */
export async function sendEmailAlert( company: any, station: any, sensor:any, alert:any ){
    try {
        const contentHTML = `
        <h1> ¡Alerta de lectura en el sensor ${sensor.name} de la estación ${station.name}! </h1>
        <p> La última lectura asociada al sensor ${sensor.name} esta fuera de los rangos establecidos. </p>
        <ul>
            <li>Rangos establecidos: ${sensor.min_config} (mínimo) y ${sensor.max_config} (máximo).</li>
            <li>Valor de la lectura obtenido: ${alert.value}.
        </ul>
        <p> Por favor, revisar lo antes posible el objetivo de lectura del sensor.</p>

        <p>Atentamente; el equipo de SyncSensors.</p> 
        <a href="https://ibb.co/QMH6S51"><img src="https://i.ibb.co/fHNC6cP/logo-syncsensors-1.png" alt="logo-syncsensors-1" border="0"></a>   
        `;

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"SyncSensors" <developers@syncsensors.com>', // sender address
            to: company.email, // list of receivers
            subject: "¡Alerta de Sensor!", // Subject line
            html: contentHTML, // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } catch (error) {
        console.log(error);
    }
}
