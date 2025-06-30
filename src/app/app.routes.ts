// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './guards/guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },

  // ✅ Protected routes
  { path: 'puncher', component: TimeTrackerComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: 'home' } // Catch-all
];
