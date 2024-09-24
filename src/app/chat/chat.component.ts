import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { Chat } from '../Models/users.models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],  
})
export class ChatComponent {
  public text: string = '';
  public error: boolean = false;
  public submitting: boolean = false;
  public messages: { text: string; sender: 'me' | 'other' }[] = []; 

  constructor(private chatService: ChatService, private router: Router) {}

  onSubmit(): void {
    this.submitting = true;
    this.error = false;

    const encrypt: Chat = {
      text: this.text,
      originalText: this.text,  
      encryptedText: this.text,  
      decryptedText: ''         
    };
    this.messages.push({ text: this.text, sender: 'me' });

    this.chatService.text(encrypt).subscribe({
      next: (response) => {
        if (response.originalText !== this.text) {
          this.messages.push({ text: response.originalText, sender: 'other' });
        }
        this.text = '';
        this.submitting = false; 
      },
      error: (error) => {
        console.log('Status Code:', error.status);
        this.error = true;
        alert(`Error ${error.status}: ${error.message}`);
        this.submitting = false; 
      },
    });
  }
}
