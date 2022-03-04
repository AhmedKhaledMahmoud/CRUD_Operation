import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginAndRegisterGuard } from './guards/login-register-guard.service';
import { FakeAPIInterceptor } from './interceptors/fake-api.interceptor';

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
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeAPIInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
