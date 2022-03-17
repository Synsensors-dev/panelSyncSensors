import { Router } from 'express';
import * as stationCtrl from './station.controller';
import { isRol, isSuperAdmin } from "../../middlewares/authRoles";

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
 *    idStation:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *           type: string
 *           description: id de la estación
 *    idCompany:
 *       in: path
 *       name: id_company
 *       required: true
 *       schema:
 *           type: string
 *           description: id de la compañia
 */

/**
 * @swagger
 * tags: 
 *  name: Station
 *  description: Station Endpoints
 */

/**
 * @swagger
 * /station:
 *  post:
 *    summary: Agregar una nueva estación
 *    tags: [Station]
 *    requestBody:
 *        required: true
 *        content: 
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      id_gateway:
 *                          type: string
 *                          description: id del puente asociado a la estación
 *                          example: 61f0eace3e60ea8911111729
 *                      id_company:
 *                          type: string
 *                          description: id de la compañia asociada a la estación
 *                          example: 61f0eace3e60ea8911111729
 *                      data:
 *                          type: object
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  description: nombre de la estación
 *                                  example: Refrigerador 1
 *                              latitude:
 *                                  type: number
 *                                  description: latitud de la ubicación de la estación
 *                                  example: 34
 *                              longitude:
 *                                  type: number
 *                                  description: longitud de la ubicación de la estación
 *                                  example: 34
 *                              type: 
 *                                  type: string
 *                                  description: tipo de estación
 *                                  example: Frío
 *                              status:
 *                                  type: string
 *                                  description: estado de la estación
 *                                  example: Buena
 *                              location_notes: 
 *                                  type: string
 *                                  description: notas de la estación
 *                                  example: ubicada en el subterraneo de la Universidad
 *                                        
 *    responses:
 *      201:
 *        description: Estación agregada con éxito al sistema
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
 *      301:
 *        description: Datos a agregar inválidos
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'    
 */
router.post('/station', isSuperAdmin, stationCtrl.createStation);

/**
 * @swagger
 * /station/{id}:
 *  put:
 *    summary: Editar una estación 
 *    tags: [Station]
 *    parameters:
 *      - $ref: '#/components/parameters/idStation'
 *    requestBody:
 *        required: true
 *        content: 
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      id_gateway:
 *                          type: string
 *                          description: id del puente asociado a la estación
 *                          example: 61f0eace3e60ea8911111729
 *                      id_company:
 *                          type: string
 *                          description: id de la compañia asociada a la estación
 *                          example: 61f0eace3e60ea8911111729
 *                      data:
 *                          type: object
 *                          properties:
 *                              name: 
 *                                  type: string
 *                                  description: nombre de la estación
 *                                  example: Refrigerador 1
 *                              latitude:
 *                                  type: number
 *                                  description: latitud de la ubicación de la estación
 *                                  example: 34
 *                              longitude:
 *                                  type: number
 *                                  description: longitud de la ubicación de la estación
 *                                  example: 34
 *                              type: 
 *                                  type: string
 *                                  description: tipo de estación
 *                                  example: Frío
 *                              status:
 *                                  type: string
 *                                  description: estado de la estación
 *                                  example: Buena
 *                              location_notes: 
 *                                  type: string
 *                                  description: notas de la estación
 *                                  example: ubicada en el subterraneo de la Universidad
 *                                        
 *    responses:
 *      200:
 *        description: Estación modificada de manera correcta.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La compañia o estación ingresada no existe en el sistema.
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
 *        description: Datos a agregar inválidos
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'    
 */
router.put('/station/:id', isSuperAdmin, stationCtrl.updateStation);

/**
 * @swagger
 * /station/{id}:
 *  get:
 *    summary: Obtener una estación a través del ID
 *    tags: [Station]
 *    parameters:
 *      - $ref: '#/components/parameters/idStation'
 *    responses:
 *      200:
 *        description: Estación encontrada con éxito.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La estación solicitada no existe en el sistema.
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
router.get('/station/:id', isRol, stationCtrl.readStation);

/**
 * @swagger
 * /station/{id}:
 *  delete:
 *    summary: Borrar una estación a través del ID
 *    tags: [Station]
 *    parameters:
 *      - $ref: '#/components/parameters/idStation'
 *    responses:
 *      200:
 *        description: Estación eliminada de manera correcta.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: La estación solicitada no existe en el sistema.
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
router.delete('/station/:id', isSuperAdmin, stationCtrl.deleteStation);

/**
 * @swagger
 * /panel/stations:
 *  post:
 *    summary: Obtener estaciones asociadas a una compañia (vistaPanel)
 *    tags: [Station]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      id_company:
 *                          type: string
 *                          description: id de la compañia
 *                      type:
 *                          type: string
 *                          description: tipo de sensor
 *                  required: 
 *                      - id_company
 *                      - type
 *                  example:
 *                      id_company: 61f0eace3e60ea8911111729
 *                      type: TEMPERATURE_AIR   
 *    responses:
 *      200:
 *        description: Estaciones encontradas con exito.
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
router.post('/panel/stations', isRol, stationCtrl.readPanelStations);

/**
 * @swagger
 * /panel/graphic/{id_company}:
 *  post:
 *    summary: Obtener un objeto con las estaciones y promedio de las lecturas del ultimo tiempo
 *    tags: [Station]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  properties:
 *                      type_sensor:
 *                          type:
 *                          description:
 *                      time:
 *                          type:
 *                          description:
 *                  required: 
 *                      - type_sensor
 *                      - time
 *                  example:
 *                      type_sensor: TEMPERATURE_AIR
 *                      time: 12 
 *    responses:
 *      200:
 *        description: Estaciones encontradas con exito.
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
router.post('/panel/graphic/:id_company', isRol, stationCtrl.stationGraphic);

/**
 * @swagger
 * /panel/stations/types/{id_company}:
 *  get:
 *    summary: Obtener un objeto con las estaciones y los tipos de sensores asociados a ella
 *    tags: [Station]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    responses:
 *      200:
 *        description: Estaciones y tipos de sensores encontrados con éxito.
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
router.get('/panel/stations/types/:id_company', isRol, stationCtrl.stationSensorTypes);
/**
 * @swagger
 * /station/coordinates/{id_company}:
 *  get:
 *    summary: Obtener un arreglo con los nombres de las estaciones, latitudes y longitudes
 *    tags: [Station]
 *    parameters:
 *      - $ref: '#/components/parameters/idCompany'
 *    responses:
 *      200:
 *        description: Coordenadas encontradas con éxito.
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
router.get('/station/coordinates/:id_company', isRol, stationCtrl.stationCoordinates);

/**
 * @swagger
 * /station/name/{id}:
 *  put:
 *    summary: Editar el nombre de una estación 
 *    tags: [Station]
 *    parameters:
 *      - $ref: '#/components/parameters/idStation'
 *    requestBody:
 *        required: true
 *        content: 
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      new_name:
 *                          type: string
 *                          description: nuevo nombre de la estación
 *                          example: Refrigerador 1
 *                                        
 *    responses:
 *      200:
 *        description: Estación actualizada de manera correcta.
 *        content: 
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/ObjectReturn'
 *      404:
 *        description: No se ingresó un name. O, la estación no existe en el sistema
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
router.put('/station/name/:id', isRol, stationCtrl.updateNameStation);

export default router;
