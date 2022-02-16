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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With,Content-Type,Accept'
    );
    next();
  });
createRoles();
statusValidator();

const corsConfig: CorsOptions = {
    origin: '*',
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
app.use('/',express.static('client',{redirect:false})) //para produccion
app.get('*',function(req,res,next){
    return res.sendFile(path.resolve('client/index.html')); //para produccion
});

export default app;
