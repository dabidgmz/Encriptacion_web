import { Injectable } from '@angular/core';
import { User } from './user';
import { Modelo } from '../modelo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url : String = "Get_User"
  constructor(private http: HttpClient) { }
  index() : Observable<Modelo<User[]>> {
    return this.http.get<Modelo<User[]>>(environment.apiUrl + this.url);
  }


}
// user service