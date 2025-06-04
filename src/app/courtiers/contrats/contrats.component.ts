import { CommonModule, DatePipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
interface Contrat {
  id: number;
  intitule: string;
  numtiers: string;
  nomtiers: string; // affichage du nom du Dpp ou Dpm
  propproj: number;
  numproj: number;
  debcours: string; // ISO format
  fincours: string;
  primann: number;
  statut: 'actif' | 'resilié' | 'suspendu';
}

@Component({
  selector: 'contrats',
  imports: [DatePipe, CommonModule, MatInputModule, FormsModule],
  templateUrl: './contrats.component.html',
  styleUrl: './contrats.component.css'
})
export class ContratsComponent {
  contrats: Contrat[] = [
    {
      id: 1,
      intitule: 'Assurance Habitation - Maison',
      numtiers: 'DPP001',
      nomtiers: 'Jean Dupont',
      propproj: 101,
      numproj: 1,
      debcours: '2025-01-01',
      fincours: '2025-12-31',
      primann: 420.5,
      statut: 'actif',
    },
    {
      id: 2,
      intitule: 'Auto - Jeune conducteur',
      numtiers: 'DPP002',
      nomtiers: 'Emma Martin',
      propproj: 202,
      numproj: 2,
      debcours: '2024-09-15',
      fincours: '2025-09-14',
      primann: 1120,
      statut: 'actif',
    },
    {
      id: 3,
      intitule: 'Santé - Formule Intégrale',
      numtiers: 'DPP003',
      nomtiers: 'Ali Bakar',
      propproj: 302,
      numproj: 3,
      debcours: '2024-06-01',
      fincours: '2025-05-31',
      primann: 680.75,
      statut: 'suspendu',
    },
    {
      id: 4,
      intitule: 'Responsabilité Civile - Consultant',
      numtiers: 'DPM001',
      nomtiers: 'Cabinet Horizon SARL',
      propproj: 501,
      numproj: 5,
      debcours: '2023-11-01',
      fincours: '2024-10-31',
      primann: 980,
      statut: 'resilié',
    },
    {
      id: 5,
      intitule: 'Voyage - Monde',
      numtiers: 'DPP004',
      nomtiers: 'Noura Elmi',
      propproj: 402,
      numproj: 4,
      debcours: '2025-07-01',
      fincours: '2026-06-30',
      primann: 210,
      statut: 'actif',
    },
    {
      id: 6,
      intitule: 'Multirisque - Bureau',
      numtiers: 'DPM002',
      nomtiers: 'BuroTech Solutions',
      propproj: 602,
      numproj: 6,
      debcours: '2024-02-01',
      fincours: '2025-01-31',
      primann: 1350.3,
      statut: 'actif',
    },
    {
      id: 7,
      intitule: 'Emprunteur - Crédit Immo',
      numtiers: 'DPP005',
      nomtiers: 'Salif Camara',
      propproj: 801,
      numproj: 8,
      debcours: '2023-05-01',
      fincours: '2043-04-30',
      primann: 460.2,
      statut: 'actif',
    },
    {
      id: 8,
      intitule: 'Prévoyance - Premium',
      numtiers: 'DPP006',
      nomtiers: 'Leila Oumar',
      propproj: 702,
      numproj: 7,
      debcours: '2025-03-01',
      fincours: '2026-02-28',
      primann: 950,
      statut: 'suspendu',
    }
  ];

  searchText = '';


  filteredContrats = computed(() => {
    const query = this.searchText.toLowerCase().trim();
    if (query != "") {
      return this.contrats.filter(c =>
        c.intitule.toLowerCase().includes(query) ||
        c.nomtiers.toLowerCase().includes(query)
      );
    } else {
      return this.contrats;
    }

  });
}
