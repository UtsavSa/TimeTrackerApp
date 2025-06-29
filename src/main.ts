// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { ToastrModule } from 'ngx-toastr'; // ✅ Add this
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot()) // ✅ Provide toastr properly
  ],
}).catch(err => {
  console.error('Error bootstrapping the application:', err);
});
