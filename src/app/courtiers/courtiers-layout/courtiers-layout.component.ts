import { Component, inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, AsyncPipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, Subject, takeUntil, filter } from 'rxjs';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { slideFadeAnimation } from '../../shared/animations/route-animations';

@Component({
  selector: 'courtiers-layout',
  imports: [RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    HeaderComponent,
    FooterComponent],
  animations: [slideFadeAnimation],

  templateUrl: './courtiers-layout.component.html',
  styleUrl: './courtiers-layout.component.scss'
})
export class CourtiersLayoutComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  isDesktop$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(result => result?.matches));

  constructor() {
    // Ferme le drawer automatiquement en navigation (mode mobile uniquement)
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        const drawer = document.querySelector('mat-sidenav') as any;
        if (drawer && drawer.close) drawer.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getRouteAnimation(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

}
