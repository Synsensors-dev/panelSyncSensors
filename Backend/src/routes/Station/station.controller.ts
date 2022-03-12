import { RequestHandler } from "express";
import { Types } from 'mongoose';
import Station from './station.model';
import Company from '../Company/company.model';
import Reading from '../Reading/reading.model';
import Sensor from '../Sensor/sensor.model';
import config from '../../config/config'
import { createTimeArray , createTimeFormat } from '../../middlewares/createTime';

/**
 * Función encargada de agregar una nueva estación al sistema. 
 * @route Post '/station/'
 * @param req Request de la petición, se espera que tenga la información de la nueva estación.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" de la nueva estación si todo sale bien.
 */
export const createStation: RequestHandler = async (req, res) => {
    const { id_gateway, id_company, data} = req.body;

    //se valida el id_gateway
    if ( !Types.ObjectId.isValid( id_gateway ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_gateway ingresado no es válido.' });

    //se valida el id_company
    if ( !Types.ObjectId.isValid( id_company ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_company ingresado no es válido.' });

    const companyFound = await Company.findById( id_company );

    //se válida la existencia de la compañía en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });

    //******** se válida la existencia del gateway en el sistema ********

    //se validan los datos obligatorios de la estación
    if ( !data.name || !data.type || !data.status  || !data.location_notes )
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: Los datos a agregar son inválidos.' });

    const newStation = {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        type: data.type,
        status: data.status,
        location_notes: data.location_notes,
        id_gateway: id_gateway,
        id_company: id_company
    }

    //se almacena la estación en el sistema
    const stationSaved = new Station( newStation );
    await stationSaved.save();

    return res.status(201).send({ success: true, data: { _id: stationSaved._id }, message: 'Estación agregada con éxito al sistema.' });
};

/**
 * Función encargada de actualizar una estación del sistema en función de los nuevos valores ingresados.
 * @route Put '/station/:id'
 * @param req Request de la petición, se espera que tenga la nueva información de la estación y su respectivo id por params.
 * @param res Response, retorna un object con succes: true, data: {_id: ObjectId()}, message: "String" de la estación actualizada si todo sale bien.
 */
export const updateStation: RequestHandler = async (req, res) => {
    const _idStation = req.params.id;
    const updatedStation = req.body;

    //se valida el _id ingresado de la estación
    if ( !Types.ObjectId.isValid( _idStation ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });
    
    const stationFound = await Station.findById( _idStation );

    //se valida la existencia de la estación en el sistema
    if ( !stationFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La estación a modificar no existe en el sistema.' });

    //se valida el id_gateway
    if ( !Types.ObjectId.isValid( updatedStation.id_gateway ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_gateway ingresado no es válido.' });

    //se valida el id_company
    if ( !Types.ObjectId.isValid( updatedStation.id_company ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id_company ingresado no es válido.' });

    const companyFound = await Company.findById( updatedStation.id_company );

    //se válida la existencia de la compañía en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });

    //******** se válida la existencia del gateway en el sistema ********

    //se validan los datos obligatorios de la estación
    if ( !updatedStation.data.name || !updatedStation.data.type || !updatedStation.data.status  || !updatedStation.data.location_notes )
        return res.status(301).send({ success: false, data:{}, message: 'ERROR: Los datos a agregar son inválidos.' });
      
    const station = {
        name: updatedStation.data.name,
        latitude: updatedStation.data.latitude,
        longitude: updatedStation.data.longitude,
        type: updatedStation.data.type,
        status: updatedStation.data.status,
        location_notes: updatedStation.data.location_notes,
        id_gateway: updatedStation.id_gateway,
        id_company: updatedStation.id_company
    }

    //se actualiza la estación en el sistema
    await Station.findByIdAndUpdate( _idStation, station );

    return res.status(200).send({ success: true, data:{ _id: _idStation }, message: 'Estación modificada de manera correcta.' });
};

/**
 * Función encargada de obtener una estación del sistema y retornar los datos de ella para su posterior visualización.
 * @route Get '/station/:id'
 * @param req Request de la petición, se espera que tenga el id de la estación.
 * @param res Response, retorna un object con succes: true, data: { station:{} }, message: "String" de la estación si todo sale bien.
 */
export const readStation: RequestHandler = async (req, res) => {
    const _idStation = req.params.id;

    //se valida el _id ingresado de la estación
    if ( !Types.ObjectId.isValid( _idStation ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const stationFound = await Station.findById( _idStation );

    //se valida la existencia de la estación en el sistema
    if ( !stationFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La estación solicitada no existe en el sistema.' });

    return res.status(200).send( { success: true, data:{ 
        _id: stationFound.id,
        name: stationFound.name,
        latitude: stationFound.latitude,
        longitude: stationFound.longitude,
        type: stationFound.type,
        status: stationFound.status,
        location_notes: stationFound.location_notes,
        id_gateway: stationFound.id_gateway,
        id_company: stationFound.id_company
    }, message: 'Estación encontrada con éxito.'});
};

/**
 * Función encargada de eliminar una estación del sistema.
 * @route Delete '/station/:id'
 * @param req Request de la petición, se espera que tenga el id de la estación.
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" de la estación eliminada si todo sale bien.
 */
export const deleteStation: RequestHandler = async (req, res) => {
    const _idStation = req.params.id;

    //se valida el _id ingresado de la estación
    if ( !Types.ObjectId.isValid( _idStation ) )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const stationFound = await Station.findById( _idStation );

    //se valida la existencia de la estación en el sistema
    if ( !stationFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La estación solicitada no existe en el sistema.' });

    /***** Se eliminan las relaciones (sensors, readings, alerts) asociadas a la estación ingresado *****/

    //se elimina la estación del sistema
    await Station.findByIdAndRemove( _idStation );

    return res.status(200).send( { success: true, data:{}, message: 'Estación eliminada de manera correcta.'});
}

/**
 * Función encargada de filtrar las estaciones, sensores y lecturas asociadas a una compañia en particular. 
 * @route Get '/panel/stations'
 * @param req Request de la petición, se espera que tenga el id de la compañia y el tipo del sensor a buscar
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" de las estaciones si todo sale bien.
 */
 export const readPanelStations: RequestHandler = async (req, res) => {
    const { id_company , type } = req.body;

    //se valida el _id ingresado de la compañia
    if ( !Types.ObjectId.isValid( id_company ))
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const companyFound = await Company.findById( id_company );

    //se valida la existencia de la compañia en el sistema
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia solicitada no existe en el sistema.' });

    const sensors = await Sensor.find({ id_company: id_company, type: type });
    const stationsFiltered = [];

    //Se itera en la cantidad de sensores en función a los paramostros de busqueda
    for (let i = 0; i < sensors.length; i++){
        const station = await Station.findById( { _id: sensors[i].id_station } );
        const reading = await Reading.findOne({ id_sensor: sensors[i]._id }).sort({ createdAt: -1 });

        let value = null;

        //se asigna el valor de la ultima lectura
        if ( reading ){
            value = reading.value;
        }
        
        //se obtiene la unidad de medida del tipo de sensor
        let unit;
        for (let j = 0; j < config.TYPES.length; j++) {
            if (sensors[i].type == config.TYPES[j].name){
                unit = config.TYPES[j].letter;
            }
        }

        //se arma el objeto estación
        const stationPanel = {
            id_station: station._id,
            name_station: station.name,
            sensor: {
                id_sensor: sensors[i]._id, 
                name: sensors[i].name,
                min_config: sensors[i].min_config,
                max_config: sensors[i].max_config,
                type: sensors[i].type,
                unit: unit,
                status: sensors[i].status,
                last_reading: value
            }
        }
        //se almacenan los ojetos en el arreglo
        stationsFiltered.push(stationPanel);
    }
    return res.status(200).send( { success: true, data: stationsFiltered, message: 'Estaciones encontradas con exito.'});
}

/**
 * Función encargada de obtener un objecto con las estaciones asociadas a una compañia y el promedio de las lecturas asociadas a
 * cada estación en los ultimos 7 meses. Además de estar filtrado por el tipo de sensor.
 * @route Post '/panel/graphic/:id_company'
 * @param req Request de la petición, se espera que tenga el id de la compañia y el tipo de sensor
 * @param res Response, retorna un object con succes: true, data: { Object }, message: "String" si todo sale bien.
 */
 export const stationGraphic: RequestHandler = async (req, res) => {
    const id_company = req.params.id_company;
    const { type_sensor, time }  = req.body;
  
    //se valida el _id ingresado de la compañia
    if ( !Types.ObjectId.isValid( id_company ))
    return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const companyFound = await Company.findById( id_company );

    //Se valida la existencia de la compañia
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });
    
    //se valida el time
    if ( time!=12 && time!=24 && time!=7 && time!=30 && time!=3 && time!=6 )
        return res.status(400).send({ success: false, data:{}, message: 'ERROR: el valor de time es inválido.' });
 
    const date = createTimeArray(time);

    //Obtenemos las estaciones asociadas a la compañia
    const stations_company = await Station.find({ "id_company": id_company , "readings_station": true });

    let array_stations:any = [];

    //iteramos en las estaciones obtenidas
    for (let k = 0; k < stations_company.length; k++) {
        
        //se obtienen todas las lecturas dentro del margen de fechas
        const readings = await Reading.find({ "id_station": stations_company[k]._id, "type_sensor":type_sensor, "createdAt": {"$gte": date[0], "$lte": date[ date.length - 1] }}).sort({ createdAt: 1 });

        let values = [];

        //se procesan las lecturas separandolas por cada tipo de time
        for ( let i = 0 ; i < date.length - 1; i++){

            let sum = 0;
            let count = 0;

            //bucleamos en las lecturas
            for ( let j = 0; j < readings.length; j++){
                
                if ( readings[j].createdAt >= date[i] && readings[j].createdAt < date[i+1]){
                    sum += readings[j].value;
                    count ++;
                }
            }

            if (count == 0 ){
                values.push(0)
            } else {
                //se almacena el promedio
                values.push(sum / count);
            }
        }

        //creamos la estructura del objeto station
        const station = {
            label: stations_company[k].name,
            data: values
        }
        
        //lo almacenamos en el arreglo de objectos
        array_stations.push(station);
        
    };

    createTimeFormat(date, time);

    return res.status(200).send({ success: true, data:{"time": date, "stations": array_stations}, message: "Estaciones y lecturas encontradas con éxito."});
}

/**
 * Función encargada de obtener un objecto con las estaciones asociadas a una compañia y los tipos de sensores existentes dentro de ella.
 * @route Post '/panel/stations/types/:id_company'
 * @param req Request de la petición, se espera que tenga el id de la compañia.
 * @param res Response, retorna un object con succes: true, data: { Object }, message: "String" si todo sale bien.
 */
export const stationSensorTypes: RequestHandler = async (req, res) => {
    const id_company = req.params.id_company;

    //se valida el _id ingresado de la compañia
    if ( !Types.ObjectId.isValid( id_company ))
    return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const companyFound = await Company.findById( id_company );

    //Se valida la existencia de la compañia
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });


    const types = [];

    //Se itera en busca de los tipos de sensores almacenados en la BD asociados a la compañia ingresada
    for ( let i = 0; i < config.TYPES.length ; i++ ) {
        const type = await Sensor.find({ id_company: id_company }).count({ type: config.TYPES[i].name });

        //se filtran los tipos de sensores existentes
        if ( type > 0 ){
            types.push(config.TYPES[i].name);
        }
    }

    const stations_company = await Station.find({ "id_company": id_company });

    const stations: any = [];

    //se itera el arreglo de estaciones
    for ( let i = 0; i < stations_company.length; i++ ){
        let sensor_status: any = [];

        //se itera en los tipos de sensores
        for (let j = 0; j < types.length; j++ ){

            const quantity_sensor = await Sensor.find({ "id_station": { "_id":stations_company[i]._id }, "type": types[j] }).count();
            
            // No existe sensor del tipo buscado
            if ( quantity_sensor == 0 ){
                sensor_status.push('No tiene');

            //El sensor está prendido o apagado
            } else {    
                const quantity_sensor_ON = await Sensor.find({ "id_station": { "_id":stations_company[i]._id }, "type": types[j], "status": true }).count();
                const quantity_sensor_OFF = await Sensor.find({ "id_station": { "_id":stations_company[i]._id }, "type": types[j], "status": false }).count();
                
                //Comparación simple; deduciendo si hay mas sensores prendidos que apagados
                if ( quantity_sensor_ON >= quantity_sensor_OFF ){
                    sensor_status.push('Encendido');

                } else {
                    sensor_status.push('Apagado');
                }
            }
        }

        //se crean 2 contadores
        let bueno = 0;
        let malo = 0;

        //se obtiene el estado de la estación segun los sensor_status
        for (let k = 0; k < sensor_status.length; k++){

            if (sensor_status[k] == 'Encendido'){
                bueno++;
            }
            if (sensor_status[k] == 'Apagado'){
                malo++;
            }
        }

        let status;
        
        //se le da valor al status segun los contadores
        if ( bueno > malo ){
            status = 'Buena';
        } else {
            if ( bueno == 0 && malo == 0){
                status = 'Desconectada';
            } else{
                if ( malo > bueno ){
                    status = 'Mala';
                } else {
                    status = 'Media'
                }
            }
        }

        //se crea el objeto station
        const station = {
            name: stations_company[i].name,
            status: status,
            sensor_status: sensor_status
        };

        //guardamos la estación en el arreglo de estaciones
        stations.push(station);
    }

    return res.status(200).send({ success: true, 
        data:{"types_of_sensors": types, "stations": stations}, 
        message: 'Estaciones y tipos de sensores encontrados con éxito.' 
    });
}


/**
 * Función encargada de obtener un arreglo con el nombre de las estaciones, latitudes y longitudes
 * @route Get 'station/coordinates/:id_company'
 * @param req Request de la petición, se espera que tenga el id de la compañia.
 * @param res Response, retorna un object con succes: true, data: { Array }, message: "String" si todo sale bien.
 */
export const stationCoordinates: RequestHandler = async (req, res) => {
    const id_company = req.params.id_company;

    //se valida el _id ingresado de la compañia
    if ( !Types.ObjectId.isValid( id_company ))
    return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const companyFound = await Company.findById( id_company );

    //Se valida la existencia de la compañia
    if ( !companyFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La compañia ingresada no existe en el sistema.' });

    //se obtienen las estaciones asociadas a la compañia
    const stations = await Station.find({ "id_company": id_company });

    const stationsFiltered = stations.map( station => {
        return {'name': station.name, 'latitude': station.latitude, 'longitude': station.longitude };
    });

    return res.status(200).send({ success: true, data: stationsFiltered, message: "Coordenadas encontradas con éxito."});
}

/**
 * Función encargada de modificar el nombre de la estación
 * @route Put '/station/name/:id'
 * @param req Request de la petición, se espera que tenga el id de la estación
 * @param res Response, retorna un object con succes: true, data: { }, message: "String" del name si todo sale bien
 */
 export const updateNameStation: RequestHandler = async (req, res) => {
    const _idStation = req.params.id;
    const new_name = req.params.body;

    if ( !new_name )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: no se ingresó un name.' });

    //se valida el _id ingresado de la estación
    if ( !Types.ObjectId.isValid( _idStation ) )
    return res.status(400).send({ success: false, data:{}, message: 'ERROR: El id ingresado no es válido.' });

    const stationFound = await Station.findById( _idStation );

    //se valida la existencia de la estación en el sistema
    if ( !stationFound )
        return res.status(404).send({ success: false, data:{}, message: 'ERROR: La estación ingresado no existe en el sistema.' });

    //se actualiza el name
    await Station.findByIdAndUpdate( _idStation, { "name": new_name });

    return res.status(200).send( { success: true, data:{}, message: 'Estación actualizada de manera correcta.'});
}
