export default {
    //json web token
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    
    //time
    ALPHA : 600,                            //variable utilizada para agregar un margen de ingreso a las lecturas 
    SECONDS_MINUTE : 60,                    //variable utilizada para convertir ciertos parametros numericos 
    MILISECONDS_MINUTE : 60000,             //variable utilizada para convertir ciertos parametros numericos 
    SECONDS_DAY: 86400,                     //variable utilizada para generar token en el endpoint signUp
    TIME_STATUS_VALIDATOR: "* * * 12 *",     //variable que indica el margen de tiempo en que se inicia el statusValidator (1 minuto)

    //quantity
    LIMIT_READINGS : 100,                   //limite de lecturas a retornar al front en el endpoint sensorReadings
    LIMIT_ALERTS: 20,                       //limite de lecturas a retornar al front en el endpoint recentAlerts
  
    TYPES : ['TEMPERATURE_LIQUID','TDS','PH',     //tipos de sensores existentes
    'CO2_GAS', 'TEMPERATURE_AIR','HUMIDITY_AIR', 
    'SOUND', 'DISSOLVED_OXYGEN ', 'TURBIDITY ',
    'CONDUCTIVITY','OPTICAL_DUST']
}
