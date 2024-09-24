import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { Chat } from '../Models/users.models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { io } from "socket.io-client";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],  
})
export class ChatComponent implements OnInit {
  public text: string = '';
  public error: boolean = false;
  public submitting: boolean = false;
  public messages: { text: string; sender: 'me' | 'other'; encryptedText?: string, showDetails?: boolean, decryptedText?: string }[] = [];

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
          this.messages.push({ text: response.originalText, sender: 'other', encryptedText: response.encryptedText });
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

  toggleDetails(index: number): void {
    const message = this.messages[index];
    
    if (!message.showDetails) {
      const decrypt: Chat = {
        text: '',
        originalText: message.text,  
        encryptedText: message.encryptedText || '',  
        decryptedText: '' 
      };

      this.chatService.decrypttext(decrypt).subscribe({
        next: (response) => {
          message.decryptedText = response.decryptedText;
          message.showDetails = true; 
        },
        error: (error) => {
          console.log('Error desencriptando mensaje:', error);
          alert('Error al desencriptar el mensaje.');
        }
      });
    } else {
      message.showDetails = !message.showDetails;
    }
  }

  ngOnInit(): void {
    const socket = io("ws://127.0.0.1:3333");
  
    if (!socket.hasListeners("new:encrypt_second")) {
      socket.on("new:encrypt_second", (message: any) => {
        const newMessageText = message.encryptedText ? message.encryptedText : message.originalText;
        const messageExists = this.messages.some(m => m.text === newMessageText && m.sender === 'other');
        
        if (!messageExists) {
          this.messages.push({
            text: newMessageText, 
            sender: 'other',
            encryptedText: message.encryptedText,
            showDetails: false
          });
        }
      });
    }
  }
}
