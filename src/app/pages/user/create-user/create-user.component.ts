import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdmiRol } from 'src/app/models/AdmiRol';
import { AdmiUsuario } from 'src/app/models/AdmiUsuario';
import { AdmiUsuarioRequest } from 'src/app/models/AdmiUsuarioRequest';
import { AdmiUsuarioService } from 'src/app/services/admi-usuario.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formulario!: FormGroup;
  name: any;
  mensaje!: any;
  userModel: AdmiUsuario = {};
  userGuardarModel:AdmiUsuarioRequest ={};
  roles: AdmiRol[]=[];
  getRoles$: Observable<AdmiRol[]>;
  rolesAsignados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: AdmiUsuarioService,
    private router: Router,
    private rolService: RolService,
    ) {
    this.iniciarFormulario();
    this.mensaje = "";
    this.getRoles$ = this.rolService.getAllRols();
  }

  ngOnInit(): void {
    this.getRols();
  }

  getRols() {
    this.getRoles$.subscribe(data =>{
      this.roles = data;
      this.roles.forEach(rol => {
        rol.checked = false;
      });  
    });
  }

  iniciarFormulario() {
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]
    })
  }

  cambiarCheckRol(rol: AdmiRol) {
    rol.checked = !rol.checked;
    if (!rol.checked)
      this.rolesAsignados = this.rolesAsignados.filter((item) => item.id !== rol.id);
    else
      this.rolesAsignados.push(rol);
  }

  save() {
    this.userModel.usuarioCreacion = localStorage.getItem('nameUser');
    this.userGuardarModel.admiUsuario = this.userModel;
    this.userGuardarModel.admiRolList = this.rolesAsignados;
    this.userService.register(this.userGuardarModel).subscribe({
      next: (data) => {
        confirm("User registrado con éxito")
        this.router.navigate(["list-user"])
      },
      error: (err) => {
        alert("Error al registrar el User")
      },
      complete: () => {
        // this.isLoading = false;
      },
    })
  }

}



