import { RequestHandler } from "express";
import User from './user.model';

/**
 * Funcion que maneja la peticion de agregar un nuevo usuario al sistema
 * @route Post '/user/signUp'
 * @param req req Request de la petición, se espera que tenga la información del nuevo usuario
 * @param res Response, retornará succes: true, data: {token}, message: "String" del nuevo usuario si todo sale bien.
 */
 export const signUp: RequestHandler = async (req, res) => {
    
}

/**
 * Funcion que maneja el inicio de sesion de un usuario del sistema
 * @route Post /user/signin
 * @param req Request, se espera que tenga la información del usuario
 * @param res Response, retornará succes: true, data: {token}, message: "String" del usuario si todo sale bien.
 */
 export const signIn: RequestHandler = async (req, res) => {
    
}
