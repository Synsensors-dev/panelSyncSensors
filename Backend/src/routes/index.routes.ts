import {Router} from 'express';

import companyRoutes from './Company/company.routes';
import stationRoutes from './Station/station.routes';
import userRoutes from './User/user.routes';
import sensorRoutes from './Sensor/sensor.routes';
import readingRoutes from './Reading/reading.routes';
import alertRoutes from './Alert/alert.routes';


const router = Router();

router.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    return res.send('Welcome to my API!');
});

export default [router, companyRoutes, stationRoutes, userRoutes, sensorRoutes, readingRoutes, alertRoutes];
