import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Reading from './reading.model'
import Sensor from '../Sensor/sensor.model';
import Station from '../Station/station.model';
import { createAlert } from '../Alert/alert.controller';
import { signToken } from "../../middlewares/jwt";
import config from '../../config/config'


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


    const sensorReadingsFiltered = sensorReadings.map( reading => { return {
        _id: reading._id,
        value: reading.value,
        timestamp: reading.createdAt
    }});
    
    return res.status(200).send({ success: true, data: sensorReadingsFiltered , message: 'Lecturas asociadas al sensor encontradas con exito.' });
}

/**
 * Función encargada de obtener las lecturas asociadas a un sensor, filtradas por 30 días, 3 meses y 6 meses
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

    const date = new Date();

    //si son solicitadas las lecturas de los ultimos 30 días
    if ( time == 30 ){
        const dayInMilliseconds = 1000*60*60*24;

        //seteamos la hora a las 0:00:00:00
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        const days:any = [];

        //almacenamos el día actual
        days[0] = date;

        //Bucleamos obteniendo los otros 29 días anteriores
        for ( let i = 1; i < 30 ; i++){
            days[i] = new Date( days[i-1] - dayInMilliseconds );
        }

        //invertimos el orden
        days.reverse();

        let values:any = [];

        for ( let i = 0; i < days.length - 1; i++ ){
            
            //Obtenemos las lecturas de cada día
            let readings_days = await Reading.find({ "id_sensor": id_sensor, "createdAt": {"$gte": days[i], "$lt": days[i+1] }});
        
            //verificamos la existencia de lecturas en el mes
            if ( readings_days.length > 0 ){
                let reading_prom = 0;

                //sumamos los valores de las lecturas
                for ( let j = 0; j < readings_days.length; j++ ){
                    reading_prom += readings_days[j].value;
                }
                
                //calculamos el promedio simple
                reading_prom = reading_prom / readings_days.length;

                //guardamos el promedio
                values.push(reading_prom);
            } else {
                values.push(null);
            }
        }

        //cambiamos el formato de las fechas a aaaa/mm/dd
        for ( let i = 0; i < days.length; i++ ){
            days[i] = days[i].toISOString().substring(0,10);
        }

        return res.status(200).send({ success: true, data:{'time': days, 'readings': values}, message: "Lecturas encontradas con éxito."});

    //si son solicitadas las lecturas  de 3 o 6 meses
    } else {

        const months: any = [];

        //almacenamos el ultimo mes
        months[0] = new Date( date.getFullYear(), date.getMonth() );

        //obtenemos los ultimos N° meses
        for (let i = 1; i < time; i++ ) {

            if ( months[i-1].getMonth() == 0 ){
                months[i] = new Date( months[i-1].getUTCFullYear() - 1, 11 );
            } else {
                months[i] = new Date( months[i-1].getFullYear(), months[i-1].getMonth() - 1 );
            }
        }

        //invertimos el orden
        months.reverse();
        //insertamos la fecha actual
        months.push(date);

        let values:any = [];

        //recorremos los meses
        for ( let i = 0; i < months.length - 1; i++ ){
            
            //obtenemos las lecturas de cada mes
            let readings_month = await Reading.find({ "id_sensor": id_sensor, "createdAt": {"$gte": months[i], "$lt": months[i+1] }});

            //verificamos la existencia de lecturas en el mes
            if ( readings_month.length > 0 ){
                let reading_prom = 0;

                //sumamos los valores de las lecturas
                for ( let j = 0; j < readings_month.length; j++ ){
                    reading_prom += readings_month[j].value;
                }
                
                //calculamos el promedio simple
                reading_prom = reading_prom / readings_month.length;
    
                //guardamos el promedio
                values.push(reading_prom);
            } else {
                values.push(null);
            }
        }

        // Obtenemos un arreglo con los meses
        const month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const time_reading_names = [];
    
        //pasamos la fecha de formato Date a String para el retorno al front
        for ( let i = 0; i < months.length - 1; i++ ){
             time_reading_names[i] =  month_names[months[i].getMonth()];
        }

        return res.status(200).send({ success: true, data:{'time': time_reading_names, 'readings': values}, message: "Lecturas encontradas con éxito."});
    }
}
