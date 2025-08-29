import { Component, Input } from '@angular/core';
import { Contrat } from '../../../Model/contrat.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CourtierService } from '../../../Services/courtier/courtier.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-projet',
  imports: [DatePipe, MatIconModule, AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListProjetComponent {
  @Input() isContrat = false;
  @Input() idTier = 0;
  projets: Observable<any[]> = new Observable();
  listProjets: any[] = [];
  constructor(private router: Router, private courtierService: CourtierService) { }

ngOnInit() {
  this.courtierService.getListeDesprojetsDUnTier(this.idTier).subscribe({
    next: (data: any) => {
      // Récupérer le premier élément de projects
      if(Array.isArray(data?.projects?.[0]?.project)) {
      this.listProjets = data?.projects?.[0]?.project ?? [];
      } else{
        this.listProjets = [data?.projects?.[0]?.project] ;
      }
    },
    error: (err) => {
      console.error('API error:', err);
    }
  });
}



  nouveauProjet(): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/courtiers/projets/nouveau/'+this.idTier])
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

  edit(projet: any): void {


      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/courtiers/projets/edit/' + projet.id])
      ); window.open(url, '_blank');

  }
}
