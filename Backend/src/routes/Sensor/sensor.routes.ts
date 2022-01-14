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

export default router;
