export default {
    //json web token
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    
    //time
    ALPHA : 600,                            //variable utilizada para agregar un margen de ingreso a las lecturas 
    SECONDS_MINUTE : 60,                    //variable utilizada para convertir ciertos parametros numericos 
    MILISECONDS_MINUTE : 60000,             //variable utilizada para convertir ciertos parametros numericos 
    SECONDS_DAY: 86400,                     //variable utilizada para generar token en el endpoint signUp
    TIME_STATUS_VALIDATOR: "* * * */12 *",     //variable que indica el margen de tiempo en que se inicia el statusValidator (cada 12 meses)
    TIME_ZONE: 1000*60*60*3,                 //tiempo de diferencia de la zona horaria (3hrs)
    WEEK_IN_MILISECONDS: 7*24*60*60*1000 ,  //1 semana en milisegundos
    MILISECONDS_DAY: 1000*60*60*24,          // 1 día en milisegundos
    MILISECONDS_HOUR: 1000*60*60,           // 1 hora en milisegundos
    TIME_READING_CRON: "*/5 * * * *",         //variable que indica el tiempo de cración de lecturas por parte del cron (cada 5minutos)
    TIME_ALERT_CRON: "* */5 * * *",          //variable que indica el tiempo de cración de alertas por parte del cron (cada 5hr)
    LIMIT_ALERT_TIME: 480,                  //480 minutos, 8 horas
    DEFAULT_ALERT_TIME: 30,                 //30 minutos

    //quantity
    LIMIT_READINGS : 100,                   //limite de lecturas a retornar al front en el endpoint sensorReadings
    LIMIT_ALERTS: 20,                       //limite de lecturas a retornar al front en el endpoint recentAlerts
  
    ID_COMPANY_TESTER: "620dd2bf208318e3b53fbf4e",           //id de la compañia creada para testear

    //types of sensors
    TYPES : [ {
        name: 'TEMPERATURE_LIQUID',
        unit: 'Celsius',
        letter: 'C°'
    }, {
        name: 'TDS',
        unit: 'Miligramos/Litro',
        letter: 'mg/L'
    }, {
        name: 'PH',
        unit: '',
        letter: ''
    }, {
        name: 'CO2_GAS',
        unit: 'Partes por millón',
        letter: 'ppm'
    }, {
        name: 'TEMPERATURE_AIR',
        unit: 'Celsius',
        letter: 'C°'
   }, {
        name: 'HUMIDITY_AIR',
        unit: 'gramos/metro cubico',
        letter: 'g/m3'
    }, {
        name: 'SOUND',
        unit: 'decibelio',
        letter: 'dB'
    }, {
        name: 'DISSOLVED_OXYGEN',
        unit: '',
        letter: ''
    }, {
        name: 'TURBIDITY',
        unit: '',
        letter: ''
    }, {
        name: 'CONDUCTIVITY',
        unit: '',
        letter: ''
   }, {
        name: 'OPTICAL_DUST',
        unit: '',
        letter: ''
    }]
}
