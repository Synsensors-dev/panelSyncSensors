import express from 'express';
import morgan from 'morgan';
import helmet from "helmet";
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import passportMiddleware from './middlewares/passport'
import { createRoles } from "./libs/initialSetup";
import { statusValidator } from "./libs/statusValidator";
import { options } from "./libs/swaggerOptions";
import { createReadingsCron, createAlertCron } from "./libs/readingCron";

// Load enviroments variables
dotenv.config();

// Internal imports
import indexRoutes from './routes/index.routes';

// Config variables
const app = express();
createRoles();
statusValidator();
createReadingsCron();
createAlertCron();

const corsConfig: CorsOptions = {
    origin: process.env.ORIGIN_FRONT_IP,
    credentials: true
};

const specs = swaggerJsDoc(options);

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsConfig));
app.use(passport.initialize());
passport.use(passportMiddleware);


// Routes
app.use(indexRoutes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));    //Documentation

export default app;
