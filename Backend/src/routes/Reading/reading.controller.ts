import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Reading from './reading.model'
import Sensor from '../Sensor/sensor.model';
import { createAlert } from '../Alert/alert.controller';
/**
 * Función encargada de agregar una nueva lectura al sistema
 * @route Post '/reading'
 * @param req Request de la petición, se espera que tenga la información de la nueva lectura
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" de la nueva lectura si todo sale bien.
 */
export const createReading: RequestHandler = async (req, res) => {
    const { id_sensor, value } = req.body;

    //se validan los atributos obligatorios o requeridos
    if ( !id_sensor || !value ) 
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: Los datos a agregar son inválidos.' });

    //se valida el id_sensor
    if ( !Types.ObjectId.isValid( id_sensor) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_sensor ingresado no es válido.' });

    const sensorFound = await Sensor.findById( id_sensor );

    //Se valida la existencia del sensor ingresado
    if ( !sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El sensor ingresado no existe en el sistema.' });
 
    //se crea la lectura
    const newReading = {
        value: value,
        id_sensor: id_sensor,
        type_sensor: sensorFound.type,
        id_station: sensorFound.id_station,
        id_company: sensorFound.id_company
    };

    const readingSaved = new Reading(newReading);

    //se verifica que la lectura no sea una alerta
    if ( value >= sensorFound.min_config && value <= sensorFound.max_config ){

        await readingSaved.save();
        return res.status(201).send({ success: true, data: { _id: readingSaved._id }, message: 'Lectura agregada con éxito al sistema.' });
    }

    const date = new Date();

    //se verifica que se haya enviado una alerta anteriormente
    if ( sensorFound.last_alert ){
        const time_remaining = date.getTime() - sensorFound.last_alert.getTime();

        if ( time_remaining <= (sensorFound.alert_time * 60000) ){

            const min_remaining = ((sensorFound.alert_time - (time_remaining/60000))); //convertido en minutos

            return res.status(200).send({ success: true, data: { }, message: 'Esta lectura generó una alerta, pero aún no es tiempo de enviarla.' + ' Quedan: '+ min_remaining + ' min para enviar la alerta.'});
        }
    }

    res.status(201).send({ success: true, data: { _id: readingSaved._id }, message: 'Lectura y Alerta agregada con éxito al sistema.' });;

    //se genera la alerta
    createAlert( readingSaved, sensorFound );

    return;
}

/**
 * Función encargada de obtener las lecturas asociadas a un sensor, ordenadas desde la mas antigua a la más reciente
 * @route Post '/readings/:id_sensor'
 * @param req Request de la petición, se espera que tenga el id del sensor
 * @param res Response, retorna un object con succes: true, data: {readings:{}}, message: "String" de las lecturas asociadas al sensor.
 */
export const sensorReadings: RequestHandler = async (req, res) => {
    const id_sensor = req.params.id_sensor;

    //se valida el id_sensor
    if ( !Types.ObjectId.isValid( id_sensor) )
    return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_sensor ingresado no es válido.' });

    const sensorFound = await Sensor.findById( id_sensor );

    //Se valida la existencia del sensor ingresado
    if ( !sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El sensor ingresado no existe en el sistema.' });

    //se obtienen las lecturas asociadas al sensor
    const sensorReadings = await Reading.find({ id_sensor: id_sensor }).sort({ createdAt: -1 }).limit(100);

    //Se invierte el arreglo para enviarlo desde la lectura mas antigua a la mas nueva
    sensorReadings.reverse();


    const sensorReadingsFiltered = sensorReadings.map( reading => { return {
        _id: reading._id,
        value: reading.value,
        timestamp: reading.createdAt
    }});
    
    return res.status(200).send({ success: true, data: sensorReadingsFiltered , message: 'Lecturas asociadas al sensor encontradas con exito.' });
}
