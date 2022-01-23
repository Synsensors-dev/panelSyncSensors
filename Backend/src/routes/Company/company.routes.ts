import { Router } from 'express';
import passport from 'passport';
import * as companyCtrl from './company.controller';

const router = Router();

// Agregar nueva compañía
router.post('/company', passport.authenticate('jwt', {session: false}), companyCtrl.createCompany);

// Modificar una compañía
router.put('/company/:id', passport.authenticate('jwt', {session: false}), companyCtrl.updateCompany);

// Mostrar una compañía
router.get('/company/:id', passport.authenticate('jwt', {session: false}), companyCtrl.readCompany);

// Eliminar una compañía
router.delete('/company/:id', passport.authenticate('jwt', {session: false}), companyCtrl.deleteCompany);

export default router;
