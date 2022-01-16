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

export default router;
