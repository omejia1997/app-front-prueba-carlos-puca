import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'editar-update-rol',
  templateUrl: './update-rol.component.html',
  styleUrls: ['./update-rol.component.css']
})
export class UpdateRolComponent implements OnInit {

  formulario!: FormGroup;
  name:any;
  mensaje!: any;
  rol: any = {};

  constructor(
    private fb: FormBuilder,
    private rolService: RolService, 
    private router: Router) {
    this.iniciarFormulario();
    this.rolService.rol$.subscribe((res) => {
      this.rol = res;
      if (this.rol == null) {
        this.back();
      }
    });
  }

  ngOnInit(): void {
  }

  iniciarFormulario() {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', [Validators.required]]
    })
  }

  back() {
    this.router.navigate(["list-rols"])
  }
  
  save() {
    this.rolService.updateRol(this.rol).subscribe({
      next: (data) => {
        confirm("Datos actualizados con éxito")
        this.router.navigate(["list-rols"])
      },
      error: (err) => {
        alert("Error al actualizar los datos")
      },
      complete: () => {
        // this.isLoading = false;
      },
    })
  }

}



