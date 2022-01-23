import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bckEndapiURL } from '../../../bckEndRoute';
import { apiResponse } from '../../shared/interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  apiURL=bckEndapiURL;

  constructor(private http:HttpClient) { }

  getPanelStationsByType(companyId,sensorType){

    console.log({company_id:companyId,type:sensorType})
    return this.http.post<apiResponse>(this.apiURL+ 'panel/stations',{id_company:companyId,type:sensorType})

  }

}
