import { Router } from 'express';
import passport from 'passport';
import * as stationCtrl from './station.controller';

const router = Router();

// Agregar nueva estación
router.post('/station', passport.authenticate('jwt', {session: false}), stationCtrl.createStation);

// Modificar una estación
router.put('/station/:id', passport.authenticate('jwt', {session: false}), stationCtrl.updateStation);

// Mostrar una estación
router.get('/station/:id', passport.authenticate('jwt', {session: false}), stationCtrl.readStation);

// Eliminar una estación
router.delete('/station/:id', passport.authenticate('jwt', {session: false}), stationCtrl.deleteStation);

export default router;
