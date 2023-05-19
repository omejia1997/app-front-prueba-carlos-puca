import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdmiRol } from 'src/app/models/AdmiRol';
import { AdmiUsuarioService } from 'src/app/services/admi-usuario.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRol implements OnInit {

  formulario!: FormGroup;
  name:any;
  mensaje!: any;
  rol: AdmiRol = {};

  constructor(
    private fb: FormBuilder,
    private rolService: RolService, 
    private router: Router) {
    this.iniciarFormulario();
    this.mensaje = "";
  }

  ngOnInit(): void {
  }

  iniciarFormulario() {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', [Validators.required]]
    })
  }
  
  save() {
    this.rol.status = "Activo";
    this.rolService.registerRol(this.rol).subscribe({
      next: (data) => {
        confirm("rol registrado con éxito")
        this.router.navigate(["list-rols"])
      },
      error: (err) => {
        alert("Error al registrar el rol")
      },
      complete: () => {
        // this.isLoading = false;
      },
    })
  }

}



