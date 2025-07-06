import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'projets',
  imports: [FormsModule,MatInputModule,],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.css'
})
export class ProjetsComponent {
filtre = '';

projets = [
  {
    id: 1,
    nom: 'Assurance Habitation',
    propositions: [
      { id: 101, intitule: 'Maison individuelle', valide: true },
      { id: 102, intitule: 'Appartement', valide: false },
      { id: 103, intitule: 'Villa secondaire', valide: false },
    ],
  },
  {
    id: 2,
    nom: 'Assurance Automobile',
    propositions: [
      { id: 201, intitule: 'Conducteur expérimenté', valide: true },
      { id: 202, intitule: 'Jeune conducteur', valide: true },
    ],
  },
  {
    id: 3,
    nom: 'Complémentaire Santé',
    propositions: [
      { id: 301, intitule: 'Formule Essentielle', valide: false },
      { id: 302, intitule: 'Formule Intégrale', valide: true },
      { id: 303, intitule: 'Formule Senior', valide: false },
    ],
  },
  {
    id: 4,
    nom: 'Assurance Voyage',
    propositions: [
      { id: 401, intitule: 'Couverture Europe', valide: false },
      { id: 402, intitule: 'Couverture Monde', valide: false },
    ],
  },
  {
    id: 5,
    nom: 'Responsabilité Civile Pro',
    propositions: [
      { id: 501, intitule: 'Consultant IT', valide: true },
      { id: 502, intitule: 'Profession libérale', valide: false },
    ],
  },
  {
    id: 6,
    nom: 'Multirisques Professionnelle',
    propositions: [
      { id: 601, intitule: 'Commerce', valide: true },
      { id: 602, intitule: 'Bureau', valide: true },
      { id: 603, intitule: 'Entrepôt', valide: true },
    ],
  },
  {
    id: 7,
    nom: 'Prévoyance Indépendant',
    propositions: [
      { id: 701, intitule: 'Formule Base', valide: false },
      { id: 702, intitule: 'Formule Premium', valide: false },
    ],
  },
  {
    id: 8,
    nom: 'Assurance Emprunteur',
    propositions: [
      { id: 801, intitule: 'Crédit immobilier', valide: true },
    ],
  },
];

constructor(private router: Router){}
  projetsFiltres() {
    const filtreMin = this.filtre.toLowerCase().trim();
    return this.projets.filter(p =>
      p.nom.toLowerCase().includes(filtreMin)
    );
  }

  voirDetails(projet: any) {
    const url = this.router.serializeUrl(
        this.router.createUrlTree(['/courtiers/projet/details/'+projet.id])
      ); window.open(url, '_blank');
  }

  supprimerProjet(projet: any) {
    if (confirm(`Supprimer le projet "${projet.nom}" ?`)) {
      this.projets = this.projets.filter(p => p.id !== projet.id);
    }
  }

  nbrContrat(projet:any){
    return projet.propositions.filter((p:any) =>{return p.valide}).length
  }
}
