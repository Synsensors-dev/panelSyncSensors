import {Router} from 'express';

import companyRoutes from './Company/company.routes';
import stationRoutes from './Station/station.routes';
import userRoutes from './User/user.routes';
import sensorRoutes from './Sensor/sensor.routes';
import readingRoutes from './Reading/reading.routes';


const router = Router();

router.get('/', (req, res) => {
    return res.send('Welcome to my API!');
});

export default [router, companyRoutes, stationRoutes, userRoutes, sensorRoutes, readingRoutes];
