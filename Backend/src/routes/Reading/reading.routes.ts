import { Router } from 'express';
import * as readingCtrl from './reading.controller';


const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Reading:
 *      type: object
 *      properties:
 *          id_sensor:
 *              type: string
 *              description: id del sensor asociado a la lectura ingresada
 *          value: 
 *              type: number
 *              description: valor de la lectura captada por el sensor
 *      required:
 *          - id_sensor
 *          - value 
 *      example:
 *          id_sensor: 61f0eace3e60ea8911111729
 *          value: 28
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

/**
 * @swagger
 * /reading:
 *  post:
 *    summary: Agregar una nueva lectura al sistema
 *    tags: [Reading]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Reading'
 *    responses:
 *      201: 
 *        description: Lectura agregada con éxito al sistema. O, Esta lectura generó una alerta, pero aún no es tiempo de enviarla. O, Lectura y Alerta agregada con éxito al sistema.
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
 *      301:
 *        description: Los datos a agregar son inválidos.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 */
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

/**
 * @swagger
 * /readings/graphic/{id_sensor}:
 *  post:
 *    summary: Obtener lista de lecturas asociadas a un sensor, filtradas por 30 días, 3 meses y 6 meses
 *    tags: [Reading]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      time:
 *                          type: number
 *                          description: rango de tiempo a retornar lecturas
 *                  required:
 *                      - time
 *                  example: 
 *                      time: 12
 *    responses:
 *      200: 
 *        description: Lecturas encontradas con éxito.
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
 *      301:
 *        description: El valor de time es inválido.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 */
router.post('/readings/graphic/:id_sensor', readingCtrl.readingSensorGraphic);

/**
 * @swagger
 * /readings/week/{id_company}:
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
