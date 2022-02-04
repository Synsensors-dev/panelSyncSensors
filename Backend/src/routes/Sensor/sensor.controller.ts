import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Sensor from './sensor.model';
import Station from '../Station/station.model';
import Company from '../Company/company.model';
import Reading from '../Reading/reading.model';
import config from "../../config/config";



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
    
    const sensors:any = {
        quantity: 0,
        types: []
    }

    //Se itera en busca de los tipos de sensores almacenados en la BD
    for ( let i = 0; i < config.TYPES.length ; i++ ) {
        const type = await Sensor.find({ id_company: _idCompany }).count({ type: config.TYPES[i] });

        //se filtran los tipos de sensores existentes
        if ( type > 0 ){
            const object = {
                name: config.TYPES[i],
                exist: true
            }

            //se inserta en el arreglo
            sensors.types.push(object);
            sensors.quantity++;
        }
    }

    return res.status(200).send( { 
        success: true, 
        data:{ quantitySensors: sensors.quantity, typesSensors: sensors.types }, 
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
 * Función encargada de actualizar el tiempo en el que son enviadas las alertas a las compañias
 * @route Put '/sensor/alert_time/:id'
 * @param req Request de la petición, se espera que tenga el id del sensor
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" del alert_time si todo sale bien.
 */
export const updateAlertTime: RequestHandler = async (req, res) => {
    const _idSensor = req.params.id;
    const alert_time = req.body.alert_time; //minutos

    //se valida el _id ingresado del sensor
    if ( !Types.ObjectId.isValid( _idSensor ))
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const sensorFound = await Sensor.findById( _idSensor );

    //se valida la existencia del sensor en el sistema
    if ( !sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El sensor ingresado no existe en el sistema.' });

    //se valida que alert_time contenga un valor
    if ( !alert_time )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: no se ingresó valor para alert_time.' });
  
    //se actualiza el alert_time desde la BD
    await Sensor.findByIdAndUpdate( _idSensor, { "alert_time": alert_time });
    
    return res.status(200).send( { success: true, data:{}, message: 'Alert_time actualizado de manera correcta.'});
}

/**
 * Función encargada de obtener la cantidad total de sensores y los sensores activos de ese total
 * @route Put '/panel/sensors/:id_company'
 * @param req Request de la petición, se espera que tenga el id de la compañia
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" de los sensores de la compañia
 */
export const sensorsON: RequestHandler = async (req, res) => {
    const id_company = req.params.id_company;

    //se valida el _id ingresado de la compañia
    if ( !Types.ObjectId.isValid( id_company ))
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const companyFound = await Company.findById( id_company );

    //Se valida la existencia de la compañia
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });

    const quantitySensorsCompany = await Sensor.find({ id_company }).count();
    const quantitySensorsCompanyON = await Sensor.find({ "id_Company": id_company , "status": true }).count();
    
    return res.status(200).send({ success: true, data:{
        quantitySensors: quantitySensorsCompany,
        quantitySensorsON: quantitySensorsCompanyON
    }, message: 'Cantidad de sensores encontrados con éxito'});
}
