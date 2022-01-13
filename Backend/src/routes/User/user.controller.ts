import { RequestHandler } from "express";
import User, { IUser } from './user.model';
import { signToken } from "../../middlewares/jwt";
import Role from "../../models/role.model";
import { sendEmailForgotPassword, sendFirstRegistrationEmail } from "../../middlewares/sendEmail";

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

    //se almacena en la BD el usuario nuevo
    const savedUser = await newUser.save();
    const token = signToken( savedUser._id );

    //se envía el correo de bienvenida
    sendFirstRegistrationEmail(savedUser);

    return res.status(201).send({ success: true, data: { /*token*/ }, message: 'Se ha creado correctamente el nuevo usuario.' });
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

    const token = signToken( userFound._id );

    return res.status(200).send({ success: true, data:{ token, 'user': userFound }, message: 'Inicio de sesión exitoso.' });
}

export const forgotPassword: RequestHandler = async (req, res) => {
    const email = req.body;

    const userFound = await User.findOne({ email});

    //Se valida la existencia del usuario
    if ( !userFound )
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });

    //se envía el correo para que el usuario restablesca su cuenta
    sendEmailForgotPassword(userFound);

    return res.status(200).send({ success: true, data:{}, message: 'Se envió un correo al usuario de manera exitosa.' });
}

export const newPassword: RequestHandler = async (req, res) => {
    const _id = req.params.id;
    const newPassword = req.body;

    let userFound = await User.findById( _id );

    //Se valida la existencia del usuario
    if ( !userFound )
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });

    userFound.password = String(userFound.encryptPassword( newPassword ));

    //se actualiza la password
    await User.findByIdAndUpdate(_id, userFound );
    
    return res.status(200).send({ success: true, data:{}, message: 'Contraseña actualizada con exito.' });
}
