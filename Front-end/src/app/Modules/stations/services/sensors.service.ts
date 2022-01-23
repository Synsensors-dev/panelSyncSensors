import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bckEndapiURL } from '../../../bckEndRoute';
import { apiResponse } from '../../shared/interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  apiURL=bckEndapiURL;

  constructor(private http:HttpClient) { }

  updateSensorMinMax(sensorId,min_config,max_config){
    return this.http.put<apiResponse>(this.apiURL+ `sensor/config/${sensorId}`,{min_config:min_config,max_config:max_config})
  }
}
