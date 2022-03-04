import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { LoginAndRegisterGuard } from './auth/guards/login-register-guard.service';
import { RegisterComponent } from './auth/components/register/register.component';
import { UsersComponent } from './users/components/users/users.component';

const routes: Route[] = [
  {path: '',pathMatch: 'full', redirectTo: '/users' },
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
