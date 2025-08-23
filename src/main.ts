// // src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { importProvidersFrom } from '@angular/core';

// import { ToastrModule } from 'ngx-toastr';
// import { appRoutes } from './app/app.routes';
// import { AuthInterceptorProvider } from './app/interceptors/auth.interceptor';

// // ✅ Global icon registration
// import { provideIcons } from '@ng-icons/core';
// import {
//   lucideX,
//   lucideCircle,
//   lucideLoader,
//   lucideCheck,
// } from '@ng-icons/lucide';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(withInterceptorsFromDi()),
//     provideRouter(appRoutes),
//     provideAnimations(),
//     AuthInterceptorProvider,
//     importProvidersFrom(
//       ToastrModule.forRoot({
//         positionClass: 'toast-bottom-right',
//         timeOut: 3000,
//         preventDuplicates: true,
//       })
//     ),
//     // ✅ Global icon registration for all components
//     provideIcons({
//       lucideX,
//       lucideCircle,
//       lucideLoader,
//       lucideCheck,
//     }),
//   ],
// }).catch((err) => console.error(err));



//------------------


// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { appRoutes } from './app/app.routes';
import { AuthInterceptorProvider } from './app/interceptors/auth.interceptor';

// Icons
import { provideIcons } from '@ng-icons/core';
import { lucideX, lucideCircle, lucideLoader, lucideCheck } from '@ng-icons/lucide';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(appRoutes),
    provideAnimations(), // required for ngx-toastr animations
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
    AuthInterceptorProvider,

    // Icons
    provideIcons({ lucideX, lucideCircle, lucideLoader, lucideCheck }),
  ],
}).catch(err => console.error(err));
