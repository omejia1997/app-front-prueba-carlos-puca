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
  selector: 'editar-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  formulario!: FormGroup;
  name: any;
  mensaje!: any;
  userModel: any = {};
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
    this.userService.user$.subscribe((res) => {
      this.userModel = res;
      if (this.userModel == null) {
        this.back();
      }
    });
  }

  back() {
    this.router.navigate(["list-user"])
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
    console.log(this.userGuardarModel);
    this.userService.updateUser(this.userModel,this.userModel.id).subscribe({
      next: (data) => {
        confirm("User modificado con éxito")
        this.router.navigate(["list-user"])
      },
      error: (err) => {
        alert("Error al modificar el User" +err.response.data.message)
      },
      complete: () => {
        // this.isLoading = false;
      },
    })
  }

}



