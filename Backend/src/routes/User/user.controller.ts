import { RequestHandler } from "express";
import User, { IUser } from './user.model';
import { signToken } from "../../middlewares/jwt";

/**
 * Funcion que maneja la petición de agregar un nuevo usuario al sistema
 * @route Post '/user/signUp'
 * @param req req Request de la petición, se espera que tenga la información del nuevo usuario
 * @param res Response, retornará succes: true, data: {token}, message: "String" del nuevo usuario si todo sale bien.
 */
 export const signUp: RequestHandler = async (req, res) => {
    const { name, email, id_company, permission_level } = req.body;

    //se validan los atributos
    if ( !name || !email || !id_company || !permission_level) 
        return res.status(400).send({ success: false, data:{}, message: 'Error: datos inválidos'+ req.body });

    const userFound = await User.findOne({ email });

    //se valida la existencia del usuario
    if ( userFound )
        return res.status(301).send({ success: false, data:{}, message: 'Error: el usuario ingresado ya existe en el sistema.' });

    const newUser: IUser = new User({
        name: name,
        email: email,
        password: null,
        id_company: id_company,
        permission_level: permission_level
    });

    //se almacena en la BD el usuario nuevo
    const savedUser = await newUser.save();
    const token = signToken( savedUser._id );

    return res.status(201).send({ success: true, data: { token }, message: 'Se ha creado correctamente el nuevo usuario.' });
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
