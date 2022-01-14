import { RequestHandler } from "express";
import User, { IUser } from './user.model';
import { signToken , verifyToken } from "../../middlewares/jwt";
import Role from "../../models/role.model";
import { sendEmailForgotPassword, sendFirstRegistrationEmail, sendEmailNewPassword } from "../../middlewares/sendEmail";

/**
 * Funcion que maneja la petición de agregar un nuevo usuario al sistema
 * @route Post '/user/signUp'
 * @param req req Request de la petición, se espera que tenga la información del nuevo usuario
 * @param res Response, retornará succes: true, data: {token}, message: "String" del nuevo usuario si todo sale bien.
 */
 export const signUp: RequestHandler = async (req, res) => {
    const { name, email, id_company, roles } = req.body;

    //se validan los atributos
    if ( !name || !email || !id_company ) 
        return res.status(400).send({ success: false, data:{}, message: 'Error: datos inválidos'+ req.body });

    const userFound = await User.findOne({ email });

    //se valida la existencia del usuario
    if ( userFound )
        return res.status(301).send({ success: false, data:{}, message: 'Error: el usuario ingresado ya existe en el sistema.' });

    const rolesFound = await Role.find({ name: { $in: roles } });

    const newUser: IUser = new User({
        name: name,
        email: email,
        password: null,
        id_company: id_company,
        roles: rolesFound.map((role:any) => role._id)
    });

    //creación de token
    const token = signToken( newUser._id , 600); //10min
    newUser.resetToken = token;

    //se almacena en la BD el usuario nuevo
    const savedUser = await newUser.save();

    //se envía el correo de bienvenida
    sendFirstRegistrationEmail(savedUser, token);

    return res.status(201).send({ success: true, data: {}, message: 'Se ha creado correctamente el nuevo usuario.' });
}

/**
 * Funcion que maneja el inicio de sesión de un usuario del sistema
 * @route Post /user/signin
 * @param req Request, se espera que tenga la información del usuario
 * @param res Response, retornará succes: true, data: {token, user}, message: "String" del usuario si todo sale bien.
 */
 export const signIn: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    //se validan los atributos
    if ( !email || !password ) 
        return res.status(400).send({ success: false, data:{}, message: 'Error: datos inválidos'+ req.body });

    const userFound = await User.findOne({ email });

    //se valida la existencia del usuario
    if ( !userFound )
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });

    const isMatch:boolean = await userFound.comparePassword( password );

    //se valida la password
    if ( !isMatch )
        return res.status(400).send({ success: false, data:{}, message: 'Error: La contraseña es incorrecta.' });

    const token = signToken( userFound._id , 86400); //24hours

    return res.status(200).send({ success: true, data:{ token, 'user': userFound }, message: 'Inicio de sesión exitoso.' });
}

/**
 * Funcion que maneja la solicitud de recuperar contraseña
 * @route Post /user/forgotPassword
 * @param req Request, se espera que tenga el correo del usuario
 * @param res Response, retornará succes: true, data: {}, message: "String" de que el correo fué enviado para recuperar la contraseña.
 */
export const forgotPassword: RequestHandler = async (req, res) => {
    const email = req.body.email;
    const userFound = await User.findOne({ email });

    //Se valida la existencia del usuario
    if ( !userFound )
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });

    const token = signToken( userFound._id, 600) //10 min

    await User.findByIdAndUpdate(userFound._id, {resetToken: token});

    //se envía el correo para que el usuario restablesca su cuenta
    sendEmailForgotPassword(userFound, token);

    return res.status(200).send({ success: true, data:{}, message: 'Se envió un correo al usuario de manera exitosa.' });
}

/**
 * Funcion que maneja la solicitud de crear o reiniciar una contraseña
 * @route Put /user/resetPassword/:id
 * @param req Request, se espera el id del usuario por params y la nueva contraseña via body en formato json
 * @param res Response, retornará succes: true, data: {}, message: "String"; indicando que la contraseña fue actualizada.
 */
export const newPassword: RequestHandler = async (req, res) => {
    const token = req.params.token;
    const newPassword = req.body.password;

    const isValidToken = verifyToken(token);

    //se valida el token
    if ( !isValidToken ) 
        return res.status(400).send({ success: false, data:{}, message: 'Error: el token es inválido.' });

    //se busca el usuario via token
    const userFound = await User.findOne({ resetToken: token });

    //Se valida la existencia del usuario
    if ( !userFound )
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });

    userFound.password = await userFound.encryptPassword(newPassword);

    //se actualiza la password
    await User.findByIdAndUpdate(userFound._id, userFound );

    //se envía un correo para notificar al usuario
    sendEmailNewPassword(userFound);

    return res.status(200).send({ success: true, data:{}, message: 'Contraseña actualizada con exito.' });
}
