import { Router } from 'express';
import * as readingCtrl from './reading.controller';


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
 *  name: Reading
 *  description: Reading Endpoints
 */

// Agregar una nueva lectura
router.post('/reading', readingCtrl.createReading);

/**
 * @swagger
 * /readings/{id_sensor}:
 *  get:
 *    summary: Obtener lista de lecturas asociadas a un sensor, ordenadas desde la mas antigua a la mas reciente
 *    tags: [Reading]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    responses:
 *      200:
 *        description: Lecturas asociadas al sensor encontradas con exito.
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
router.get('/readings/:id_sensor', readingCtrl.sensorReadings);

// Obtener lista de lecturas asociadas a un sensor, filtradas por 30 días, 3 meses y 6 meses
router.post('/readings/graphic/:id_sensor', readingCtrl.readingSensorGraphic);

/**
 * @swagger
 * /readings/{id_sensor}:
 *  get:
 *    summary: Obtener cantidad de lecturas de la ultima semana asociadas a una compañia
 *    tags: [Reading]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    responses:
 *      200:
 *        description: Lecturas encontradas con éxito.
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
router.get('/readings/week/:id_company', readingCtrl.companyReadings);

export default router;
