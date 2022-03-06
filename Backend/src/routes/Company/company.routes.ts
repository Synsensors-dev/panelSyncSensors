import { Router } from 'express';
import * as companyCtrl from './company.controller';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Company:
 *      type: object
 *      properties:
 *          id:
 *              type: string
 *              description: id de la compañia
 *          name: 
 *              type: string
 *              description: nombre de la compañia
 *          email:
 *              type: string
 *              description: email de la compañia
 *          address:
 *              type: string
 *              description: dirección de la compañia
 *          representative_name: 
 *              type: string
 *              description: nombre representativo de la compañia
 *      required:
 *          - name
 *          - email
 *          - address
 *          - representative_name
 *      example:
 *          id: 620dd2bf208318e3b53fbf8i
 *          name: Awa de Uwu
 *          email: awadeuwu@gmail.com
 *          address: calle falsa 1234
 *          representative_name: awa
 *  parameters:
 *      idCompany:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              description: id de la compañia
 */

/**
 * @swagger
 * tags: 
 *  name: Company
 *  description: Company Endpoints
 */

// Agregar nueva compañía
router.post('/company', companyCtrl.createCompany);

// Modificar una compañía
router.put('/company/:id', companyCtrl.updateCompany);

/**
 * @swagger
 * /company/{id}:
 *  get:
 *    summary: Obtener una compañia a través del ID
 *    tags: [Company]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    responses:
 *      200:
 *        description: Compañía encontrada
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Company'
 *      404:
 *        description: Compañia no encontrada
 *      400:
 *        description: Id ingresado inválido
 */
router.get('/company/:id', companyCtrl.readCompany);

// Eliminar una compañía
router.delete('/company/:id', companyCtrl.deleteCompany);

export default router;
