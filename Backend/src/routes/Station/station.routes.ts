import { Router } from 'express';
import * as stationCtrl from './station.controller';

const router = Router();

// Agregar nueva estación
router.post('/station', stationCtrl.createStation);

// Modificar una estación
router.put('/station/:id', stationCtrl.updateStation);

// Mostrar una estación
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
