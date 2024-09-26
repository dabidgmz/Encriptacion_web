import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserLogin } from '../Models/users.models';
import { LoginService } from './login.service'; // Asegúrate de que el path sea correcto
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginFormComponent {
  public email: string = '';
  public password: string = '';
  public notfound: boolean = false;
  public error: boolean = false;
  public passwordVerify: boolean = false;
  public submitting: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(): void {
    this.submitting = true;
    this.notfound = false;
    this.error = false;
    this.passwordVerify = false;

    const user: UserLogin = {
      email: this.email,
      password: this.password,
    };

    this.loginService.loginUser(user).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.log('Status Code:', error.status);
        
        if (error.status === 404) {
          this.notfound = true; 
        } else if (error.status === 401) {
          this.passwordVerify = true; 
        } else {
          this.error = true; 
        }
        alert(`Error ${error.status}: ${error.message}`);
        
        this.submitting = false;
      },
    });
  }
}
