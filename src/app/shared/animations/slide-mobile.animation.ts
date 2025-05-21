// shared/animations/slide-mobile.animation.ts
import {
    trigger,
    transition,
    style,
    animate,
    query,
    group
  } from '@angular/animations';
  
  export const slideMobileAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          width: '100%',
          top: 0
        })
      ], { optional: true }),
  
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ], { optional: true }),
  
      query(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ], { optional: true })
    ])
  ]);
  