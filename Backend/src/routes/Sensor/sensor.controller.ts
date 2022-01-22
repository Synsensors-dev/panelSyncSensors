import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Sensor from './sensor.model';
import Station from '../Station/station.model';
import Company from '../Company/company.model';
import Reading from '../Reading/reading.model';

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

    const stationFound = await Station.findById( id_station );

    //Se valida la existencia de la estación ingresada
    if ( !stationFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La estación ingresada no existe en el sistema.' });
 
    const newSensor = {
        name: data.name,
        type: data.type,
        frecuency: data.frecuency,
        min_config: data.min_config,
        max_config: data.max_config,
        status: data.status,
        id_station: id_station,
        id_company: stationFound.id_company
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

    //se válida la existencia de la estación en el sistema
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
        id_station: updatedSensor.id_station,
        id_company: stationFound.id_company 
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

    const sensorFound = await Sensor.findById( _idSensor );

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
        id_station: sensorFound.id_station,
        id_company: sensorFound.id_company
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

/**
 * Función encargada verificar los tipos de sensores existentes en la BD
 * @route Get '/sensor/types/:id_company'
 * @param req Request de la petición, se espera que tenga el id de la compañia
 * @param res Response, retorna un object con succes: true, data: { quantitySensor, typesSensors}, message: "String" de los tipos de sensores existentes en la BD.
 */
export const typesOfSensors: RequestHandler = async (req, res) => {
    const _idCompany = req.params.id_company;

    //se valida el _id ingresado de la compañia
    if ( !Types.ObjectId.isValid( _idCompany ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const companyFound = await Company.findById( _idCompany );

    //se valida la existencia de la compañia en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });

    //Se definen los tipos de sensores existentes y la estructura de retorno al front
    const typesSensors = {
        quantity: 0,
        types: [
            { name: 'TEMPERATURE_LIQUID ', exist: false },
            { name: 'TDS', exist: false },
            { name: 'PH', exist: false },
            { name: 'CO2_GAS', exist: false },
            { name: 'TEMPERATURE_AIR', exist: false },
            { name: 'HUMIDITY_AIR', exist: false },
            { name: 'SOUND', exist: false },
            { name: 'DISSOLVED_OXYGEN ', exist: false },
            { name: 'TURBIDITY ', exist: false },
            { name: 'CONDUCTIVITY', exist: false },
            { name: 'OPTICAL_DUST', exist: false },
        ]
    }

    //Se itera en busca de los tipos de sensores almacenados en la BD
    for ( let i = 0; i < typesSensors.types.length ; i++ ) {
        const type = await Sensor.find({ id_company: _idCompany }).count({ type: typesSensors.types[i].name });

        if ( type > 0 ){
            typesSensors.types[i].exist = true;
            typesSensors.quantity++;
        }
    }

    return res.status(200).send( { 
        success: true, 
        data:{ quantitySensors: typesSensors.quantity, typesSensors: typesSensors.types }, 
        message: 'Tipos de sensores encontrados.'
    });
}

/**
 * Función encargada de actualizar los valores especificos de min_config & max_config
 * @route Put '/sensor/config/:id'
 * @param req Request de la petición, se espera que tenga el id de la sensor.
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" del sensor editado correctamente
 */
export const updateMinAndMax: RequestHandler = async (req, res) => {
    const _idSensor = req.params.id;
    const { min_config, max_config } = req.body;

    //se valida el _id ingresado del sensor
    if ( !Types.ObjectId.isValid( _idSensor ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

        const sensorFound = await Sensor.findById( _idSensor );

    //se valida la existencia del sensor en el sistema
    if ( !sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El sensor ingresado no existe en el sistema.' });

    //se valida que min tenga valor 
    if ( !min_config  && !max_config)
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: no se ingresó valores para min y max.' });

    //Se actualiza solo min_config
    if ( min_config && !max_config ){
        await Sensor.findByIdAndUpdate( _idSensor, {"min_config": min_config} );
    }

    //Se actualiza solo max_config
    if ( !min_config && max_config ){
        await Sensor.findByIdAndUpdate( _idSensor, {"max_config": max_config} );
    } 

    //Se actualizan min_config y max_config
    if ( min_config && max_config ){
        await Sensor.findByIdAndUpdate( _idSensor, {"min_config": min_config, "max_config": max_config} );
    }

    return res.status(200).send( { success: true, data:{}, message: 'Min_config y Max_config actualizados de manera correcta.'});
}

/**
 * Función encargada de filtrar las estaciones, sensores y lecturas asociadas a una compañia en particular. 
 * @route Get '/panel/stations'
 * @param req Request de la petición, se espera que tenga el id de la compañia y el tipo del sensor a buscar
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" de las estaciones si todo sale bien.
 */
export const readPanelStations: RequestHandler = async (req, res) => {
    const { id_company , type } = req.body;

    //se valida el _id ingresado de la compañia
    if ( !Types.ObjectId.isValid( id_company ))
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const companyFound = await Company.findById( id_company );

    //se valida la existencia de la compañia en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia solicitada no existe en el sistema.' });

    const sensors = await Sensor.find({ id_company: id_company, type: type });
    const stationsFiltered = [];

    //Se itera en la cantidad de sensores en función a los paramostros de busqueda
    for (let i = 0; i < sensors.length; i++){
        const station = await Station.findById( { _id: sensors[i].id_station } );
        const reading = await Reading.findOne({ id_sensor: sensors[i]._id }).sort({ createdAt: -1 });

        let value = null;

        //se asigna el valor de la ultima lectura
        if ( reading ){
            value = reading.value;
        }
        
        //se arama el objeto estación
        const stationPanel = {
            id_station: station._id,
            name_station: station.name,
            sensor: {
                id_sensor: sensors[i]._id, 
                min_config: sensors[i].min_config,
                max_config: sensors[i].max_config,
                type: sensors[i].type,
                status: sensors[i].status,
                last_reading: value
            }
        }
        //se almacenan los ojetos en el arreglo
        stationsFiltered.push(stationPanel);
    }
    return res.status(200).send( { success: true, data: stationsFiltered, message: 'Estaciones encontradas con exito.'});
}
