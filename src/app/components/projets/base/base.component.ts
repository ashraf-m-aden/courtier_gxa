import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
interface Contrat {
  intitule: string;
  numtiers: number;
  debcours: string;
  fincours: string;
  primann: number;
  propproj: number; // identifiant de la proposition
  numproj: number;  // identifiant du projet
}

interface Proposition {
  id: number;
  intitule: string;
  valide: boolean;
  details?: string;
  garanties?: string;
  contrat?: Contrat;
}

interface Projet {
  id: number;
  nom: string;
  propositions: Proposition[];
}


@Component({
  selector: 'app-projet-base',
  imports: [FormsModule,MatButtonModule,MatListModule,MatInputModule,MatSelectModule,MatCardModule,MatIconModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class ProjetBaseComponent {

projets: Projet[] = [
  {
    id: 1,
    nom: 'Projet Santé 2025',
    propositions: [
      {
        id: 1,
        intitule: 'Offre basique',
        valide: false,
        details: 'Données techniques...',
        garanties: 'Garantie A, Clause B',
      },
      {
        id: 2,
        intitule: 'Offre premium',
        valide: true,
        contrat: {
          intitule: 'Contrat premium santé',
          numtiers: 1001,
          debcours: '2025-01-01',
          fincours: '2026-01-01',
          primann: 1200,
          propproj: 2,
          numproj: 1,
        },
      },
    ],
  },
  {
    id: 2,
    nom: 'Projet Auto 2025',
    propositions: [
      {
        id: 3,
        intitule: 'Formule classique',
        valide: false,
        details: 'Couverture standard',
        garanties: 'Responsabilité civile',
      },
    ],
  },
];

  projetSelectionne: Projet | null = null;
  propositionSelectionnee: Proposition | null = null;



  selectProjet(projet: Projet) {
    this.projetSelectionne = projet;
    this.propositionSelectionnee = null;
  }

  selectProposition(prop: Proposition) {
    this.propositionSelectionnee = prop;
  }



  effacerProjet() {
    if (this.projetSelectionne) {
      const index = this.projets.indexOf(this.projetSelectionne);
      if (index > -1) {
        this.projets.splice(index, 1);
        this.projetSelectionne = null;
        this.propositionSelectionnee = null;
      }
    }
  }

  renommerProjet() {
    if (this.projetSelectionne) {
      const nom = prompt('Nouveau nom du projet ?', this.projetSelectionne.nom);
      if (nom) {
        this.projetSelectionne.nom = nom;
      }
    }
  }

nextProjetId = 3;
nextPropositionId = 4;

creerProjet() {
  const nom = prompt('Nom du projet ?');
  if (nom) {
    this.projets.push({ id: this.nextProjetId++, nom, propositions: [] });
  }
}

ajouterProposition() {
  if (this.projetSelectionne) {
    const intitule = prompt('Intitulé de la proposition ?');
    if (intitule) {
      const nouvelleProp: Proposition = {
        id: this.nextPropositionId++,
        intitule,
        valide: false,
      };
      this.projetSelectionne.propositions.push(nouvelleProp);
    }
  }
}
  effacerProposition() {
    if (this.projetSelectionne && this.propositionSelectionnee) {
      const index = this.projetSelectionne.propositions.indexOf(this.propositionSelectionnee);
      if (index > -1) {
        this.projetSelectionne.propositions.splice(index, 1);
        this.propositionSelectionnee = null;
      }
    }
  }
validerProposition() {
  if (this.projetSelectionne && this.propositionSelectionnee && !this.propositionSelectionnee.valide) {
    this.propositionSelectionnee.valide = true;
    this.propositionSelectionnee.contrat = {
      intitule: this.propositionSelectionnee.intitule,
      numtiers: 0,
      debcours: new Date().toISOString().split('T')[0],
      fincours: '',
      primann: 0,
      propproj: this.propositionSelectionnee.id,
      numproj: this.projetSelectionne.id,
    };
  }
}
}

