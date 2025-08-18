import { Contrat } from './../../../Model/contrat.model';
import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CourtierService } from '../../../Services/courtier/courtier.service';

@Component({
  selector: 'app-list-contrat',
  imports: [DatePipe, MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListContratComponent {
  @Input() isContrat = false;
  @Input() idTier = 0;
  contrats: Contrat[] = []
  projets: Contrat[] = []
  constructor(private router: Router, private courtierService: CourtierService) { }

  async ngOnInit() {




    await this.courtierService.getListeDesContratsDUnTier(this.idTier).subscribe({
      next: async (dataC: any) => {
        if (Array.isArray(dataC)) {
          console.log("projet dataC", dataC);

          this.contrats = dataC.filter((c: any) => { return c.Contrat });
        } else {
          console.log("projet dataC not array", dataC);
          if (dataC.Contrat) {

            this.contrats.push(dataC);
          }
        }
      }
    });


  }
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
  voir(contrat: any): void {

    if (this.isContrat) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/courtiers/contrats/details/' + contrat.Contrat])
      ); window.open(url, '_blank');

    } else {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/courtiers/projets/details/' + contrat.Contrat])
      ); window.open(url, '_blank');

    }
  }

  edit(contrat: any): void {

    if (this.isContrat) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/courtiers/contrats/edit/' + contrat.Contrat])
      ); window.open(url, '_blank');

    } else {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/courtiers/projets/edit/' + contrat.Contrat])
      ); window.open(url, '_blank');

    }
  }
}
