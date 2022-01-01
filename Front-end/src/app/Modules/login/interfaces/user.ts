export interface typeUser{
    name:string,
    email:string,
    password:string,
    id_company:string,
    permission_level:number
}
export interface loginReq{
    email:string,
    password:string
}