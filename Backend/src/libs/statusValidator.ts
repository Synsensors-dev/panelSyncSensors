import cron from 'node-cron';
import Sensor from '../routes/Sensor/sensor.model';
import config from '../config/config';
import jwt from 'jsonwebtoken';

const time = "* * * * *"; //1 minuto

export const statusValidator =  () => {

    //Se estructura el CRON 
    cron.schedule( time, async () => { 

        const sensors = await Sensor.find();
        
        //recorremos por cada sensor
        sensors.forEach( sensor => {

            //Se verifica el token
            jwt.verify( sensor.token_reading, config.jwtSecret, async function( err: any , decodedToken: any ){

                //si expiró o es inválido
                if ( err ){

                    //se cambia el valor del status en la BD
                    await Sensor.findByIdAndUpdate( sensor._id, { "status": false });
                }
            });   
        });
    });
}
