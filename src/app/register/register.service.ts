import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegister } from '../Models/users.models';
import { environment } from '../../environments/environment.development'; // Cambia el path si es necesario

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private url: string = 'Register_User'; 

  constructor(private http: HttpClient) {}

  User_register(user: UserRegister): Observable<any> {
    return this.http.post<any>(environment.apiUrl + this.url, user);
  }
}