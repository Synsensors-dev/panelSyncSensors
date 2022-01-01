import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { apiResponse } from '../../shared/interfaces/apiResponse';
import { loginReq, typeUser } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL= 'http://localhost:4000/'

  constructor(private http:HttpClient, private router:Router) { }

  /**
   * 
   * @param user variable de tipo typeUser, que se envia para registrar a un usuario.  
   * 
   */
  signUp(user:typeUser){
    console.log(user)
    return this.http.post<apiResponse>(this.apiURL + 'user/signup',user)
  }

  /**
   * 
   * @param loginData Objeto que guarda un email y un password, para solicitar acceso a la aplicacion
   * 
   */
  signIn(loginData:loginReq){
    console.log(loginData)
    return this.http.post<apiResponse>(this.apiURL + 'user/signin',loginData)
  }
  /**
   * 
   * @returns Retorna boolean que indica si hay un usuario logeado o no
   */
  loggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  /**
   * 
   * @returns Retorna token de una sesion iniciada
   */
  getToken(){
    return localStorage.getItem('token')
  }
  /**
   * Desloguea una sesión eliminando el token del local storage
   */

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}

 