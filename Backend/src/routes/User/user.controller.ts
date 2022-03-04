import { RequestHandler } from "express";
import User, { IUser } from './user.model';
import { signToken } from "../../middlewares/jwt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../../config/config';
import Role from "../../models/role.model";
import { sendEmailForgotPassword, sendFirstRegistrationEmail, sendEmailNewPassword } from "../../middlewares/sendEmail";
import { Types } from "mongoose";
import Company from '../Company/company.model';

dotenv.config();

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
        id_company: id_company,
        roles: rolesFound.map((role:any) => role._id)
    });

    //creación de token
    const token = signToken( newUser._id , config.SECONDS_DAY * 3); // 3 days
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

    const token = signToken( userFound._id , config.SECONDS_DAY); //24hours

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

    //se valida el email ingresado
    if ( !email )
        return res.status(400).send({ success: false, data:{}, message: 'Error: no se ingresó ningún email.' });

    //Se valida la existencia del usuario
    if ( !userFound )
        return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });

    const token = signToken( userFound._id, config.SECONDS_MINUTE * 10) //10 min

    await User.findByIdAndUpdate(userFound._id, {resetToken: token});

    //se envía el correo para que el usuario restablesca su cuenta
    sendEmailForgotPassword(userFound, token);

    return res.status(200).send({ success: true, data:{}, message: 'Se envió un correo al usuario de manera exitosa.' });
}

/**
 * Funcion que maneja la solicitud de crear o reiniciar una contraseña
 * @route Put /user/resetPassword/:id
 * @param req Request, se espera el token asociado al usuario por params y la nueva contraseña via body en formato json
 * @param res Response, retornará succes: true, data: {}, message: "String"; indicando que la contraseña fue actualizada.
 */
export const newPassword: RequestHandler = async (req, res) => {
    const token = req.params.token;
    const newPassword = req.body.password;

    //se valida que el token no venga vacío
    if ( !token )
        return res.status(404).send({ success: false, data:{}, message: 'Error: No se a ingresado ningún token'})

    //se verifica que el token sea válido
    jwt.verify(token, config.jwtSecret, async function( err: any , decodedToken: any ){

        //se valida si expiró o es defectuoso
        if ( err )
            return res.status(400).send({ success: false, data:{}, message:'ERROR: Token incorrecto o expirado'});

        const _id = decodedToken;
        const userFound = await User.findById(_id);

         //Se valida la existencia del usuario
        if ( !userFound )
            return res.status(404).send({ success: false, data:{}, message: 'Error: el usuario ingresado no existe en el sistema.' });

        userFound.password = await userFound.encryptPassword(newPassword);

        //se actualiza la password
        await User.findByIdAndUpdate(userFound._id, userFound );

        //se envía un correo para notificar al usuario
        sendEmailNewPassword(userFound);

        return res.status(200).send({ success: true, data:{}, message: 'Contraseña actualizada con exito.' });
    });   
}

/**
 * Función encargada de obtener un usuario del sistema y retornar los datos de el para su posterior visualización.
 * @route Get '/user/:id'
 * @param req Request de la petición, se espera que tenga el id del usuario.
 * @param res Response, retorna un object con succes: true, data: { user:{} }, message: "String" del usuario si todo sale bien.
 */
export const readUser: RequestHandler = async (req, res) => {
    const _idUser = req.params.id;

    //se valida el _id ingresado del usuario
    if ( !Types.ObjectId.isValid( _idUser ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const userFound = await User.findById( _idUser ).populate("roles");

    //se valida la existencia del usuario en el sistema
    if ( !userFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El usuario solicitado no existe en el sistema.' });

    return res.status(200).send( { success: true, data:{ 
        name: userFound.name,
        email: userFound.email,
        roles: userFound.roles.map( (rol: { name: string; }) => rol.name)
    }, message: 'Usario encontrado con éxito.'});
}

/**
 * Función encargada de obtener una lista de usuarios asociados a una compañia ingresada.
 * @route Get '/users/:id_company'
 * @param req Request de la petición, se espera que tenga el id de la compañia
 * @param res Response, retorna un object con succes: true, data: { userList }, message: "String" de los usuarios si todo sale bien.
 */
export const usersList: RequestHandler = async (req, res) => {
    const id_company = req.params.id_company;

    //se valida el id_company
    if ( !Types.ObjectId.isValid( id_company ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const companyFound = await Company.findById( id_company );

    //se valida la existencia del usuario en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });

    const usersCompany = await User.find({ "id_company": id_company }).populate("roles");

    //se filtran los datos de la tabla
    const usersFiltered = usersCompany.map( user => {
        return {
            name: user.name,
            roles: user.roles.map( (rol: { name: string; }) => rol.name),
            status: "No definido"
        };
    });

    return res.status(200).send({ success: true, data:{ usersFiltered }, message: 'Usuarios encontrados con exito.' });
}
