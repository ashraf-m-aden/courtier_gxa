import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, withDebugTracing, withRouterConfig } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { provideAppStore } from './store/app-store.module';
import { authRoutes } from './auth/auth.routes';
import { animation, AnimationFactory, useAnimation } from '@angular/animations';
import { AnimationDriver } from '@angular/animations/animation_driver.d-DAiEDqQt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './store/features/auth/auth.reducer';
import { AuthEffects } from './store/features/auth/auth.effects';
import { TierEffects } from './courtiers/tier/store/tier.effects';
import { TierReducer } from './courtiers/tier/store/tier.reducer';
import { provideNativeDateAdapter } from '@angular/material/core';


export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({ eventCoalescing: false }),
    importProvidersFrom(BrowserAnimationsModule),

    //provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideStore(),
    provideEffects(),
    provideState('tier', TierReducer),
    provideEffects(TierEffects),
    provideState('auth', authReducer),
    provideEffects(AuthEffects),
    provideNativeDateAdapter(),


    // provideAnimations(),
    provideRouter(appRoutes,
      withRouterConfig({ paramsInheritanceStrategy: 'emptyOnly' })),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })


  ]

};

