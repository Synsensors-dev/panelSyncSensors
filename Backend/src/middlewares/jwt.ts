import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();

/**
 * Obtiene un token usando como payload el id, y como clave una variable de entorno
 * @param id Id del usuario, sobre el cual se obtendra el token
 * @returns token del usuario
 */
export function signToken(id: any, expiresIn: number) {
	const token = jwt.sign({ _id: id }, config.jwtSecret, {
		expiresIn: expiresIn 
	});

	return token;
}
