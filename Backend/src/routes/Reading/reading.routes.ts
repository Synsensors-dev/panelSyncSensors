import { Router } from 'express';
import * as readingCtrl from './reading.controller';


const router = Router();

// Agregar una nueva lectura
router.post('/reading', readingCtrl.createReading);

// Obtener lista de lecturas asociadas a un sensor, ordenadas desde la mas antigua a la mas reciente
router.get('/readings/:id_sensor', readingCtrl.sensorReadings);

// Obtener lista de lecturas asociadas a un sensor, filtradas por 30 días, 3 meses y 6 meses
router.post('/readings/graphic/:id_sensor', readingCtrl.readingSensorGraphic);

//Obtener cantidad de lecturas de la ultima semana asociadas a una compañia
router.get('/readings/week/:id_company', readingCtrl.companyReadings);

export default router;
