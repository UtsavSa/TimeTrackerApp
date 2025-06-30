// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/authService.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [FormsModule],
})
export class RegisterComponent {
  email = '';
  password = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.isLoading = true;

    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: () => {
        toast.success('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);

        if (Array.isArray(err.error)) {
          const messages = err.error.map((e: any) => e.description || e.code).join('\n');
          toast.error(messages);
        } else if (typeof err.error === 'string') {
          toast.error(err.error);
        } else if (err.error?.message) {
          toast.error(err.error.message);
        } else {
          toast.error('Registration failed. Please try again.');
        }

        this.isLoading = false;
      }
    });
  }
}
