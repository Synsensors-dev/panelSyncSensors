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
 *          name: Awa de Uwu
 *          email: awadeuwu@gmail.com
 *          address: calle falsa 1234
 *          representative_name: awa
 * 
 *    ObjectReturn: 
 *      type: object
 *      properties:
 *          success:
 *              type: boolean
 *              description: variable true o false dependiendo el return
 *          data:
 *              type: object
 *              description: objecto vacío o con valores dependiendo el return
 *          message: 
 *              type: string
 *              description: mensaje del return
 *      required:
 *          - success
 *          - data
 *          - message
 *      example:
 *          success: true
 *          data: {}
 *          message: mensaje de la ejecución
 * 
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

/**
 * @swagger
 * /company:
 *  post:
 *    summary: Agregar una nueva compañia
 *    tags: [Company]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Company'
 *    responses:
 *      201:
 *        description: Compañia encontrada con éxito.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La compañia solicitada no existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      400:
 *        description: El id ingresado no es válido.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 */
router.post('/company', companyCtrl.createCompany);

/**
 * @swagger
 * /company/{id}:
 *  put:
 *    summary: Actualizar una compañia a través del ID
 *    tags: [Company]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Company'
 *    responses:
 *      200:
 *        description: Compañia actualizada de manera correcta.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La compañia a modificar no existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      400:
 *        description: El id ingresado no es válido.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      301:
 *        description: Los datos a modificar son inválidos.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 */
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
 *        description: Compañia encontrada con éxito.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La compañia solicitada no existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      400:
 *        description: El id ingresado no es válido.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 */
router.get('/company/:id', companyCtrl.readCompany);

/**
 * @swagger
 * /company/{id}:
 *  delete:
 *    summary: Borrar una compañia a través del ID
 *    tags: [Company]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    responses:
 *      200:
 *        description: Compañia eliminada de manera correcta.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La compañia solicitada no existe en el sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      400:
 *        description: El id ingresado no es válido.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 */
router.delete('/company/:id', companyCtrl.deleteCompany);

export default router;
