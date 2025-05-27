import { Component, ViewChild, TemplateRef, inject, Output, EventEmitter, effect } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../store/features/auth/auth.state';
import * as AuthSelectors from '../../store/features/auth/auth.selectors';
import * as AuthActions from '../../store/features/auth/auth.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule
  ],

  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('profileDialog') profileDialog!: TemplateRef<any>;
  @Output() drawerOpen = new EventEmitter<any>();
  isDrawerOpen = false;
  private dialog = inject(MatDialog);
  private store = inject(Store<AuthState>);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  public isAuthenticated = toSignal(this.store.select(AuthSelectors.selectIsAuthenticated), { initialValue: true });
  user = toSignal(this.store.pipe(select(AuthSelectors.selectUserProfile)));




  constructor() {
    // effect(() => {

    //   if (!this.isAuthenticated()) {
    //     this.router.navigate(['/login']);
    //     this.snackBar.open('Déconnexion réussie.', 'Fermer', {
    //       duration: 3000,
    //       panelClass: ['mat-toolbar', 'mat-accent'],
    //     });
    //   }
    // });
  }


  openProfileDialog() {
      const dialogRef = this.dialog.open(this.profileDialog);

  }
  closeProfileDialog() {
    if (this.dialog.openDialogs.length !== 0) {
      this.dialog.closeAll();

    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  editProfile() {
    console.log('TODO: redirect to profile edit page');
    // future enhancement
  }

  toggleDrawer() {
    this.drawerOpen.emit()
  }

  ngOnInit() {


  }

}
