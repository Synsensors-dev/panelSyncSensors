import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Reading from './reading.model'
import Sensor from '../Sensor/sensor.model';
import Station from '../Station/station.model';
import Company from '../Company/company.model';
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

    //Se compensa la zona horaria
    const current_date = new Date();
    const date:any = [];

    //si son solicitadas las lecturas de los ultimos 30 días
    if ( time == 30 ){
        const dayInMilliseconds = 1000*60*60*24;

        //seteamos la hora a las 0:00:00:00
        current_date.setHours(0);
        current_date.setMinutes(0);
        current_date.setSeconds(0);
        current_date.setMilliseconds(0);


        //almacenamos el día actual
        date[0] = current_date;

        //Bucleamos obteniendo los otros 29 días anteriores
        for ( let i = 1; i < 30 ; i++){
            date[i] = new Date( date[i-1] - dayInMilliseconds );
        }

        //invertimos el orden
        date.reverse();

    } else {

        //almacenamos el ultimo mes
        date[0] = new Date( current_date.getFullYear(), current_date.getMonth() );

        //obtenemos los ultimos N° meses
        for (let i = 1; i < time; i++ ) {

            if ( date[i-1].getMonth() == 0 ){
                date[i] = new Date( date[i-1].getUTCFullYear() - 1, 11 );
            } else {
                date[i] = new Date( date[i-1].getFullYear(), date[i-1].getMonth() - 1 );
            }
        }

        //invertimos el orden
        date.reverse();
        //insertamos la fecha actual
        date.push(current_date);
    }

    let values:any = [];

    for ( let i = 0; i < date.length - 1; i++ ){
            
        //Obtenemos las lecturas de cada día
        let readings_days = await Reading.find({ "id_sensor": id_sensor, "createdAt": {"$gte": date[i], "$lt": date[i+1] }});
    
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


    if ( time == 30 ){

        //cambiamos el formato de las fechas a aaaa/mm/dd
        for ( let i = 0; i < date.length; i++ ){
            date[i] = date[i].toISOString().substring(0,10);
        }

    } else {
        const month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        
        //pasamos la fecha de formato Date a String para el retorno al front
        for ( let i = 0; i < date.length - 1; i++ ){
            date[i] =  month_names[date[i].getMonth()];
        }
        //borramos el curret_date
        date.pop();
    }

    return res.status(200).send({ success: true, data:{'name_sensor': sensorFound.name, 'time': date, 'readings': values}, message: "Lecturas encontradas con éxito."});
}

/**
 * Función encargada de obtener la cantidad de lecturas asociadas a una compañia
 * @route Get '/readings/week/:id_company'
 * @param req Request de la petición, se espera que tenga el id de la Compañia
 * @param res Response, retorna un object con succes: true, data: {}, message: "String" de las lecturas asociadas a la compañia.
 */
export const companyReadings: RequestHandler = async (req, res) => {
    const id_company = req.params.id_company;

    //se valida el id_company
    if ( !Types.ObjectId.isValid( id_company) )
    return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_sensor ingresado no es válido.' });

    const companyFound = await Company.findById( id_company );

    //Se valida la existencia de la compañia ingresada
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });

    //se captura la fecha actual compensando la zona horaria
    const current_week = new Date();

    //se calcula la semana anterior en función de la fecha actual
    const last_week = new Date( current_week.getTime() - config.WEEK_IN_MILISECONDS);

    //se obtienen las lecturas de la ultima semana
    const quantity_readings = await Reading.find({ "id_company": id_company, "createdAt": {"$gte": last_week} }).count(); 

    return res.status(200).send({ success: true, data:{ "quantity": quantity_readings }, message: "Lecturas encontradas con éxito."});
}
