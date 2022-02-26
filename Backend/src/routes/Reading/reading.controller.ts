import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Reading from './reading.model'
import Sensor from '../Sensor/sensor.model';
import Station from '../Station/station.model';
import { createAlert } from '../Alert/alert.controller';
import { signToken } from "../../middlewares/jwt";
import config from '../../config/config'
import { createTimeArray , createTimeFormat} from '../../middlewares/createTimeArray';


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
 
    //se actualiza la variable readings_station de la estación, la cual ayuda a un filtrado de datos
    await Station.findByIdAndUpdate(sensorFound.id_station, { "readings_station": true });

    //se crea la lectura
    const newReading = {
        value: value,
        id_sensor: id_sensor,
        type_sensor: sensorFound.type,
        id_station: sensorFound.id_station,
        id_company: sensorFound.id_company
    };

    const readingSaved = new Reading(newReading);

    //se verifica que sea una lectura
    if ( value >= sensorFound.min_config && value <= sensorFound.max_config ){

        await readingSaved.save();

        //se genera un token con tiempo de expiración asociado a la frecuencia de lectura + ALPHA
        const token = signToken( readingSaved._id , (sensorFound.frecuency * config.SECONDS_MINUTE  + config.ALPHA )); 

        //se almacena en el sensor el token y se actualiza el status
        await Sensor.findByIdAndUpdate( sensorFound._id, { "token_reading": token , "status": true});

        return res.status(201).send({ success: true, data: { _id: readingSaved._id }, message: 'Lectura agregada con éxito al sistema.' });
    }

    const date = new Date();

    //se verifica que se haya enviado una alerta anteriormente
    if ( sensorFound.last_alert ){
        const time_remaining = date.getTime() - sensorFound.last_alert.getTime();

        if ( time_remaining <= (sensorFound.alert_time * config.MILISECONDS_MINUTE) ){

            const min_remaining = ((sensorFound.alert_time - (time_remaining/config.MILISECONDS_MINUTE))); //convertido en minutos

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
 * @route Get '/readings/:id_sensor'
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
    const sensorReadings = await Reading.find({ id_sensor: id_sensor }).sort({ createdAt: -1 }).limit(config.LIMIT_READINGS);

    //Se invierte el arreglo para enviarlo desde la lectura mas antigua a la mas nueva
    sensorReadings.reverse();
   
    const sensorReadingsFiltered = sensorReadings.map( reading => { 
       
        //se compensa la zona horaria a la local con respecto a la almacenada en la bd
        const date = new Date(reading.createdAt.getTime() - config.TIME_ZONE);
        
        return {
        _id: reading._id,
        value: reading.value,
        timestamp: date.toISOString().substring(0,19)  

    }});
    
    return res.status(200).send({ success: true, data: sensorReadingsFiltered , message: 'Lecturas asociadas al sensor encontradas con exito.' });
}

/**
 * Función encargada de obtener las lecturas asociadas a un sensor, filtradas por 12hrs, 24hrs, 7 días, 30 días, 3 meses y 6 meses
 * @route Post '/readings/graphic/:id_sensor'
 * @param req Request de la petición, se espera que tenga el id del sensor
 * @param res Response, retorna un object con succes: true, data: {readings:{}}, message: "String" de las lecturas asociadas al sensor.
 */
export const readingSensorGraphic: RequestHandler = async (req, res) => {
    const id_sensor = req.params.id_sensor;
    const time = req.body.time;

    //se valida el id_sensor
    if ( !Types.ObjectId.isValid( id_sensor) )
    return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_sensor ingresado no es válido.' });

    const sensorFound = await Sensor.findById( id_sensor );

    //Se valida la existencia del sensor ingresado
    if ( !sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El sensor ingresado no existe en el sistema.' });

    //se valida el time
    if ( time!=12 && time!=24 && time!=7 && time!=30 && time!=3 && time!=6 ){
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: el valor de time es inválido.' });
    }

    const date = createTimeArray(time);

    //se obtienen todas las lecturas dentro del margen de fechas
    const readings = await Reading.find({ "id_sensor": id_sensor, "createdAt": {"$gte": date[0], "$lte": date[ date.length - 1] }}).sort({ createdAt: 1 });

    let values = [];

    //se procesan las lecturas separandolas por cada tipo de time
    for ( let i = 0 ; i < date.length - 1; i++){

        let sum = 0;
        let count = 0;

        //bucleamos en las lecturas
        for ( let j = 0; j < readings.length; j++){
            
            if ( readings[j].createdAt >= date[i] && readings[j].createdAt < date[i+1]){
                sum += readings[j].value;
                count ++;
            }
        }

        if (count == 0 ){
            values.push(0)
        } else {
            //se almacena el promedio
            values.push(sum / count);
        }
    }

    createTimeFormat(date, time);

    return res.status(200).send({ success: true, data:{'name_sensor': sensorFound.name, 'time': date, 'readings': values}, message: "Lecturas encontradas con éxito."});
}
