import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { User } from './user';
import { UsersService } from './users.service';
import { io } from "socket.io-client";

@Component({
  selector: 'app-index-users',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor,],
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUsersComponent implements OnInit {
  collection: User[] | undefined;
  loading: boolean = false;
  title: string = 'Usuarios';

  constructor(private service: UsersService, private router: Router) {
    this.index();
  }

  ngOnInit(): void {
    const socket = io("ws://127.0.0.1:3333");

    socket.on("connect", () => {
      console.log("Conectado al servidor");
    });

    socket.on("prueba:emit", () => {
      console.log("Conectado al sokect");
    });
    
    socket.on("disconnect", () => {
      console.log("Desconectado del servidor");
    });

    socket.on("usuario:llegado", (message: string) => {
      console.log(message);
      this.index();
    });
  }

  index() {
    this.collection = undefined;
    this.service.index().subscribe({
      next: (data) => {
        this.collection = data.data;
      },
      error: (err) => {
        console.error('Error al obtener los usuarios:', err);
      }
    });
  }

  OnSelectUser(UserName: string): void {
    console.log("Nombre del usuario es: "+ UserName); 
  }
}
