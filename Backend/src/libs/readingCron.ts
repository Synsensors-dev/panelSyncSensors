import cron from 'node-cron';
import config from '../config/config';
import Sensor from '../routes/Sensor/sensor.model';
import Reading from '../routes/Reading/reading.model';
import Alert from "../routes/Alert/alert.model"
import { signToken } from "../middlewares/jwt";

/**
 * Función encargada de ingresar lecturas al sistema de manera automática con la finalidad de probar
 * y/o testear el hostig vps
 * */
export const createReadingsCron =  () => {

    //Se estructura el CRON 
    cron.schedule( config.TIME_READING_CRON, async () => { 

        const id_company_tester = config.ID_COMPANY_TESTER;

        //Buscar los 5 sensores de prueba con el id_company generado al crear la compañia de prueba
        const sensors_tester = await Sensor.find({"id_company": id_company_tester});

        //iterar en los 5 sensores y crear lecturas random por cada uno de ellos
        sensors_tester.map( async sensor => {

            //generar values aleatoreos dentro del margen min y max del sensor
            const value = Math.floor(Math.random()*sensor.max_config) + sensor.min_config;

            //se crea la lectura
            const newReading = {
                value: value,
                id_sensor: sensor._id,
                type_sensor: sensor.type,
                id_station: sensor.id_station,
                id_company: sensor.id_company
            };

            //se ingresa a la BD
            const readingSaved = new Reading(newReading);
            await readingSaved.save();

            //se genera el token de lectura
            const token = signToken( readingSaved._id , (sensor.frecuency * config.SECONDS_MINUTE  + config.ALPHA )); 

            //se almacena en el sensor el token y se actualiza el status
            await Sensor.findByIdAndUpdate( sensor._id, { "token_reading": token , "status": true});

            console.log ("se agregó lectura en el sensor: "+ sensor._id);
        });
    });
}

/**
 * Función encargada de ingresar lecturas al sistema de manera automática con la finalidad de probar
 * y/o testear el hostig vps
 * */
 export const createAlertCron =  () => {

    //Se estructura el CRON 
    cron.schedule( config.TIME_ALERT_CRON, async () => { 

        const id_company_tester = config.ID_COMPANY_TESTER;

        //Buscar los 5 sensores de prueba con el id_company generado al crear la compañia de prueba
        const sensors_tester = await Sensor.find({"id_company": id_company_tester});

        //iterar en los 5 sensores y crear lecturas random por cada uno de ellos
        sensors_tester.map( async sensor => {

            //generar values aleatoreos dentro del margen min y max del sensor
            const value = Math.floor(Math.random()*sensor.max_config) + 100;

            //se crea la alerta
            const newAlert = {
                value: value,
                id_reading: sensor.id,  //se dejó un id cualquiera ya que no tengo el id de lectura. Aún así, esta variable no es utilizada actualmente
                id_sensor: sensor._id,
                type_sensor: sensor.type,
                id_station: sensor.id_station,
                id_company: sensor.id_company
            }

            //se guarda en la BD la alerta y la lectura
            const alertSaved = new Alert(newAlert);
            const readingSaved = new Reading(
                {
                    value: value,
                    id_sensor: sensor._id,
                    type_sensor: sensor.type,
                    id_station: sensor.id_station,
                    id_company: sensor.id_company
                }
            );
            await alertSaved.save();
            await readingSaved.save();

            //se genera un token con tiempo de expiración asociado aL tiempo de la alerta + ALPHA
            const token = signToken( readingSaved._id , (( sensor.alert_time * config.SECONDS_MINUTE) + config.ALPHA )); 

            //se almacena en el sensor el token y se actualiza el status
            await Sensor.findByIdAndUpdate( sensor._id, { "token_reading": token , "status": true });

            //se almacena la fecha y hora de la alerta en el sensor
            const last_alert = new Date();
            await Sensor.findByIdAndUpdate( sensor._id ,{ "last_alert": last_alert });

            console.log ("se agregó lectura y alerta en el sensor: "+ sensor._id);
        });
    });
}
