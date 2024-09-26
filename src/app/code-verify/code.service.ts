import { Injectable } from '@angular/core';
import { Modelo } from '../modelo';
import { Code } from './code';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CodeService{
  private eUrl: string = "confirm-email";

  constructor(private http: HttpClient) { }


  Code(code: Code) : Observable<Modelo<Code>> { 
    return this.http.post<Modelo<Code>>(environment.apiUrl + this.eUrl,code);
  }
}
