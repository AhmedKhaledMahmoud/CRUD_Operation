import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../models/user';
import { UsersModule } from '../users.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = 'https://jsonplaceholder.typicode.com';
  delay = 0;

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAllUsers() {
    // const token = this.authService.getToken();
    // let headers = new HttpHeaders();
    // headers = headers.append('Authentication', !!token ? 'Bearer ' + token! : '');
    return this.httpClient.get<User[]>(this.baseURL + '/users').pipe(delay(this.delay));
  }

  getUserById(id: number){
    return this.httpClient.get<User>(this.baseURL + '/users/' + id).pipe(delay(this.delay));
  }

  addUser(newUser: Omit<User, 'id'>){
    return this.httpClient.post<User>(this.baseURL + '/users', newUser ).pipe(delay(this.delay));
  }

  editUser(id: number, newUser: Omit<User, 'id'>){
    return this.httpClient.put<User>(this.baseURL + '/users/' + id, newUser).pipe(delay(this.delay));
  }

  deleteUserById(id: number){
    return this.httpClient.delete(this.baseURL + '/users/' + id).pipe(delay(this.delay));
  }
}
