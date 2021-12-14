import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Station from './station.model';


/**
 * Función encargada de agregar una nueva estación al sistema. 
 * @route Post '/station/'
 * @param req Request de la petición, se espera que tenga la información de la nueva estación.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" de la nueva estación si todo sale bien.
 */
export const createStation: RequestHandler = async (req, res) => {

};

/**
 * Función encargada de actualizar una compañía del sistema en función de los nuevos valores ingresados.
 * @route Put '/station/:id'
 * @param req Request de la petición, se espera que tenga la nueva información de la estación y su respectivo id por params.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" de la estación actualizada si todo sale bien.
 */
export const updateStation: RequestHandler = async (req, res) => {
    
};

/**
 * Función encargada de obtener una compañía del sistema y retornar los datos de ella para su posterior visualización.
 * @route Get '/station/:id'
 * @param req Request de la petición, se espera que tenga el id de la estación.
 * @param res Response, retorna un object con succes: true, data: { station:{} }, message: "String" de la estación si todo sale bien.
 */
export const readStation: RequestHandler = async (req, res) => {
    
};

/**
 * Función encargada de eliminar una compañía del sistema.
 * @route Delete '/station/:id'
 * @param req equest de la petición, se espera que tenga el id de la estación.
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" de la estación eliminada si todo sale bien.
 */
export const deleteStation: RequestHandler = async (req, res) => {
    
};
