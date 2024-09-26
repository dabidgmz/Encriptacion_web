import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { code } from '../Models/users.models';
import { CodeService } from './code.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-code-verify',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './code-verify.component.html',
  styleUrl: './code-verify.component.css'
})
export class CodeVerifyComponent {
 public code: string = '';
 constructor(private codeService: CodeService, private router: Router){}

 onSubmit(): void {
  const code: code = {
    code: this.code
  }

  this.codeService.Code(code).subscribe({
    next: () => {
      this.router.navigate(['user_index']);
    },
    error: (error) => {
      alert(`Error ${error.status}: ${error.message}`);
    }
  })
 }
}
