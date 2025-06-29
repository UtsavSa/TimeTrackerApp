import { Routes } from '@angular/router';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'puncher', component: TimeTrackerComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'home' } // <-- this must come last
];
