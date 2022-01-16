import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Reading from './reading.model'
import Sensor from '../Sensor/sensor.model';

export const createReading: RequestHandler = async (req, res) => {
    const { id_sensor, data } = req.body;

    //se validan los atributos obligatorios o requeridos
    if ( !id_sensor || !data.value ) 
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: Los datos a agregar son inválidos.' });

    //se valida el id_sensor
    if ( !Types.ObjectId.isValid( id_sensor) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_sensor ingresado no es válido.' });

    const sensorFound = await Sensor.findById( id_sensor );

    //Se valida la existencia del sensor ingresado
    if ( !sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El sensor ingresado no existe en el sistema.' });
 
    const newReading = {
        value: data.value,
        id_sensor: id_sensor,
        id_station: sensorFound.id_station,
        id_company: sensorFound.id_company
    };

    //se almacena la lectura en el sistema
    const readingSaved = new Reading(newReading);
    await readingSaved.save();

    return res.status(201).send({ success: true, data: { _id: readingSaved._id }, message: 'Lectura agregada con éxito al sistema.' });
}

export const sensorReadings: RequestHandler = async (req, res) => {
    const id_sensor = req.params.id_sensor;

    //se valida el id_sensor
    if ( !Types.ObjectId.isValid( id_sensor) )
    return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_sensor ingresado no es válido.' });

    const sensorFound = await Sensor.findById( id_sensor );

    //Se valida la existencia del sensor ingresado
    if ( !sensorFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: El sensor ingresado no existe en el sistema.' });

    const sensorReadings = await Reading.find({ id_sensor: id_sensor }).sort({ createdAt: -1 });
    
    return res.status(200).send({ success: true, data: { sensorReadings: sensorReadings }, message: 'Lecturas asociadas al sensor encontradas con exito.' });
}
