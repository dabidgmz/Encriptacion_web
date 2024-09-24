import { Injectable } from '@angular/core';
import { Modelo } from '../modelo';
import { Chat } from '../Models/users.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private encryptUrl: string = "encrypt"; 
  private decryptUrl: string = "decrypt"; 

  constructor(private http: HttpClient) { }

  text(encrypt: Chat) : Observable<Modelo<Chat>> { 
    return this.http.post<Modelo<Chat>>(environment.apiUrl + this.encryptUrl, encrypt);
  }

  decrypt_text(decrypt: Chat) : Observable<Modelo<Chat>> {
    return this.http.post<any>(environment.apiUrl + this.decryptUrl, decrypt);
  }
}
