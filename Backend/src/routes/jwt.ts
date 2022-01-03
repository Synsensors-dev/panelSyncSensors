import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Obtiene un token usando como payload el id, y como clave una variable de entorno
 * @param id Id del usuario, sobre el cual se obtendra el token
 * @returns token del usuario
 */
export function signToken(id: any) {
	const token = jwt.sign({ _id: id }, process.env.TOKEN_SECRET || 'secret_key', {
		expiresIn: 86400
	});

	return token;
}
