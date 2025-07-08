import { Component } from '@angular/core';
interface Contrat {
  type: string;
  montant: number;
}

interface Sinistre {
  id: string;
  client: string;
  statut: string;
  montant: number;
}

interface Client {
  nom: string;
  dateCreation: string;
}
@Component({
  selector: 'dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
totalContrats = 125;
  primesEncaissees = 95000;
  nouveauxContrats = 8;
  tauxConversion = 65;

  contratsParProduit: Contrat[] = [
    { type: 'Auto', montant: 30000 },
    { type: 'Santé', montant: 25000 },
    { type: 'Habitation', montant: 20000 },
    { type: 'Prévoyance', montant: 20000 },
  ];

  sinistres: Sinistre[] = [
    { id: 'S001', client: 'Dupont Jean', statut: 'En cours', montant: 3200 },
    { id: 'S002', client: 'Martin Alice', statut: 'Réglé', montant: 4500 },
    { id: 'S003', client: 'Durand Paul', statut: 'En attente', montant: 1500 },
  ];

  clientsRecents: Client[] = [
    { nom: 'Bernard Lucie', dateCreation: '2024-06-10' },
    { nom: 'Petit Marc', dateCreation: '2024-06-11' },
    { nom: 'Legrand Sophie', dateCreation: '2024-06-12' },
  ];

}
