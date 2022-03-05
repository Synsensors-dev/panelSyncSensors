import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bckEndapiURL } from '../../../bckEndRoute';
import { AuthService } from '../../login/services/auth.service';
import { apiResponse } from '../../shared/interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  apiURL=bckEndapiURL;

  constructor(private http:HttpClient, private auth:AuthService) { }
  
  /**
   * Endpoint encargado de actualizar los valores minimos y maximos de un sensor en el sistema.
   * @param sensorId Id sensor
   * @param min_config Valor minimo aceptado por el sensor
   * @param max_config Valor maximo aceptado por el sensor
   * @returns 
   */
  updateSensorMinMax(sensorId,min_config,max_config){
    return this.http.put<apiResponse>(this.apiURL+ `sensor/config/${sensorId}`,{min_config:min_config,max_config:max_config})
  }
  /**
   * Endpoint encargado de obtener los sensores activos vs los existentes.
   * @returns 
   */
  getActiveSensors(){
    return this.http.get<apiResponse>(this.apiURL+ `panel/sensors/${this.auth.getUserCompanyId()}`)
  }
  /**
   * Endpoint encargado de traer los reading de los ultimos 7 meses de todas las estaciones para un tipo de sensor.
   * @param type tipo de sensores que se solicitan
   * @param timeRange rango de tiempo de los datos solicitados
   * @returns readings de todas las estaciones separadas, de un tipo de sensor especifico
   */
  getSensorReadingsByType(type:string,timeRange:any){
    return this.http.post<apiResponse>(this.apiURL + `panel/graphic/${this.auth.getUserCompanyId()}`,{type_sensor:type,time:timeRange})
  }
    /**
   * endpoint que trae los tipos de sensores de una compañia
   * @returns 
   */
  getSensorTypesOfCompany(){
    return this.http.get<apiResponse>(this.apiURL+ `sensor/types/${this.auth.getUserCompanyId()}`)
  }
  /**
   * 
   * @param sensorId id sensor
   * @param minutes Tiempo de ocurrencia de alertas en minutos
   * @returns Mensaje de exito
   */
  updateAlertOcurrency(sensorId:any,minutes:number){
    return this.http.put<apiResponse>(this.apiURL+ `sensor/alert_time/${sensorId}`,{alert_time:minutes})
  }
  /**
   * 
   * @param sensorId id del sensor
   * @returns mensaje de exito al actualizar parametros predeterminados de ocurrencia de alertas
   */
  setDefaultAlertOcurrency(sensorId:any){
    return this.http.get<apiResponse>(this.apiURL+ `sensor/custom_alert/${sensorId}`)
  }
  /**
   * 
   * @param sensorId id sensor
   * @returns Alertas asociadas a un sensor
   */
  getSensorAlerts(sensorId:any){
    return this.http.get<apiResponse>(this.apiURL+ `alert/${sensorId}`)
  }
  /**
   * 
   * @param sensorId Id del sensor
   * @param timeRange Rango de tiempo (ultimos x dias) en el que se solicitan los datos "30" dias, "3" meses o "6" meses
   * @returns readings del sensor en el periodo de tiempo solicitado
   */
  getSensorGraphicReadings(sensorId:any,timeRange:any){
    return this.http.post<apiResponse>(this.apiURL+ `readings/graphic/${sensorId}`,{time:timeRange})

  }
  /**
   * 
   * @returns objeto con el numero de readings de la ultima semana de la compañia con la que una cuenta tenga una sesión iniciada.
   */
  getNumberOfReadingsLastWeek(){
    return this.http.get<apiResponse>(this.apiURL+ `readings/week/${this.auth.getUserCompanyId()}`)
  }

  getCustomAlertStatus(sensorId:any){
    return this.http.get<apiResponse>(this.apiURL+ `sensor/custom_alert/value/${sensorId}`)
  }
  
}
