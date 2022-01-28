import { RequestHandler } from "express";
import Alert from './alert.model';
import Company from '../Company/company.model';
import Station from '../Station/station.model';
import Sensor from '../Sensor/sensor.model';
import { sendEmailAlert } from '../../middlewares/sendEmail';

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

    //se obtiene la compañia y la estación 
    const companyFound = await Company.findById( sensor.id_company );
    const stationFound = await Station.findById( sensor.id_station );

    //se almacena la fecha y hora de la alerta en el sensor
    const last_alert = new Date();
    await Sensor.findByIdAndUpdate( sensor._id ,{ "last_alert": last_alert });

    //se envía el correo con la alerta a la compañia
    sendEmailAlert(companyFound, stationFound, sensor, alertSaved);
}


export const recentAlerts: RequestHandler = async (req, res) => {

}
export const quantityAlerts: RequestHandler = async (req, res) => {

}