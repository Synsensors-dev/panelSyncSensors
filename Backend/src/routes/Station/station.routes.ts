import { Router } from 'express';
import * as stationCtrl from './station.controller';

const router = Router();

router.post('/station', stationCtrl.createStation);

// Modificar una estación
router.put('/station/:id', stationCtrl.updateStation);

/**
 * @swagger
 * /station/{id}:
 *  get:
 *    summary: Obtener los datos de una estación
 *    tags: [Station]
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: id de la estación *    
 * responses:
 *      200:
 *        description: Estación encontrada
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  id: 
 *                      type: string
 *                      description: id generado por mongodb
 *                  name:
 *                      type: string
 *                      description: nombre de la estación
 *                  latitude:
 *                      type: number
 *                      description: latitud de la ubicación de la estación
 *                  longitude:
 *                      type: number
 *                      description: longitud de la ubicación de la estación
 *                  tipo: 
 *                      type: string
 *                      description: tipo de estación
 *                  status:
 *                      type: boolean
 *                      description: estado de la estación 
 *                  location_notes:
 *                      type: string
 *                      description: notas de la estación
 *                  id_gateway:
 *                      type: string
 *                      description: id del puente
 *                  id_company:
 *                      type: string
 *                      description: id de la compañia
 *              required:
 *                  - name
 *                  - latitude
 *                  - longitude
 *                  - tipo
 *                  - status
 *                  - location_notes
 *                  - id_gateway
 *                  - id_company
 *              example:
 *                  id: 620dd2bf208318e3b53fbf4e
 *                  name: Estación 1
 *                  latitude: 34
 *                  longitude: 34
 *                  tipo: Frigorífico
 *                  status: Buena
 *                  location_notes: Ubicada en el subterraneo de la U
 *                  id_gateway: 620dd2bf208318e3b53fbf4e
 *                  id_company: 620dd2bf208318e3b53fbf4e
 *      400:
 *        description: ID inválido
 *      404:
 *        description: Error de inexistencia
 */
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
