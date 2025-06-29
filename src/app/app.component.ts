import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, ToastrModule,FormsModule,  DashboardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
