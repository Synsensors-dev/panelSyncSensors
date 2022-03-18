import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import config from "../config/config";
import User from "../routes/User/user.model";

/**
 * Middleware que maneja la válidación del rol de usuario
 * @param req Request de la peticion, se espera que tenga el headers authorization
 * @param res Response, si algo falla con el token, retorna el mensaje de error
 * @param next Siguiente handler a cargar
 */
export const isUser: RequestHandler = async (req, res, next) => {
	roleValidation(req, res, next, config.USER );
} 

/**
 * Middleware que maneja la validacion del rol de administrador
 * @param req Request de la peticion, se espera que tenga el headers authorization
 * @param res Response, si algo falla con el token, retorna el mensaje de error
 * @param next Siguiente handler a cargar
 */
export const isAdmin: RequestHandler = async (req, res, next) => {
	roleValidation(req, res, next, config.ADMIN);
} 

/**
 * Middleware que maneja la validacion del rol de administrador
 * @param req Request de la peticion, se espera que tenga el headers authorization
 * @param res Response, si algo falla con el token, retorna el mensaje de error
 * @param next Siguiente handler a cargar
 */
 export const isSuperAdmin: RequestHandler = async (req, res, next) => {
	roleValidation(req, res, next, config.SUPER_ADMIN);
} 

/**
 * Middleware que maneja la validacion de alguno de los 3 roles definidos -> User, Admin y SuperAdmin
 * @param req Request de la peticion, se espera que tenga el headers authorization
 * @param res Response, si algo falla con el token, retorna el mensaje de error
 * @param next Siguiente handler a cargar
 */
 export const isRol: RequestHandler = async (req, res, next) => {

	if ( !req.headers.authorization )
		return res.status(400).send({ success: false, message: 'Los encabezados no tienen un parámetro de autorización.' });

	const token = req.headers.authorization.split(' ')[1];

	if ( !token )
		return res.status(400).send({ success: false, message: 'Autorización de encabezado de sintaxis incorrecta.' });

	const payload: any = jwt.verify(token, config.jwtSecret);

	const _id = payload._id;

    const user = await User.findById( _id ).populate("roles");;

	if ( !user ){
		return res.status(404).send({ success: false, message: 'Usuario no existente' });
	}

	for ( let i = 0; i < user.roles.length ; i++ ){
		if ( user.roles[i].name == config.USER ||  user.roles[i].name == config.ADMIN || user.roles[i].name == config.SUPER_ADMIN ){
			next();
			return;
		}
	}

	return res.status(400).send({ success: false, message: 'El Usuario ingresado no tiene un rol válido para acceder a la ruta' });
} 

/**
 * Función auxiliar encargada de hacer las validaciones de cada uno de los roles ingresados por el parámetro
 * @param req Request de la peticion, se espera que tenga el headers authorization
 * @param res Response, si algo falla con el token, retorna el mensaje de error
 * @param next Siguiente handler a cargar
 * @param rol rol a validar
 */
async function roleValidation (req:any, res:any, next:any, rol:any ){
	
	if ( !req.headers.authorization )
		return res.status(400).send({ success: false, message: 'Los encabezados no tienen un parámetro de autorización.' });

	const token = req.headers.authorization.split(' ')[1];

	if ( !token )
		return res.status(400).send({ success: false, message: 'Autorización de encabezado de sintaxis incorrecta.' });

	const payload: any = jwt.verify(token, config.jwtSecret);

	const _id = payload._id;

    const user = await User.findById( _id ).populate("roles");;

	if ( !user ){
		return res.status(404).send({ success: false, message: 'Usuario no existente' });
	}

	for ( let i = 0; i < user.roles.length ; i++ ){

		if ( user.roles[i].name == config.SUPER_ADMIN ){
			next();
			return;
		}

		if ( user.roles[i].name == rol ){
			next();
			return;
		}
	}

	return res.status(400).send({ success: false, message: 'Usuario sin autorización para acceder a esta ruta.' });
}
