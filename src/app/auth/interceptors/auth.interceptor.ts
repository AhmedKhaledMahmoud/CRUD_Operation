import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService ){

  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //add auth header
    const token = this.authService.getToken();
    let updatedHeaders = new HttpHeaders();
    updatedHeaders =  updatedHeaders.append('Authentication', !!token ? 'Bearer ' + token : '');
    const updatedRequest =   request.clone({
      headers: updatedHeaders
    });
    return next.handle(updatedRequest);
  }
}
