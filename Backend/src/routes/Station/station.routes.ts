import { Router } from 'express';
import * as stationCtrl from './station.controller';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Station:
 *      type: object
 *      properties:
 *          _id:
 *              type: string
 *              description: id de la estación
 *          name: 
 *              type: string
 *              description: nombre de la estación
 *          latitude:
 *              type: number
 *              description: latitud de la ubicación de la estación
 *          longitude:
 *              type: number
 *              description: longitud de la ubicación de la estación
 *          type: 
 *              type: string
 *              description: tipo de estación
 *          status:
 *              type: string
 *              description: estado de la estación
 *          location_notes: 
 *              type: string
 *              description: notas de la estación
 *          id_gateway: 
 *              type: string
 *              description: id del puente asociado a la estación
 *          id_company:
 *              type: string
 *              description: id de la compañia asociada a la estación
 *      required:
 *          - name
 *          - latitude
 *          - longitude
 *          - type
 *          - status
 *          - location_notes
 *      example:
 *          name: Regrigerador del laboratorio 
 *          latitude: 43
 *          longitude: 43
 *          type: Frío
 *          status: bien
 *          location_notes: Ubicada en el subterraneo
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
 *      idStation:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              description: id de la estación
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
router.post('/station', stationCtrl.createStation);

// Modificar una estación
router.put('/station/:id', stationCtrl.updateStation);


router.get('/station/:id', stationCtrl.readStation);

// Eliminar una estación
router.delete('/station/:id', stationCtrl.deleteStation);

// Obtener estaciones asociadas a una compañia (vistaPanel)
router.post('/panel/stations', stationCtrl.readPanelStations);

// Obtener un objeto con las estaciones y promedio de las lecturas de los ultimos 7 meses
router.post('/panel/graphic/:id_company', stationCtrl.stationGraphic);

// Obtener un objeto con las estaciones y los tipos de sensores asociados a ella
router.get('/panel/stations/types/:id_company', stationCtrl.stationSensorTypes);

// Obtener un arreglo con los nombres de las estaciones, latitudes y longitudes
router.get('/station/coordinates/:id_company', stationCtrl.stationCoordinates);

export default router;
