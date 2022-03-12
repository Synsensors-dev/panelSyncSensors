import { Router } from 'express';
import * as sensorCtrl from './sensor.controller';

const router = Router();

// Agregar un nuevo sensor
router.post('/sensor', sensorCtrl.createSensor);

// Modificar un sensor
router.put('/sensor/:id', sensorCtrl.updateSensor);

// Mostrar un sensor
router.get('/sensor/:id', sensorCtrl.readSensor);

// Eliminar un sensor
router.delete('/sensor/:id', sensorCtrl.deleteSensor);

// Obtener lista de sensores existentes asociados a una compañia
router.get('/sensor/types/:id_company', sensorCtrl.typesOfSensors);

// Modificar min_config & max_config de un sensor
router.put('/sensor/config/:id', sensorCtrl.updateMinAndMax);

// Modificar el tiempo de alerta (para los correos)
router.put('/sensor/alert_time/:id', sensorCtrl.updateAlertTime);

// Obtener sensores activos 
router.get('/panel/sensors/:id_company', sensorCtrl.sensorsON);

// Modificar el valor de custom_alert (apagándolo)
router.get('/sensor/custom_alert/:id', sensorCtrl.customAlertTime);

//Obtener un true or false si custom_alert está activo, en caso de true obtener su valor en minutos
router.get('/sensor/custom_alert/value/:id', sensorCtrl.readCustomAlertTime);

//Cambiar nombre sensor
router.put('/sensor/name/:id', sensorCtrl.updateNameSensor);

export default router;
