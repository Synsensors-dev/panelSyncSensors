import Alert from './alert.model';
import Company from '../Company/company.model';
import Station from '../Station/station.model';
import { sendEmailAlert } from '../../middlewares/sendEmail';

export async function createAlert( reading:any, sensor:any ){
    //se crea la alerta
    const newAlert = {
        value: reading.value,
        id_reading: reading._id,
        id_sensor: sensor._id,
        id_station: sensor.id_station,
        id_company: sensor.id_company
    }

    //se guarda en la BD
    const alertSaved = new Alert(newAlert);
    await alertSaved.save();

    //se obtiene la compañia y la estación 
    const companyFound = await Company.findById( sensor.id_company );
    const stationFound = await Station.findById( sensor.id_station );

    //se envía el correo con la alerta a la compañia
    sendEmailAlert(companyFound, stationFound, sensor, alertSaved);
}
