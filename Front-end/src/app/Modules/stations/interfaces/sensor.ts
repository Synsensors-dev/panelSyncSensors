export interface typeSensor{
    id:number,
    name:string,
    type:string,
    frequency:number,
    min_config:number,
    max_config:number,
    status:boolean,
    creation_date:Date,
    station_id:number
}
export interface typeReading{
    id:number,
    timestamp:Date,
    value:number,
    sensor_id:number
}