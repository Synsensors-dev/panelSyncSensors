export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',


    TYPES : ['TEMPERATURE_LIQUID','TDS','PH',     //tipos de sensores existentes
    'CO2_GAS', 'TEMPERATURE_AIR','HUMIDITY_AIR', 
    'SOUND', 'DISSOLVED_OXYGEN ', 'TURBIDITY ',
    'CONDUCTIVITY','OPTICAL_DUST']
}