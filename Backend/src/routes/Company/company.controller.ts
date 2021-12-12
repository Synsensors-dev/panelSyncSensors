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
    const { name, email, address, representative_name } = req.body;

    //se validan los atributos 
    if ( !name || !email || !address || !representative_name )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: Datos inválidos.' });
    
    const companyFound = await Company.findOne( { name } );

    //se válida la existencia de la compañia en el sistema
    if ( companyFound )
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: La compañia ya está registrada en el sistema.' })

    const newCompany = { name, email, address, representative_name };

    //se almacena la compañia en el sistema
    const companySaved = new Company(newCompany);
    await companySaved.save();

    return res.status(200).send( { success: true, data:{ _id: companySaved._id }, message: 'Compañia agregada con éxito al sistema.'} );
};

/**
 * Función encargada de actualizar una compañía del sistema en función de los nuevos valores ingresados.
 * @route Put '/company/:id'
 * @param req Request de la petición, se espera que tenga la nueva información de la compañia y su respectivo id por params.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" de la compañia actualizada si todo sale bien.
 */
export const updateCompany: RequestHandler = async (req, res) => {
    
};

/**
 * Función encargada de obtener una compañía del sistema y retornar los datos de ella para su posterior visualización.
 * @route Get '/company/:id'
 * @param req Request de la petición, se espera que tenga el id de la compañia.
 * @param res Response, retorna un object con succes: true, data: { company:{} }, message: "String" de la compañia si todo sale bien.
 */
export const readCompany: RequestHandler = async (req, res) => {
    
};

/**
 * Función encargada de eliminar una compañía del sistema.
 * @route Delete '/company/:id'
 * @param req equest de la petición, se espera que tenga el id de la compañia.
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" de la compañia eliminada si todo sale bien.
 */
export const deleteCompany: RequestHandler = async (req, res) => {
    
};
