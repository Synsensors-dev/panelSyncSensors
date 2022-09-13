import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bckEndapiURL } from '../../../bckEndRoute';
import { AuthService } from '../../login/services/auth.service';
import { apiResponse } from '../../shared/interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class DashboardAlertsService {

  apiURL=bckEndapiURL;

  constructor(private http:HttpClient, private auth:AuthService) {

  }
  getRecentAlerts(){
    return this.http.get<apiResponse>(this.apiURL+ `alert/recent/${this.auth.getUserCompanyId()}`);   
  }
  getQuantityOfRecentAlerts(){
    return this.http.get<apiResponse>(this.apiURL+ `alert/quantity/${this.auth.getUserCompanyId()}`);
  }
}
