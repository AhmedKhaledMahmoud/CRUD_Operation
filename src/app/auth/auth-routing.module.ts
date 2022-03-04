import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginAndRegisterGuard } from './guards/login-register-guard.service';

const routes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginAndRegisterGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginAndRegisterGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
