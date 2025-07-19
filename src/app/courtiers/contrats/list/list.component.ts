import { Component, Input } from '@angular/core';
import { Contrat } from '../../../Model/contrat.model';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-contrat',
  imports: [DatePipe, MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListContratComponent {
  @Input() contrats: Contrat[] = [];
  @Input() isContrat = false;

  constructor(private router: Router) { }

  nouveauContrat(): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/courtiers/contrats/nouveau'])
    );
    window.open(url, '_blank');
  }


  nouveauProjet(): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/courtiers/projets/nouveau'])
    );
    window.open(url, '_blank');
  }
  voir(contrat:any): void {

    if (this.isContrat) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/courtiers/contrats/details/'+contrat.Contrat])
      ); window.open(url, '_blank');

    } else {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/courtiers/projets/details/'+contrat.Contrat])
      ); window.open(url, '_blank');

    }
  }
}
