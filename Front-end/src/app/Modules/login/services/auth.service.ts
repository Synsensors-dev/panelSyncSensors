import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { apiResponse } from '../../shared/interfaces/apiResponse';
import { loginReq, typeUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { bckEndapiURL } from '../../../bckEndRoute';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL= bckEndapiURL
  private user_company_id:string;
  private logged_user_role:string;

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
   * True: Hay alguien logeado, False: no hay alguien logeado
   */
  loggedIn():boolean{
    return !!sessionStorage.getItem('token')
  }

  /**
   * 
   * @returns Retorna token de una sesion iniciada
   */
  getToken(){
    return sessionStorage.getItem('token')
  }
  /**
   * Desloguea una sesión eliminando el token del local storage
   */

  logOut(){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id_company')
    sessionStorage.removeItem("role")
    this.router.navigate(['/login'])
  }
  /**
   * 
   * @returns Id company de usuario logeado
   */

  getUserCompanyId(){
    return sessionStorage.getItem('id_company')
  }

  /**
   * Crea o actualiza la password de un usuario
   */

  resetPassword(newPassword:any,token:any){

    return this.http.put<apiResponse>(this.apiURL + `user/resetPassword/${token}`,{password:newPassword})

  }

  sendResetPasswordRequest(userEmail:any){
    return this.http.post<apiResponse>(this.apiURL + `user/forgotPassword`,{email:userEmail})
  }

  async setUserRole(){
    //Hay que editar para que sea con token en vez de id
    let response = await this.http.get<apiResponse>(this.apiURL + `user/${this.getToken()}`).toPromise();
    sessionStorage.setItem("role",response.data.roles[0])
  }
  getUserRole(){
    return sessionStorage.getItem("role")
  }


}

