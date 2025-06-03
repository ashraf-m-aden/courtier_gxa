import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

interface Proposition {
  intitule: string;
  details: string;
  garanties: string;
}

interface Projet {
  nom: string;
  propositions: Proposition[];
}

@Component({
  selector: 'app-projet-base',
  imports: [FormsModule,MatButtonModule,MatListModule,MatInputModule,MatSelectModule],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class ProjetBaseComponent {
projets: Projet[] = [
    {
      nom: 'Projet Affaire Nouvelle',
      propositions: [
        { intitule: 'Proposition 1', details: 'Détails techniques', garanties: 'Garanties A' },
        { intitule: 'Proposition 2', details: 'Détails techniques', garanties: 'Garanties B' }
      ]
    },
    {
      nom: 'Projet Avenant',
      propositions: [
        { intitule: 'Proposition Avenant 1', details: 'Détails avenant', garanties: 'Garanties X' }
      ]
    }
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

  creerProjet() {
    const nom = prompt('Nom du nouveau projet ?');
    if (nom) {
      this.projets.push({ nom, propositions: [] });
    }
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

  ajouterProposition() {
    if (this.projetSelectionne) {
      const intitule = prompt('Intitulé de la nouvelle proposition ?');
      if (intitule) {
        this.projetSelectionne.propositions.push({ intitule, details: '', garanties: '' });
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
    if (this.propositionSelectionnee) {
      alert(`Proposition "${this.propositionSelectionnee.intitule}" validée !`);
      // Ici tu peux ajouter la logique de transformation en contrat ou avenant
    }
  }
}

