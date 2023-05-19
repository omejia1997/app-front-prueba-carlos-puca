import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdmiRol } from 'src/app/models/AdmiRol';
import { AdmiUsuario } from 'src/app/models/AdmiUsuario';
import { AdmiUsuarioService } from 'src/app/services/admi-usuario.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html'
})
export class ListUserComponent implements OnInit {

  getRoles$: Observable<AdmiRol[]>;
  roles: AdmiRol[]= [];
  getUsers$: Observable<AdmiUsuario[]>;
  users: AdmiUsuario[]= [];
  rolModel:AdmiRol= {};
  
  constructor(
    private userService: AdmiUsuarioService,
    private router: Router,
    private rolService: RolService,
  ) {
    this.getUsers$ = this.userService.getAllUsers();
    this.getRoles$ = this.rolService.getAllRols();
  }

  ngOnInit(): void {
    this.getRols();
    this.getUsers();
  }

  getRols() {
    this.getRoles$.subscribe(data =>{
      this.roles = data;  
    });
  }

  getUsers() {
    this.getUsers$.subscribe(data =>{
      this.users = data;  
    });
  }

  getUsersByRol(){
    this.userService.getAllUsersByRol(this.rolModel.id).subscribe(data =>{
      this.users = data;  
    });
  }

  navigateCreateUser(){
    this.router.navigate(['create-user']);
  }

  listUserByRol(){

  }

  listAllUser(){
    this.getUsers();
  }

  edit(user:AdmiUsuario){
    this.userService.setUser(user);
    this.router.navigate(['update-user']);
  }

  delete(user:AdmiUsuario){
    this.userService.deleteUser(user.id).subscribe({
      next: (data) => {
        //confirm("Curso eliminado con éxito");
        window.location.href = window.location.href;
      },
      error: (err) => {
        alert("Error al eliminar el user")
      },
      complete: () => {
        // this.isLoading = false;
      },
    });
    this.router.navigate(['list-user']);
  }
}
