import { Router } from 'express';
import * as alertCtrl from './alert.controller';


const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
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
 *      idSensor:
 *          in: path
 *          name: id_sensor
 *          required: true
 *          schema:
 *              type: string
 *              description: id del sensor   
 *      idCompany:
 *          in: path
 *          name: id_company
 *          required: true
 *          schema:
 *              type: string
 *              description: id de la compañia
 */

/**
 * @swagger
 * tags: 
 *  name: Alert
 *  description: Alert Endpoints
 */

/**
 * @swagger
 * /alert/recent/{id_company}:
 *  get:
 *    summary: Obtener las alertas mas recientes, con un total de 20 alertas
 *    tags: [Alert]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    responses:
 *      200:
 *        description: Alertas más recientes encontradas con éxito.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La compañia ingresada no existe en el sistema.
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
router.get('/alert/recent/:id_company', alertCtrl.recentAlerts);

/**
 * @swagger
 * /alert/quantity/{id_company}:
 *  get:
 *    summary: Obtener la cantidad de alertas de esta semana y un porcentaje asociado a la semana anterior
 *    tags: [Alert]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    responses:
 *      200:
 *        description: Cantidad de alertas encontradas con éxito.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La compañia ingresada no existe en el sistema.
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
router.get('/alert/quantity/:id_company', alertCtrl.quantityAlerts);

/**
 * @swagger
 * /alert/{id_sensor}:
 *  get:
 *    summary: Obtener las alertas asociadas a un sensor
 *    tags: [Alert]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    responses:
 *      200:
 *        description: Alertas del sensor encontradas con éxito.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: El sensor ingresado no existe en el sistema.
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
router.get('/alert/:id_sensor', alertCtrl.sensorAlerts);

export default router;
