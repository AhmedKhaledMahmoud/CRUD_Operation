import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class FakeAPIInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.method === 'POST' &&
      request.url === 'http://localhost:4200/auth/login'
    ) {
      if (request.body.email === 'ahmed@app.com' && request.body.password === '12345678') {
        return of(
          new HttpResponse({
            status: 200,
            body: {
              success: true,
              data: {
                user: { id: '1', name: 'Ahmed', email: 'ahmed@app.com', role: 'admin' },
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiQWhtZWQiLCJlbWFpbCI6ImFAYS5jb20ifQ.2RxoWmDADR8sLfW6CGRcthcuXDk5jQCqxx7kx8rLzjA',
              },
            },
          })
        );
      } else {
        // return of(
        //   new HttpResponse({
        //     status: 401,
        //     body: {
        //       success: false,
        //       data: { error: 'Email or password is incorrect' },
        //     },
        //   })
        // );
        
      }
    }

    if (
      request.method === 'POST' &&
      request.url === 'http://localhost:4200/register'
    ) {
      if (
        request.body.username === 'saleh' &&
        request.body.email === 'saleh@app.com' &&
        request.body.password === '12345678'
      ) {
        return of(
          new HttpResponse({
            status: 200,
            body: {
              success: true,
              data: {
                user: {
                  id: '2',
                  name: 'Saleh',
                  email: 'saleh@app.com',
                },
                token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYW1lIjoiTW9oYW1lZCIsImVtYWlsIjoibUBtLmNvbSJ9.J0LAKT6Uo9Mro23AT3IYZrGcWKEkyvNtqPEJSVWqnUY',
              },
            },
          })
        );
      } else {
        return of(
          new HttpResponse({
            status: 400,
            body: { success: false, data: { error: 'User already exists' } },
          })
        );
      }
    }

    return next.handle(request);
  }
}
