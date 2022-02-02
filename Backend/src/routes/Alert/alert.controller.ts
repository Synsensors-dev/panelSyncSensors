import { RequestHandler } from "express";
import Alert from './alert.model';
import Company from '../Company/company.model';
import Station from '../Station/station.model';
import Sensor from '../Sensor/sensor.model';
import { sendEmailAlert } from '../../middlewares/sendEmail';
import { Types } from "mongoose";
import { signToken } from "../../middlewares/jwt";

const ALPHA = 3; //Segundos
const SECOND = 1000 // milisegundos
const MINUTE = 60000 //milisegundos

/**
 * Funcion que maneja la solicitud de crear una alerta
 * @param reading -> es la ultima lectura agregada al sistema y que genera una alerta
 * @param sensor -> es el sensor que genera la lectura y en consecuencia la alerta
 */
export async function createAlert( reading:any, sensor:any ){
    
    //se crea la alerta
    const newAlert = {
        value: reading.value,
        id_reading: reading._id,
        id_sensor: sensor._id,
        id_station: sensor.id_station,
        id_company: sensor.id_company
    }

    //se guarda en la BD la alerta y la lectura
    const alertSaved = new Alert(newAlert);
    await alertSaved.save();
    await reading.save();

    //se genera un token con tiempo de expiración asociado a la frecuencia de lectura + ALPHA
    const token = signToken( reading._id , ((sensor.frecuency * SECOND) + ALPHA * SECOND) ); 

    //se almacena en el sensor el token
    await Sensor.findByIdAndUpdate( sensor._id, { "token_reading": token });

    //se obtiene la compañia y la estación 
    const companyFound = await Company.findById( sensor.id_company );
    const stationFound = await Station.findById( sensor.id_station );

    //se almacena la fecha y hora de la alerta en el sensor
    const last_alert = new Date();
    await Sensor.findByIdAndUpdate( sensor._id ,{ "last_alert": last_alert });

    //se envía el correo con la alerta a la compañia
    sendEmailAlert(companyFound, stationFound, sensor, alertSaved);
}

/**
 * Función encargada de obtener las alertas mas recientes asociadas a una compañia. Con un limite definido de 20 alertas.
 * @route Get '/alert/recent/:id_company'
 * @param req Request de la petición, se espera que tenga el id de la compañia.
 * @param res Response, retorna un object con succes: true, data: { alerts }, message: "String" de las alertas si todo sale bien.
 */
export const recentAlerts: RequestHandler = async (req, res) => {
    const id_company = req.params.id_company;

    //se valida el _id ingresado de la compañia
    if ( !Types.ObjectId.isValid( id_company ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const companyFound = await Company.findById ( id_company );

    //se valida la existencia de la compañia en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });
    
    //se obtienen las alertas asociadas a la compañia
    const alerts = await Alert.find({ id_company }).sort( {createdAt: -1}).limit(20);
    const alertsCompany = [];

    for (let i = 0; i < alerts.length ; i++){

        //se obtiene la estación asociada a la alerta
        const station = await Station.findById(  alerts[i].id_station );

        //Se estructura el objecto a retornar dentro del arreglo
        const object = {
            'name_station': station.name,
            'date_alert': alerts[i].createdAt.toISOString().substring(0,10),
            'hour_alert': alerts[i].createdAt.toISOString().substring(11,19)
        };

        //se almacenan los datos en el arreglo
        alertsCompany.push(object);
    }

    return res.status(200).send({success: true, data: alertsCompany , message: 'Alertas más recientes encontradas con éxito.'});
}

/**
* Función encargada de obtener la cantidad de alertas de la semana actual, ademas de obtener un porcentaje asociado a la semana actual como la anterior.
 * @route Get '/alert/quantity/:id_company'
 * @param req Request de la petición, se espera que tenga el id de la compañia.
 * @param res Response, retorna un object con succes: true, data: { alerts }, message: "String" de las alertas si todo sale bien.
 */
export const quantityAlerts: RequestHandler = async (req, res) => {
    const id_company = req.params.id_company;

    //se valida el _id ingresado de la compañia
    if ( !Types.ObjectId.isValid( id_company ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const companyFound = await Company.findById ( id_company );

    //se valida la existencia de la compañia en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });
    
    const date = new Date(); //fecha actual
    const week = 7*24*60*60*1000 // 1 semana en milisegundos

    //se definen los tiempos de inicio de la semana actual y la anterior
    const current_week = new Date( date.getTime() - week );
    const last_week = new Date (date.getTime() - (week * 2)) ;

    //se obtiene la cantidad de alertas de la semana actual y la semana anterior
    const quantityAlertCurrentWeek = await Alert.find({ "id_company": id_company , "createdAt": {"$gte": current_week}} ).count();
    const quantityAlertLastWeek = await Alert.find({ "id_company": id_company , "createdAt": {"$gte": last_week, "$lt": current_week}} ).count();
    
    //se calcula el porcentaje de cambio 
    const percentage = (quantityAlertCurrentWeek * 100) / quantityAlertLastWeek;

    return res.status(200).send({ succes: true, data: { 
        'quantity_alerts': quantityAlertCurrentWeek, 
        'percentage': percentage
     } , message: 'Cantidad de alertas encontradas con éxito.'});
}
