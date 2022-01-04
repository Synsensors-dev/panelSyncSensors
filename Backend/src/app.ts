import express from 'express';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import passportMiddleware from './middlewares/passport'

// Load enviroments variables
dotenv.config();

// Internal imports
import indexRoutes from './routes/index.routes';

// Config variables
const app = express();
const corsConfig: CorsOptions = {
    origin: process.env.ORIGIN_FRONT_IP,
    credentials: true
};

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsConfig));
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.use(indexRoutes);

export default app;
