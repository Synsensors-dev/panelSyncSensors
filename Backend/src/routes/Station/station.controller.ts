import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Station from './station.model';
import Company from '../Company/company.model';

/**
 * Función encargada de agregar una nueva estación al sistema. 
 * @route Post '/station/'
 * @param req Request de la petición, se espera que tenga la información de la nueva estación.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" de la nueva estación si todo sale bien.
 */
export const createStation: RequestHandler = async (req, res) => {
    const { gateway_id, company_id, dataNewStation } = req.body;

    //se valida el gateway_id
    if ( !Types.ObjectId.isValid( gateway_id ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El gateway_id ingresado no es válido.' });

    //se valida el company_id
    if ( !Types.ObjectId.isValid( company_id ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El company_id ingresado no es válido.' });

    const companyFound = await Company.findById( company_id );

    //se válida la existencia de la compañía en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });

    //******** se válida la existencia del gateway en el sistema ********

    //se validan los datos obligatorios de la estación
    if ( !dataNewStation.name || !dataNewStation.type || !dataNewStation.status  || !dataNewStation.location_notes )
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: Los datos a agregar son inválidos.' });

    //se valida que no exista otra estación igual en el sistema
    const stationFound = await Station.findOne( dataNewStation.name );

    if ( stationFound )
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: La estación ya está registrada en el sistema.' });

    const newStation = {
        name: dataNewStation.name,
        latitude: dataNewStation.latitude,
        longitude: dataNewStation.longitude,
        type: dataNewStation.type,
        status: dataNewStation.status,
        location_notes: dataNewStation.location_notes,
        gateway_id: gateway_id,
        company_id: company_id
    }

    //se almacena la estación en el sistema
    const stationSaved = new Station( newStation );
    await stationSaved.save();

    return res.status(201).send({ success: true, data: { _id: stationSaved._id }, message: 'Estación agregada con éxito al sistema.' });
};

/**
 * Función encargada de actualizar una estación del sistema en función de los nuevos valores ingresados.
 * @route Put '/station/:id'
 * @param req Request de la petición, se espera que tenga la nueva información de la estación y su respectivo id por params.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" de la estación actualizada si todo sale bien.
 */
export const updateStation: RequestHandler = async (req, res) => {
    
};

/**
 * Función encargada de obtener una estación del sistema y retornar los datos de ella para su posterior visualización.
 * @route Get '/station/:id'
 * @param req Request de la petición, se espera que tenga el id de la estación.
 * @param res Response, retorna un object con succes: true, data: { station:{} }, message: "String" de la estación si todo sale bien.
 */
export const readStation: RequestHandler = async (req, res) => {
    const _idStation = req.params.id;

    //se valida el _id ingresado de la estación
    if ( !Types.ObjectId.isValid( _idStation ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const stationFound = await Station.findById( _idStation );

    //se valida la existencia de la estación en el sistema
    if ( !stationFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La estación solicitada no existe en el sistema.' });

    return res.status(200).send( { success: true, data:{ 
        _id: stationFound.id,
        name: stationFound.name,
        latitude: stationFound.latitude,
        longitude: stationFound.longitude,
        type: stationFound.type,
        status: stationFound.status,
        location_notes: stationFound.location_notes,
        gateway_id: stationFound.gateway_id,
        company_id: stationFound.company_id
    }, message: 'Estación encontrada con éxito.'});
};

/**
 * Función encargada de eliminar una estación del sistema.
 * @route Delete '/station/:id'
 * @param req equest de la petición, se espera que tenga el id de la estación.
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" de la estación eliminada si todo sale bien.
 */
export const deleteStation: RequestHandler = async (req, res) => {
    
};
