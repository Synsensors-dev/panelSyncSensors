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

  updateSensorMinMax(sensorId,min_config,max_config){
    return this.http.put<apiResponse>(this.apiURL+ `sensor/config/${sensorId}`,{min_config:min_config,max_config:max_config})
  }
  getActiveSensors(){
    return this.http.get<apiResponse>(this.apiURL+ `panel/sensors/${this.auth.getUserCompanyId()}`)
  }
}
