import cron from 'node-cron';
import Sensor from '../routes/Sensor/sensor.model';
import config from '../config/config';
import jwt from 'jsonwebtoken';

/**
 * Función encargada de validar los tokens asociados a cada uno de los sensores de la base de datos. Los cuales mantienen un tiempo
 * de expiración igual a la frecuencia de lectura + un alpha. Cuando dicho token caduca, esta función asume que no se ingresó
 * alguna lectura dentro del rango establecido, por lo tanto el sensor está apagado. Y cambia el estado del sensor a false.
 */
export const statusValidator =  () => {

    //Se estructura el CRON 
    cron.schedule( config.TIME_STATUS_VALIDATOR, async () => { 

        const sensors = await Sensor.find();

        //recorremos por cada sensor
        sensors.forEach( sensor => {

            //Se verifica el token
            jwt.verify( sensor.token_reading, config.jwtSecret, async function( err: any ){
                
                //si expiró 
                if ( err  && sensor.status == true ){

                    //se cambia el valor del status en la BD
                    await Sensor.findByIdAndUpdate( sensor._id, { "status": false });
                }
            });   
        });
    });
}
