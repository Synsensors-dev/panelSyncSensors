import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { apiResponse } from '../../shared/interfaces/apiResponse';
import { loginReq, typeUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL= 'http://localhost:4000/'

  constructor(private http:HttpClient) { }

  /**
   * 
   * @param user variable de tipo typeUser, que se envia para registrar a un usuario.  
   * 
   */
  signUp(user:typeUser){
    return this.http.post<apiResponse>(this.apiURL + '/user/signup',user)
  }

  /**
   * 
   * @param loginData Objeto que guarda un email y un password, para solicitar acceso a la aplicacion
   * 
   */
  signIn(loginData:loginReq){
    return this.http.post<apiResponse>(this.apiURL + '/user/signup',loginData)
  }
}
