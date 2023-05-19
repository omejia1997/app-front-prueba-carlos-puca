import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdmiUsuario } from '../models/AdmiUsuario';
import { AdmiRol } from '../models/AdmiRol';


const URL = "http://localhost:5000"
const ROL = URL + '/admin-roles';

@Injectable({
  providedIn: 'root'
})

export class RolService {

  private rol$$ = new BehaviorSubject<AdmiRol | null>(null);
  rol$ = this.rol$$.asObservable();

  constructor(private http: HttpClient) { }

  public setRol(rol:AdmiRol) {
    this.rol$$.next(rol);
  }  

  registerRol(rol:AdmiRol) {
    return this.http.post<any>(`${ROL}/save`,rol); 
  }


  updateRol(rol:AdmiRol) {
    return this.http.put<any>(`${ROL}/update/${rol.id}`,rol); 
  }

  getAllRols(){
    return this.http.get<AdmiUsuario[]>(`${ROL}/all`);
  }

  deleteRol(idCourse:any){
    return this.http.delete<Boolean>(`${ROL}/delete/${idCourse}`);
  }
}
