import {Router} from 'express';
import * as companyCtrl from './company.controller';

const router = Router();

// Agregar nueva compañía
router.post('/company', companyCtrl.createCompany);

// Modificar una compañía
router.put('/company/:id', companyCtrl.updateCompany);

// Mostrar una compañía
router.get('/company/:id', companyCtrl.readCompany);

// Eliminar una compañía
router.delete('/company/:id', companyCtrl.deleteCompany);

export default router;
