import { RequestHandler } from "express";
import { Types } from 'mongoose';

/**
 * Función encargada de agregar un nueva sensor al sistema. 
 * @route Post '/sensor/'
 * @param req Request de la petición, se espera que tenga la información de la nueva sensor.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" del nuevo sensor si todo sale bien.
 */
export const createSensor: RequestHandler = async (req, res) => {
    
};

/**
 * Función encargada de actualizar un sensor del sistema en función de los nuevos valores ingresados.
 * @route Put '/sensor/:id'
 * @param req Request de la petición, se espera que tenga la nueva información de la sensor y su respectivo id por params.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" del sensor actualizado si todo sale bien.
 */
export const updateSensor: RequestHandler = async (req, res) => {
    
};

/**
 * Función encargada de obtener un sensor del sistema y retornar los datos de ella para su posterior visualización.
 * @route Get '/sensor/:id'
 * @param req Request de la petición, se espera que tenga el id de la sensor.
 * @param res Response, retorna un object con succes: true, data: { sensor:{} }, message: "String" del sensor si todo sale bien.
 */
export const readSensor: RequestHandler = async (req, res) => {
    
};

/**
 * Función encargada de eliminar un sensor del sistema.
 * @route Delete '/sensor/:id'
 * @param req Request de la petición, se espera que tenga el id de la sensor.
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" del sensor eliminada si todo sale bien.
 */
export const deleteSensor: RequestHandler = async (req, res) => {
    
}
