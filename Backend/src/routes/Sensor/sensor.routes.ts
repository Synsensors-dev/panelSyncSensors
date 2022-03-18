import { Router } from 'express';
import * as sensorCtrl from './sensor.controller';
import { isRol, isSuperAdmin } from "../../middlewares/authRoles";
import passport from 'passport';

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    SensorAdd:
 *      type: object
 *      properties:
 *          id_station: 
 *              type: string
 *              description: id de la estación asociada al sensor
 *              example: 61f0eace3e60ea8911111222
 *          data:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: id del sensor
 *                  name: 
 *                      type: string
 *                      description: nombre del sensor
 *                      example: TEMP890324
 *                  type:
 *                      type: string
 *                      description: tipo de sensor
 *                      example: TEMPERATURE_AIR
 *                  frecuency:
 *                      type: number
 *                      description: frecuencia de lectura en minutos
 *                      example: 7
 *                  min_config: 
 *                      type: number
 *                      description: limite de lectura inferior
 *                      example: 5
 *                  max_config:
 *                      type: number
 *                      description: limite de lectura superior
 *                      example: 15
 *                  status:
 *                      type: boolean
 *                      description: estado del sensor (encendido o apagado)
 *                      example: true
 *      required:
 *          - id_station
 *          - data
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

/**
 * @swagger
 * /sensor:
 *  post:
 *    summary: Agregar un nuevo sensor
 *    tags: [Sensor]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/SensorAdd'
 *    responses:
 *      201:
 *        description: Sensor agregado con éxito al sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La estación ingresada no existe en el sistema.
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
router.post('/sensor', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }),  isSuperAdmin, sensorCtrl.createSensor);

/**
 * @swagger
 * /sensor:
 *  put:
 *    summary: Modificar un sensor
 *    tags: [Sensor]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/SensorAdd'
 *    responses:
 *      201:
 *        description: Sensor modificado con éxito del sistema.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: El sensor a modificar no existe en el sistema. O, la estación ingresada no existe en el sistema. 
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
router.put('/sensor/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isSuperAdmin, sensorCtrl.updateSensor);

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
router.get('/sensor/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, sensorCtrl.readSensor);

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
router.delete('/sensor/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isSuperAdmin, sensorCtrl.deleteSensor);

/**
 * @swagger
 * /sensor/types/{id_company}:
 *  get:
 *    summary: Obtener lista de los tipos de sensores existentes asociados a una compañia
 *    tags: [Sensor]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    responses:
 *      200:
 *        description: Tipos de sensores encontrados.
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
router.get('/sensor/types/:id_company', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol,  sensorCtrl.typesOfSensors);

/**
 * @swagger
 * /sensor/config/{id}:
 *  put:
 *    summary: Modificar min_config & max_config de un sensor
 *    tags: [Sensor]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      min_config:
 *                          type: number   
 *                          description: Límite inferior de lectura del sensor
 *                      max_config:
 *                          type: number
 *                          description: Límite superior de lectura del sensor
 *                  example:
 *                      min_config: 5
 *                      max_config: 28
 *    responses:
 *      200:
 *        description: Min_config y Max_config actualizados de manera correcta.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: El sensor ingresado no existe en el sistema. O, no se ingresó valores para min y max
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
router.put('/sensor/config/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, sensorCtrl.updateMinAndMax);

/**
 * @swagger
 * /sensor/alert_time/{id}:
 *  put:
 *    summary: Modificar el tiempo de envío de las alertas al correo electrónico del usuario
 *    tags: [Sensor]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      alert_time:
 *                          type: number   
 *                          description: tiempo de envío de las alertas en minutos
 *                  required: 
 *                      - alert_time
 *                  example:
 *                      alert_time: 20
 *    responses:
 *      200:
 *        description: Alert_time actualizado de manera correcta.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: El sensor ingresado no existe en el sistema. O, no se ingresó valor para alert_time.
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
router.put('/sensor/alert_time/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, sensorCtrl.updateAlertTime);

/**
 * @swagger
 * /panel/sensors/{id_company}:
 *  get:
 *    summary: Obtener sensores activos
 *    tags: [Sensor]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    responses:
 *      200:
 *        description: Cantidad de sensores encontrados con éxito
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
router.get('/panel/sensors/:id_company', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, sensorCtrl.sensorsON);

/**
 * @swagger
 * /sensor/custom_alert/{id_sensor}:
 *  put:
 *    summary: Modificar el valor de custom_alert apagandolo y reiniciando los parámetros de alertas por default de manera exponencial
 *    tags: [Sensor]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    responses:
 *      200:
 *        description: Custom_alert actualizada de manera correcta.
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
router.put('/sensor/custom_alert/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, sensorCtrl.customAlertTime);

/**
 * @swagger
 * /sensor/custom_alert/value/{id}:
 *  get:
 *    summary: Obtener un true or false si custom_alert está activo, en caso de true obtener su valor en minutos
 *    tags: [Sensor]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    responses:
 *      200:
 *        description: Custom_alert econtrado
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
router.get('/sensor/custom_alert/value/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, sensorCtrl.readCustomAlertTime);

/**
 * @swagger
 * /sensor/name/{id}:
 *  put:
 *    summary: Editar el nombre de un sensor
 *    tags: [Sensor]
 *    parameters:
 *      - $ref: '#/components/parameters/idSensor'
 *    requestBody:
 *        required: true
 *        content: 
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      new_name:
 *                          type: string
 *                          description: nuevo nombre del sensor
 *                          example: TEMP92782
 *                                        
 *    responses:
 *      200:
 *        description: Sensor actualizado de manera correcta.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: No se ingresó un name. O, el sensor no existe en el sistema
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
router.put('/sensor/name/:id', passport.authenticate('jwt', {session: false, failureRedirect: '/login' }), isRol, sensorCtrl.updateNameSensor);

export default router;
