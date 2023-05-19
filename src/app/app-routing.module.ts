import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateRol } from './pages/rol/create-rol/create-rol.component';
import { ListRolComponent } from './pages/rol/list-rol/lista-rol.component';
import { UpdateRolComponent } from './pages/rol/update-rol/update-rol.component';
import { ListUserComponent } from './pages/user/list-user/list-user.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { UpdateUserComponent } from './pages/user/update-user/update-user.component';
import { UserGuardGuard } from './guards/user-guard.guard';

const routes: Routes = [
  {path: '', redirectTo:'/login' ,pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  //{path: 'register', component:RegisterComponent},
  {path: 'home', component:HomeComponent,canActivate:[UserGuardGuard]},
  {path: 'list-rols', component:ListRolComponent,canActivate:[UserGuardGuard]},
  {path: 'create-rol', component:CreateRol,canActivate:[UserGuardGuard]},
  {path: 'update-rol', component:UpdateRolComponent,canActivate:[UserGuardGuard]},
  {path: 'list-user', component:ListUserComponent,canActivate:[UserGuardGuard]},
  {path: 'create-user', component:CreateUserComponent,canActivate:[UserGuardGuard]},
  {path: 'update-user', component:UpdateUserComponent,canActivate:[UserGuardGuard]},
  {path: '**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
