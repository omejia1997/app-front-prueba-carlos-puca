import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdmiUsuario } from '../models/AdmiUsuario';
import { LoginResponse } from '../models/LoginResponse';
import { LoginRequest } from '../models/LoginRequest';
import { AdmiUsuarioRequest } from '../models/AdmiUsuarioRequest';


const URL = "http://localhost:5000/api"
const URL2 = "http://localhost:5000/admi-usuarios"
const USER = URL + '/admi-usuarios';
@Injectable({
  providedIn: 'root'
})

export class AdmiUsuarioService {

  private user$$ = new BehaviorSubject<AdmiUsuario | null>(null);
  user$ = this.user$$.asObservable();

  constructor(private http: HttpClient) { }
  
  setUser(user:AdmiUsuario) {
    this.user$$.next(user);
  }  


  login(loginRequest:LoginRequest) {
    return this.http.post<LoginResponse>(`${URL}/login/auth`,loginRequest);
  }

  findUserById(userId:any) {
    return this.http.get<AdmiUsuario>(`${USER}/userById/${userId}`);
  }

  updateUser(user:AdmiUsuario,idUser:any) {
    return this.http.put<any>(`${URL2}/update/${idUser}`,user); 
  }

  register(user:AdmiUsuarioRequest) {
    return this.http.post<any>(`${URL2}/save`,user); 
  }

  getUsersTypeDocent(){
    return this.http.get<AdmiUsuario[]>(`${USER}/allTeachers/Profesor`);
  }
  getAllUsers(){
    return this.http.get<AdmiUsuario[]>(`${URL2}/all`);
  }

  getAllUsersByRol(idRol:any){
    return this.http.get<AdmiUsuario[]>(`${USER}/all/${idRol}`);
  }

  IsLoggedin() {
    return localStorage.getItem('usuario') != null;
  }

  deleteUser(idUser:any){
    return this.http.delete<Boolean>(`${USER}/delete/${idUser}`);
  }

  getUserByUsername(username:string){
    return this.http.get<any>(`${URL2}/by-username/${username}`);
  }

}
