import {Router} from 'express';

import companyRoutes from './Company/company.routes';
import stationRoutes from './Station/station.routes';


const router = Router();

router.get('/', (req, res) => {
    return res.send('Welcome to my API!');
});

export default [router, companyRoutes, stationRoutes];
