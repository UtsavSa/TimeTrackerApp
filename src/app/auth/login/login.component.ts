// src/app/auth/login/login.component.ts




// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../../../services/authService.service';
// import { toast } from 'ngx-sonner';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   imports: [FormsModule],
// })
// export class LoginComponent {
//   email = '';
//   password = '';
//   isLoading = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   login() {
//     this.isLoading = true;

//     this.authService.login({ email: this.email, password: this.password }).subscribe({
//       next: (res) => {
//         toast.success('Login successful');
//         localStorage.setItem('token', res.token);
//         this.router.navigate(['/dashboard']);
//       },
//       error: (err) => {
//         console.error(err);

//         if (typeof err.error === 'string') {
//           toast.error(err.error);
//         } else if (err.error?.message) {
//           toast.error(err.error.message);
//         } else {
//           toast.error('Login failed. Please check your credentials.');
//         }

//         this.isLoading = false;
//       }
//     });
//   }
// }


//-----------------------------------


// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/authService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { extractServerErrors } from '../../shared/server-error.util';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  submitted = false;

  // Server field errors
  fieldErrors: { email?: string; password?: string } = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  clearServerError(field: 'email' | 'password') {
    if (this.fieldErrors[field]) this.fieldErrors[field] = undefined;
  }

  login(form: NgForm) {
    this.submitted = true;
    this.fieldErrors = {};

    if (form.invalid) return;

    this.isLoading = true;
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toastr.success('Login successful');
        localStorage.setItem('token', res.token); // or this.authService.saveToken(res.token)
        this.router.navigate(['/dashboard']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const parsed = extractServerErrors(err);

        // 401 ProblemDetails -> general toast message
        if (parsed.general) this.toastr.error(parsed.general);

        // If backend ever returns field-level errors for login:
        if (parsed.fields['email']) this.fieldErrors.email = parsed.fields['email'];
        if (parsed.fields['password']) this.fieldErrors.password = parsed.fields['password'];
      }
    });
  }
}
