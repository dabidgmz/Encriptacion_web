import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatMessageService } from './chat.service';
import { Chat } from '../Models/users.models';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { io } from "socket.io-client";

@Component({
  selector: 'app-chat-recive',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './chat-recive.component.html',
  styleUrl: './chat-recive.component.css'
})
export class ChatReciveComponent implements OnInit {
  public text: string = '';
  public receivedMessage: string = '';
  public error: boolean = false;
  public submitting: boolean = false;
  public messages: { text: string; sender: 'me' | 'other'; encryptedText?: string }[] = [];


  constructor(private chatMessageService: ChatMessageService, private router: Router) {}

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

    this.chatMessageService.text(encrypt).subscribe({
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
  ngOnInit(): void {
    const socket = io("ws://127.0.0.1:3333");
  
    if (!socket.hasListeners("new:encryp")) {
      socket.on("new:encryp", (message: any) => {
        console.log(message);
        
        const newMessageText = message.encryptedText ? message.encryptedText : message.originalText;
  
        // Verificar si el mensaje ya existe en el array para evitar duplicados
        const messageExists = this.messages.some(m => m.text === newMessageText && m.sender === 'other');
        
        if (!messageExists) {
          this.messages.push({
            text: newMessageText, 
            sender: 'other',
            encryptedText: message.encryptedText
          });
        }
      });
    }
  }
  
  
  
}
