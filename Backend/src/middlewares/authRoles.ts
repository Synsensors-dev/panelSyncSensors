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
	roleValidation(req, res, next, "user");
} 

/**
 * Middleware que maneja la validacion del rol de administrador
 * @param req Request de la peticion, se espera que tenga el headers authorization
 * @param res Response, si algo falla con el token, retorna el mensaje de error
 * @param next Siguiente handler a cargar
 */
export const isAdmin: RequestHandler = async (req, res, next) => {
	roleValidation(req, res, next, "admin");
} 

/**
 * Middleware que maneja la validacion del rol de super administrador
 * @param req Request de la peticion, se espera que tenga el headers authorization
 * @param res Response, si algo falla con el token, retorna el mensaje de error
 * @param next Siguiente handler a cargar
 */
export const isSuperAdmin: RequestHandler = async (req, res, next) => {
	roleValidation(req, res, next, "super_admin");
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
		return res.status(400).send({ success: false, message: 'Headers dont have authorization param.' });

	const token = req.headers.authorization.split(' ')[1];

	if ( !token )
		return res.status(400).send({ success: false, message: 'Bad syntax header authorization.' });

	const payload: any = jwt.verify(token, config.jwtSecret);

	const _id = payload._id;

    const user = await User.findById( _id ).populate("roles");;

	if ( !user ){
		return res.status(404).send({ success: false, message: 'User not exist.' });
	}

	for ( let i = 0; i < user.roles.length ; i++ ){
		if ( user.roles[i].name == rol ){
			console.log(user.roles[i].name);
			next();

			return;
		}
	}

	return res.status(400).send({ success: false, message: 'User without authorization to access the route.' });
}
