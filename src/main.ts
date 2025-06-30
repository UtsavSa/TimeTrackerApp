// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';
import { appRoutes } from './app/app.routes';
import { AuthInterceptorProvider } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // ✅ Uses interceptors provided via DI
    provideRouter(appRoutes),
    provideAnimations(),
    AuthInterceptorProvider, // ✅ Registers your class-based AuthInterceptor
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        timeOut: 3000,
        preventDuplicates: true,
      })
    ),
  ],
}).catch((err) => console.error(err));
