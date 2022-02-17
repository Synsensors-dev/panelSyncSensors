import express from 'express';
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




// Settings
app.set('port', process.env.PORT || 4000);


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://190.215.196.186:4000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    res.setHeader('Allow','GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Pass to next layer of middleware
    next();
});


app.use('/',express.static('client',{redirect:false})) //para produccion

// Routes
app.use(indexRoutes);


app.get('*',function(req,res,next){
    return res.sendFile(path.resolve('client/index.html')); //para produccion
});

export default app;
