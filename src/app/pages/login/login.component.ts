import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { AdmiUsuarioService } from 'src/app/services/admi-usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formReactive!: FormGroup;
  visible:boolean=true;
  changetype:boolean=true;
  usuarioService:any;
  passwordService:any;
  flag:boolean=true;
  conf:boolean=true;
  docente: any;
  perfil:any;
  user: any;
  loginRequest:LoginRequest={};

  constructor(
    private fb:FormBuilder, 
    private router: Router,
    private admiUsuarioService: AdmiUsuarioService,
    private cookieService:CookieService
    ) { 
    this.iniciarFormulario();
  }

  ngOnInit(): void {
  }


  iniciarFormulario(){
    this.formReactive=this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required],
    })
    
  }

  consult(){
    this.loginRequest.username= this.formReactive.value.usuario;
    this.loginRequest.password=this.formReactive.value.password;
    this.admiUsuarioService.login(this.loginRequest).subscribe({
      next: (user) => {
        this.user = user;
        this.cookieService.set('token',this.user);
        this.admiUsuarioService.getUserByUsername(this.formReactive.value.usuario).subscribe(data =>{
          console.log(data);
          localStorage.setItem('user',data.id);
          localStorage.setItem('nameUser', data.nombres +" "+data.apellidos );
          this.admiUsuarioService.getRoles(data.id).subscribe(data =>{
            data.forEach(rol => {
              if(rol.nombre=="ADMINISTRADOR")
                localStorage.setItem('esAdmin','SI');
            });    
          });
            
        });
        
        this.router.navigate(['./home']);
      },
      error: (err) => {
        this.flag = false;
      },
      complete: () => {
        // this.isLoading = false;
      },
    });
  }

  mostrarcontrasenia(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
 
  }

}
