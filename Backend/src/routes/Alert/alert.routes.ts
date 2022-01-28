import { Router } from 'express';
import * as alertCtrl from './alert.controller';


const router = Router();

// Obtener las alertas mas recientes, con un total de 20 alertas
router.get('/alert/recent/:id_company', alertCtrl.recentAlerts);

// Obtener la cantidad de alertas de esta semana y un porcentaje asociado a la semana anterior
router.get('/alert/quantity/:id_company', alertCtrl.quantityAlerts);

export default router;
