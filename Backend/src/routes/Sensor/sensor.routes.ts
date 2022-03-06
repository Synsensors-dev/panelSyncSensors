import { Router } from 'express';
import * as sensorCtrl from './sensor.controller';

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Sensor:
 *      type: object
 *      properties:
 *          _id:
 *              type: string
 *              description: id del sensor
 *          name: 
 *              type: string
 *              description: nombre del sensor
 *          type:
 *              type: string
 *              description: tipo de sensor
 *          frecuency:
 *              type: number
 *              description: frecuencia de lectura en minutos
 *          min_config: 
 *              type: number
 *              description: limite de lectura inferior
 *          max_config:
 *              type: number
 *              description: limite de lectura superior
 *          status:
 *              type: boolean
 *              description: estado del sensor (encendido o apagado)
 *      required:
 *          - name
 *          - type
 *          - frecuency
 *          - min_config
 *          - max_config
 *          - status
 *      example:
 *          name: TEMP02823
 *          type: TEMPERATRURE_AIR
 *          frecuency: 30
 *          min_config: 10
 *          max_config: 30
 *          status: true
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
 *          name: id
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
 *  name: Sensor
 *  description: Sensor Endpoints
 */

// Agregar un nuevo sensor
router.post('/sensor', sensorCtrl.createSensor);

// Modificar un sensor
router.put('/sensor/:id', sensorCtrl.updateSensor);

/**
 * @swagger
 * /sensor/{id}:
 *  get:
 *    summary: Obtener un sensor a través del ID
 *    tags: [Sensor]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    responses:
 *      200:
 *        description: Sensor encontrado con éxito.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: El sensor solicitado no existe en el sistema.
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
router.get('/sensor/:id', sensorCtrl.readSensor);

/**
 * @swagger
 * /sensor/{id}:
 *  delete:
 *    summary: Borrar una sensor a través del ID
 *    tags: [Sensor]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    responses:
 *      200:
 *        description: Sensor eliminado de manera correcta.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: El sensor solicitado no existe en el sistema.
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
router.delete('/sensor/:id', sensorCtrl.deleteSensor);

// Obtener lista de sensores existentes asociados a una compañia
router.get('/sensor/types/:id_company', sensorCtrl.typesOfSensors);

// Modificar min_config & max_config de un sensor
router.put('/sensor/config/:id', sensorCtrl.updateMinAndMax);

// Modificar el tiempo de alerta (para los correos)
router.put('/sensor/alert_time/:id', sensorCtrl.updateAlertTime);

// Obtener sensores activos 
router.get('/panel/sensors/:id_company', sensorCtrl.sensorsON);

// Modificar el valor de custom_alert (apagándolo)
router.get('/sensor/custom_alert/:id', sensorCtrl.customAlertTime);

export default router;
