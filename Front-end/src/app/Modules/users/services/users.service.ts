import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bckEndapiURL } from '../../../bckEndRoute';
import { AuthService } from '../../login/services/auth.service';
import { apiResponse } from '../../shared/interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiURL=bckEndapiURL;

  constructor(private http:HttpClient , private auth:AuthService) { }

  getUserList(){
    return this.http.get<apiResponse>(this.apiURL +`users/${this.auth.getUserCompanyId()}`)
  }


}
