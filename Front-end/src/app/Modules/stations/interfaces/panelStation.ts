export interface panelStation{
    id_station:string,
    name_station:string,
    sensor:{
        id_sensor:string,
        last_reading:number,
        max_config:number,
        min_config:number,
        status:boolean,
        type:string
    }

}