import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';


export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({ eventCoalescing: false }),
    importProvidersFrom(BrowserAnimationsModule),

    //provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideStore(),
    provideEffects(),

   // provideAnimations(),
 provideRouter(appRoutes,
    withRouterConfig({paramsInheritanceStrategy: 'emptyOnly'})),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })


  ]

};

