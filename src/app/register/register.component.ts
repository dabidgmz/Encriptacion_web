import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserRegister } from '../Models/users.models';
import { RegisterService } from './register.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public name: string = '';
  public confirm_password: string = '';
  public email: string = '';
  public password: string = '';
  public notfound: boolean = false;
  public error: boolean = false;
  public passwordVerify: boolean = false;
  public submitting: boolean = false;

  constructor(private RegisterService: RegisterService, private router: Router) {}

  onSubmit(): void {
    this.submitting = true;
    this.notfound = false;
    this.error = false;
    this.passwordVerify = false;

    const user: UserRegister = {
      name: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,

    };

    this.RegisterService.User_register(user).subscribe({
      next: () => {
        this.router.navigate(['code']);
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
