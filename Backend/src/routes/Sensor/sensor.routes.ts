import { Router } from 'express';
import passport from 'passport';
import * as sensorCtrl from './sensor.controller';

const router = Router();

// Agregar un nuevo sensor
router.post('/sensor', passport.authenticate('jwt', {session: false}), sensorCtrl.createSensor);

// Modificar un sensor
router.put('/sensor/:id', passport.authenticate('jwt', {session: false}), sensorCtrl.updateSensor);

// Mostrar un sensor
router.get('/sensor/:id', passport.authenticate('jwt', {session: false}), sensorCtrl.readSensor);

// Eliminar un sensor
router.delete('/sensor/:id', passport.authenticate('jwt', {session: false}), sensorCtrl.deleteSensor);

// Obtener lista de sensores existentes asociados a una compañia
router.get('/sensor/types/:id_company', passport.authenticate('jwt', {session: false}), sensorCtrl.typesOfSensors);

// Modificar min_config & max_config de un sensor
router.put('/sensor/config/:id', passport.authenticate('jwt', {session: false}), sensorCtrl.updateMinAndMax);

//Obtener estaciones asociadas a una compañia (vistaPanel)
router.post('/panel/stations', passport.authenticate('jwt', {session: false}), sensorCtrl.readPanelStations);

export default router;
