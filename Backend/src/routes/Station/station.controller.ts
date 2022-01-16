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
    const { id_gateway, id_company, data} = req.body;

    //se valida el id_gateway
    if ( !Types.ObjectId.isValid( id_gateway ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_gateway ingresado no es válido.' });

    //se valida el id_company
    if ( !Types.ObjectId.isValid( id_company ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_company ingresado no es válido.' });

    const companyFound = await Company.findById( id_company );

    //se válida la existencia de la compañía en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });

    //******** se válida la existencia del gateway en el sistema ********

    //se validan los datos obligatorios de la estación
    if ( !data.name || !data.type || !data.status  || !data.location_notes )
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: Los datos a agregar son inválidos.' });

    const newStation = {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        type: data.type,
        status: data.status,
        location_notes: data.location_notes,
        id_gateway: id_gateway,
        id_company: id_company
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
    const _idStation = req.params.id;
    const updatedStation = req.body;

    //se valida el _id ingresado de la estación
    if ( !Types.ObjectId.isValid( _idStation ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });
    
    const stationFound = await Station.findById( _idStation );

    //se valida la existencia de la estación en el sistema
    if ( !stationFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La estación a modificar no existe en el sistema.' });

    //se valida el id_gateway
    if ( !Types.ObjectId.isValid( updatedStation.id_gateway ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_gateway ingresado no es válido.' });

    //se valida el id_company
    if ( !Types.ObjectId.isValid( updatedStation.id_company ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_company ingresado no es válido.' });

    const companyFound = await Company.findById( updatedStation.id_company );

    //se válida la existencia de la compañía en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });

    //******** se válida la existencia del gateway en el sistema ********

    //se validan los datos obligatorios de la estación
    if ( !updatedStation.data.name || !updatedStation.data.type || !updatedStation.data.status  || !updatedStation.data.location_notes )
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: Los datos a agregar son inválidos.' });
      
    const station = {
        name: updatedStation.data.name,
        latitude: updatedStation.data.latitude,
        longitude: updatedStation.data.longitude,
        type: updatedStation.data.type,
        status: updatedStation.data.status,
        location_notes: updatedStation.data.location_notes,
        id_gateway: updatedStation.id_gateway,
        id_company: updatedStation.id_company
    }

    //se actualiza la estación en el sistema
    await Station.findByIdAndUpdate( _idStation, station );

    return res.status(200).send({ success: true, data:{ _id: _idStation }, message: 'Estación modificada de manera correcta.' });
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
        id_gateway: stationFound.id_gateway,
        id_company: stationFound.id_company
    }, message: 'Estación encontrada con éxito.'});
};

/**
 * Función encargada de eliminar una estación del sistema.
 * @route Delete '/station/:id'
 * @param req Request de la petición, se espera que tenga el id de la estación.
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" de la estación eliminada si todo sale bien.
 */
export const deleteStation: RequestHandler = async (req, res) => {
    const _idStation = req.params.id;

    //se valida el _id ingresado de la estación
    if ( !Types.ObjectId.isValid( _idStation ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const stationFound = await Station.findById( _idStation );

    //se valida la existencia de la estación en el sistema
    if ( !stationFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La estación solicitada no existe en el sistema.' });

    /***** Se eliminan las relaciones (sensors, readings, alerts) asociadas a la estación ingresado *****/

    //se elimina la estación del sistema
    await Station.findByIdAndRemove( _idStation );

    return res.status(200).send( { success: true, data:{}, message: 'Estación eliminada de manera correcta.'});
}
