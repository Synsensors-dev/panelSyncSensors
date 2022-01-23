import { Router } from 'express';
import passport from 'passport';
import * as readingCtrl from './reading.controller';


const router = Router();

// Agregar una nueva lectura
router.post('/reading', readingCtrl.createReading);

// Obtener lista de lecturas asociadas a un sensor, ordenadas desde la mas antigua a la mas reciente
router.get('/readings/:id_sensor', passport.authenticate('jwt', {session: false}), readingCtrl.sensorReadings);

export default router;
