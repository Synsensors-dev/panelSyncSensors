import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import passportMiddleware from './middlewares/passport'
import { createRoles } from "./libs/initialSetup";
import { statusValidator } from "./libs/statusValidator";

let path=require('path');

// Load enviroments variables
dotenv.config();

// Internal imports
import indexRoutes from './routes/index.routes';

// Config variables
const app = express();
createRoles();
statusValidator();

const corsConfig: CorsOptions = {
    origin: process.env.ORIGIN_FRONT_IP,
    credentials: true
};



// Settings
app.set('port', process.env.PORT || 4000);

app.use('/',express.static('client',{redirect:false})) //para produccion
app.get('*',function(req,res,next){
    return res.sendFile(path.resolve('client/index.html')); //para produccion
});

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
