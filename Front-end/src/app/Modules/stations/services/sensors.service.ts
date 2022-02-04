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
   * @param type 
   * @returns 
   */
  getSensorReadingsByType(type:string){
    return this.http.post<apiResponse>(this.apiURL + `panel/graphic/${this.auth.getUserCompanyId()}`,{type_sensor:type})
  }
    /**
   * endpoint que trae los tipos de sensores de una compañia
   * @returns 
   */
     getSensorTypesOfCompany(){
      return this.http.get<apiResponse>(this.apiURL+ `sensor/types/${this.auth.getUserCompanyId()}`)
    }
  
}
