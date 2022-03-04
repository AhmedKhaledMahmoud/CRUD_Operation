import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AuthGuard } from '../auth/guards/auth-guard.service';
import { AuthenticationInterceptor } from '../auth/interceptors/auth.interceptor';
import { UsersComponent } from './components/users/users.component';

const routes: Route[] = [
  { path: '', component: UsersComponent,
   canActivate: [AuthGuard] 
  },
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxSmartModalModule.forChild(),
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
})
export class UsersModule {}
