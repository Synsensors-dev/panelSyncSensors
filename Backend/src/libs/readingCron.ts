import cron from 'node-cron';
import config from '../config/config';
import Sensor from '../routes/Sensor/sensor.model';
import Reading from '../routes/Reading/reading.model';

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

        console.log("sensores encontrados:" + sensors_tester);

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

            console.log ("se agregó lectura en el sensor: "+ sensor._id);
        });
    });
}
