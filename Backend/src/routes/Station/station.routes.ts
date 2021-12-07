import { Router } from 'express';
import * as stationCtrl from './station.controller';

const router = Router();

// Agregar nueva estación
router.post('/station', stationCtrl.createStation);

// Modificar una estación
router.put('/station/:id', stationCtrl.updateStation);

// Mostrar una estación
router.get('/station/:id', stationCtrl.readStation);

// Eliminar una estación
router.delete('/station/:id', stationCtrl.deleteStation);

export default router;
