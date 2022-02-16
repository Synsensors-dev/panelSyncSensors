import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import passportMiddleware from './middlewares/passport'
import { createRoles } from "./libs/initialSetup";
import { statusValidator } from "./libs/statusValidator";

let path=require('path');
let cors=require('cors')

// Load enviroments variables
dotenv.config();

// Internal imports
import indexRoutes from './routes/index.routes';

// Config variables
const app = express();
createRoles();
statusValidator();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.options('*', cors())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.use('/',express.static('client',{redirect:false})) //para produccion
app.get('*',function(req,res,next){
    return res.sendFile(path.resolve('client/index.html')); //para produccion
});

// Routes
app.use(indexRoutes);

export default app;
