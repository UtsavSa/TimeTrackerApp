// src/app/auth/register/register.component.ts


// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../../../services/authService.service';
// import { toast } from 'ngx-sonner';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   templateUrl: './register.component.html',
//   imports: [FormsModule],
// })
// export class RegisterComponent {
//   email = '';
//   password = '';
//   isLoading = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   register() {
//     this.isLoading = true;

//     this.authService.register({ email: this.email, password: this.password }).subscribe({
//       next: () => {
//         toast.success('Registration successful');
//         this.router.navigate(['/login']);
//       },
//       error: (err) => {
//         console.error(err);

//         if (Array.isArray(err.error)) {
//           const messages = err.error.map((e: any) => e.description || e.code).join('\n');
//           toast.error(messages);
//         } else if (typeof err.error === 'string') {
//           toast.error(err.error);
//         } else if (err.error?.message) {
//           toast.error(err.error.message);
//         } else {
//           toast.error('Registration failed. Please try again.');
//         }

//         this.isLoading = false;
//       }
//     });
//   }
// }


//--------------------------------------------



// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/authService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { extractServerErrors } from '../../shared/server-error.util';
import { ToastrService } from 'ngx-toastr';   // ✅

const PASSWORD_RULE = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule],
})
export class RegisterComponent {
  email = '';
  password = '';
  isLoading = false;
  submitted = false;
  fieldErrors: { email?: string; password?: string } = {};

  PASSWORD_REGEX = PASSWORD_RULE;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService       // ✅
  ) {}

  clearServerError(field: 'email' | 'password') {
    if (this.fieldErrors[field]) this.fieldErrors[field] = undefined;
  }

  register(form: NgForm) {
    this.submitted = true;
    this.fieldErrors = {};

    if (form.invalid) return;

    this.isLoading = true;
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.toastr.success('Registration successful');  // ✅
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        const parsed = extractServerErrors(err);

        if (parsed.fields['email']) this.fieldErrors.email = parsed.fields['email'];
        if (parsed.fields['password']) this.fieldErrors.password = parsed.fields['password'];

        if (parsed.general) this.toastr.error(parsed.general); // ✅
      }
    });
  }
}
