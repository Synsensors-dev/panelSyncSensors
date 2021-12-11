import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Company from './company.model';


/**
 * Función encargada de agregar una nueva compañía al sistema. 
 * @route Post '/company/'
 * @param req Request de la petición, se espera que tenga la información de la nueva compañía.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" de la nueva compañia si todo sale bien.
 */
export const createCompany: RequestHandler = async (req, res) => {

};

/**
 * Description
 * @route Put '/company/:id'
 * @param req 
 * @param res 
 */
export const updateCompany: RequestHandler = async (req, res) => {
    
};

/**
 * Description
 * @route Get '/company/:id'
 * @param req 
 * @param res 
 */
export const readCompany: RequestHandler = async (req, res) => {
    
};

/**
 * Description
 * @route Delete '/company/:id'
 * @param req 
 * @param res 
 */
export const deleteCompany: RequestHandler = async (req, res) => {
    
};
