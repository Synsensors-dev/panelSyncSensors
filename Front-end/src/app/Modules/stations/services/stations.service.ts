import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bckEndapiURL } from '../../../bckEndRoute';
import { AuthService } from '../../login/services/auth.service';
import { apiResponse } from '../../shared/interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  apiURL=bckEndapiURL;

  constructor(private http:HttpClient , private auth:AuthService) { }

  getPanelStationsByType(companyId,sensorType){

    console.log({company_id:companyId,type:sensorType})
    return this.http.post<apiResponse>(this.apiURL+ 'panel/stations',{id_company:companyId,type:sensorType})

  }
    /**
   * Endpoint que Obtiene el estado de todas las estaciones, con el estado de cada uno de sus sensores.
   * @returns 
   */
     getStationsStatus(){
      return this.http.get<apiResponse>(this.apiURL + `panel/stations/types/${this.auth.getUserCompanyId()}`)
    }

    getStationCoordinates(){
      return this.http.get<apiResponse>(this.apiURL + `station/coordinates/${this.auth.getUserCompanyId()}`)
    }

    changeStationName(newname:any,stationId:any){
      return this.http.put<apiResponse>(this.apiURL+ `station/name/${stationId}`,{name:newname});
    }

}
