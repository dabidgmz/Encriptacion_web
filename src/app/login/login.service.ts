import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../Models/users.models';
import { environment } from '../../environments/environment.development'; // Cambia el path si es necesario

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string = 'Login_User'; 

  constructor(private http: HttpClient) {}

  loginUser(user: UserLogin): Observable<any> {
    return this.http.post<any>(environment.apiUrl + this.url, user);
  }
}
