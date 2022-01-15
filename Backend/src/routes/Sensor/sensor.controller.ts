import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Sensor from './sensor.model';
import Station from '../Station/station.model';

/**
 * Función encargada de agregar un nueva sensor al sistema. 
 * @route Post '/sensor/'
 * @param req Request de la petición, se espera que tenga la información de la nueva sensor.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" del nuevo sensor si todo sale bien.
 */
export const createSensor: RequestHandler = async (req, res) => {
    const { id_station, data } = req.body;

    //se validan los atributos obligatorios o requeridos
    if ( !data.name || !data.type || !id_station ) 
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: Los datos a agregar son inválidos.' });

    //se valida el id_station
    if ( !Types.ObjectId.isValid( id_station ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_station ingresado no es válido.' });
    
    const sensorFound = await Sensor.findOne( data.name );

    //se valida que no exista otro sensor con el mismo name
    if ( sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: Ya existe un sensor con el name ingresado.' });

    const newSensor = {
        name: data.name,
        type: data.type,
        frecuency: data.frecuency,
        min_config: data.min_config,
        max_config: data.max_config,
        status: data.status,
        id_station: id_station
    };

    //se almacena el sensor en el sistema 
    const sensorSaved = new Sensor(newSensor);
    await sensorSaved.save();

    return res.status(201).send({ success: true, data: { _id: sensorSaved._id }, message: 'Sensor agregado con éxito al sistema.' });
};

/**
 * Función encargada de actualizar un sensor del sistema en función de los nuevos valores ingresados.
 * @route Put '/sensor/:id'
 * @param req Request de la petición, se espera que tenga la nueva información de la sensor y su respectivo id por params.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" del sensor actualizado si todo sale bien.
 */
export const updateSensor: RequestHandler = async (req, res) => {
    const _idSensor = req.params.id;
    const updatedSensor = req.body;

    //se valida el _id ingresado del sensor
    if ( !Types.ObjectId.isValid( _idSensor ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });
    
    const sensorFound = await Sensor.findById( _idSensor );

    //se valida la existencia del sensor en el sistema
    if ( !sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El sensor a modificar no existe en el sistema.' });

    const stationFound = await Station.findById( updatedSensor.id_station );

    //se válida la existencia de la compañía en el sistema
    if ( !stationFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La estación ingresada no existe en el sistema.' });

    //se validan los datos obligatorios del sensor
    if ( !updatedSensor.data.name || !updatedSensor.data.type )
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: Los datos a agregar son inválidos.' });
      
    const sensor = {
        name: updatedSensor.data.name,
        type: updatedSensor.data.type,
        frecuency: updatedSensor.data.frecuency,
        min_config: updatedSensor.data.min_config,
        max_config: updatedSensor.data.max_config,
        status: updatedSensor.data.status,
        id_station: updatedSensor.id_station
    }

    //se actualiza la estación en el sistema
    await Sensor.findByIdAndUpdate( _idSensor, sensor );

    return res.status(200).send({ success: true, data:{ _id: _idSensor }, message: 'Sensor modificado de manera correcta.' });
};

/**
 * Función encargada de obtener un sensor del sistema y retornar los datos de ella para su posterior visualización.
 * @route Get '/sensor/:id'
 * @param req Request de la petición, se espera que tenga el id de la sensor.
 * @param res Response, retorna un object con succes: true, data: { sensor:{} }, message: "String" del sensor si todo sale bien.
 */
export const readSensor: RequestHandler = async (req, res) => {
    const _idSensor = req.params.id;

    //se valida el _id ingresado del sensor
    if ( !Types.ObjectId.isValid( _idSensor ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const sensorFound = await Station.findById( _idSensor );

    //se valida la existencia del sensor en el sistema
    if ( !sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El sensor solicitada no existe en el sistema.' });

    return res.status(200).send( { success: true, data:{ 
        _id: sensorFound.id,
        name: sensorFound.name,
        type: sensorFound.type,
        frecuency: sensorFound.frecuency,
        min_config: sensorFound.min_config,
        max_config: sensorFound.max_config,
        status: sensorFound.status,
        id_station: sensorFound.id_station
    }, message: 'Sensor encontrado con éxito.'});
};

/**
 * Función encargada de eliminar un sensor del sistema.
 * @route Delete '/sensor/:id'
 * @param req Request de la petición, se espera que tenga el id de la sensor.
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" del sensor eliminada si todo sale bien.
 */
export const deleteSensor: RequestHandler = async (req, res) => {
    const _idSensor = req.params.id;

    //se valida el _id ingresado del sensor
    if ( !Types.ObjectId.isValid( _idSensor ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const sensorFound = await Sensor.findById( _idSensor );

    //se valida la existencia del sensor en el sistema
    if ( !sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El sensor solicitado no existe en el sistema.' });

    /***** Se eliminan las relaciones (readings, alerts) asociadas al sensor ingresado *****/

    //se elimina el sensor del sistema
    await Sensor.findByIdAndRemove( _idSensor );

    return res.status(200).send( { success: true, data:{}, message: 'Sensor eliminado de manera correcta.'});
}

export const typesOfSensors: RequestHandler = async (req, res) => {
}

export const updateMinAndMax: RequestHandler = async (req, res) => {
}

