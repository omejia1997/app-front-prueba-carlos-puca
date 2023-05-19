import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdmiRol } from 'src/app/models/AdmiRol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html'
})
export class ListRolComponent implements OnInit {

  getRoles$: Observable<AdmiRol[]>;
  roles: AdmiRol[] = [];

  constructor(
    private rolService: RolService,
    private router: Router,
  ) {
    this.getRoles$ = this.rolService.getAllRols();
  }

  ngOnInit(): void {
    this.getRols();
  }

  getRols() {
    this.getRoles$.subscribe(data => {
      this.roles = data;
    });
  }

  navigateCreateRol() {
    this.router.navigate(['create-rol']);
  }

  edit(rol: AdmiRol) {
    this.rolService.setRol(rol);
    this.router.navigate(['update-rol']);
  }

  delete(rol: AdmiRol) {
    var opcion = confirm("Esta seguro de eliminar este Rol\nDebido a que se eliminaran todos los roles asignados a este usuario");
    if (opcion == true) {
      this.rolService.deleteRol(rol.id).subscribe({
        next: (data) => {
          //confirm("Curso eliminado con éxito");
          window.location.href = window.location.href;
        },
        error: (err) => {
          alert("Error al eliminar el rol")
        },
        complete: () => {
          // this.isLoading = false;
        },
      });
      this.router.navigate(['list-rols']);
    } else {

    }

  }

  changeState(rol: AdmiRol) {
    this.rolService.changeState(rol.id).subscribe({
      next: (data) => {
        //confirm("Curso eliminado con éxito");
        window.location.href = window.location.href;
      },
      error: (err) => {
        alert("Error al cambiar el estado del rol")
      },
      complete: () => {
        // this.isLoading = false;
      },
    });
    this.router.navigate(['list-rols']);
  }
}
