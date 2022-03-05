import config from "../config/config";

/**
 * Función encargada de crear un arreglo con tipos de datos Date(), según el time ingresado, ya sea en 12hrs, 24hrs, 
 * 7 días, 30 días, 3 meses y 6 meses.
 */
export function createTimeArray( time: any ) {

    const current_date = new Date();
    let date:any = [];

    //Hours
    if ( time == 12 || time == 24){

        const last_hour = new Date();

        //seteamos la ultima hora
        last_hour.setMinutes(0);
        last_hour.setSeconds(0);
        last_hour.setMilliseconds(0);

        //almacenamos la ultima hora completa
        date[0] = last_hour;

        //Bucleamos obteniendo las horas restantes 
        for ( let i = 1; i < time ; i++){
            date[i] = new Date( date[i-1] - config.MILISECONDS_HOUR);
        }

        //invertimos el orden
        date.reverse();
        
        //almacenamos la hora actual (con sus minutos extras)
        date.push(current_date);
    }

    //Days
    if ( time == 7 || time == 30 ){

        const last_day = new Date();

        //seteamos la hora a las 0:00:00:00
        last_day.setHours(0);
        last_day.setMinutes(0);
        last_day.setSeconds(0);
        last_day.setMilliseconds(0);

        //almacenamos el día actual
        date[0] = last_day;

        //Bucleamos obteniendo los otros 29 días anteriores
        for ( let i = 1; i < time ; i++){
            date[i] = new Date( date[i-1] - config.MILISECONDS_DAY );
        }

        //invertimos el orden
        date.reverse();

        //insertamos la fecha actual
        date.push(current_date);
    } 

    //Months
    if ( time == 3 || time == 6 ){

        //almacenamos el ultimo mes
        date[0] = new Date( current_date.getFullYear(), current_date.getMonth() );

        //obtenemos los ultimos N° meses
        for (let i = 1; i < time; i++ ) {

            if ( date[i-1].getMonth() == 0 ){
                date[i] = new Date( date[i-1].getUTCFullYear() - 1, 11 );
            } else {
                date[i] = new Date( date[i-1].getFullYear(), date[i-1].getMonth() - 1 );
            }
        }

        //invertimos el orden
        date.reverse();
        
        //insertamos la fecha actual
        date.push(current_date);
    }  
    
    return date;
}

/**
 * Función encargada de dar formato a un arreglo con datos del tipo Date() a un estilo legible para el front.
 */
export function createTimeFormat( date: any, time:any) {

    //Cambiamos el formato de las horas
    if ( time == 12 || time == 24 ){
        
        for ( let i = 0; i < date.length; i++ ){
            date[i] = date[i].getHours();
        }
    }

    //Cambiamos el formato de los días
    if ( time == 7 || time == 30 ){

        for ( let i = 0; i < date.length; i++ ){
            const date_time_zone = new Date( date[i].getTime() - config.TIME_ZONE);

            date[i] = date_time_zone.toISOString().substring(0,10);
        }
    } 

    //Cambiamos el formato de los meses
    if ( time == 3 || time == 6 ){
        const month_names = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        
        for ( let i = 0; i < date.length - 1; i++ ){
            const date_time_zone = new Date( date[i].getTime() - config.TIME_ZONE);

            date[i] =  month_names[date_time_zone.getMonth()];
        }
    }

    //Se borra la ultima fecha
    date.pop();
}
