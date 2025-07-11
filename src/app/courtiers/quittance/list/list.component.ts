import { Component } from '@angular/core';
import { QuitModel } from '../../../Model/quit.model';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'list',
  imports: [MatIconModule,RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListQuittanceComponent {
  quittances: QuitModel[] = [
    {
      numero: 5001,
      numbor: 1001,
      lignebor: 1,
      idente: 'Q5001',
      contrat: 3001,
      police: 'POL-0001',
      nature: 'C',
      entite: 1,
      cie: 101,
      confie: false,
      gestion: 'AUTO',
      bloque: false,
      affecte: true,
      emission: 1,
      encaiss: 1,
      enreg: new Date(),
      sitcli: 'EMISE',
      dsitcli: new Date(),
      sitcie: 'AFFECTEE',
      retcie: 'OK',
      dsitcie: new Date(),
      numcie: 'NC-0001',
      debeffet: new Date('2025-07-01'),
      fineffet: new Date('2026-07-01'),
      debit: new Date('2025-07-05'),
      soldedu: 15000,
      soldedu1: 'DJF',
      totquit: 20000,
      totquit1: 'DJF',
      ptotale: 21000,
      ptotale1: 'DJF',
      pnette: 18000,
      pnette1: 'DJF',
      comm: 3000,
      comm1: 'DJF',
      taxe: 500,
      taxe1: 'DJF',
      libelle: 'Quittance Auto',
      echprin: false,
    },
    {
      numero: 5002,
      numbor: 1002,
      lignebor: 1,
      idente: 'Q5002',
      contrat: 3002,
      police: 'POL-0002',
      nature: 'R',
      entite: 2,
      cie: 102,
      confie: true,
      gestion: 'SANTE',
      bloque: false,
      affecte: false,
      emission: 2,
      encaiss: 2,
      enreg: new Date(),
      sitcli: 'ENCOURS',
      dsitcli: new Date(),
      sitcie: 'ENCOURS',
      retcie: 'ENATTENTE',
      dsitcie: new Date(),
      numcie: 'NC-0002',
      debeffet: new Date('2025-07-10'),
      fineffet: new Date('2026-07-10'),
      debit: new Date('2025-07-15'),
      soldedu: 8000,
      soldedu1: 'DJF',
      totquit: 12000,
      totquit1: 'DJF',
      ptotale: 12500,
      ptotale1: 'DJF',
      pnette: 11000,
      pnette1: 'DJF',
      comm: 1000,
      comm1: 'DJF',
      taxe: 500,
      taxe1: 'DJF',
      libelle: 'Quittance Santé',
      echprin: true,
    },
    // 8 autres exemples générés automatiquement
    ...Array.from({ length: 8 }, (_, i) => ({
      numero: 5003 + i,
      numbor: 1003 + i,
      lignebor: i + 1,
      idente: `Q500${i + 3}`,
      contrat: 3003 + i,
      police: `POL-000${i + 3}`,
      nature: i % 2 === 0 ? 'C' : 'R',
      entite: (i % 3) + 1,
      cie: 103 + i,
      confie: i % 2 === 0,
      gestion: 'GEN',
      bloque: false,
      affecte: i % 2 === 0,
      emission: 1,
      encaiss: 2,
      enreg: new Date(),
      sitcli: 'ENCOURS',
      dsitcli: new Date(),
      sitcie: 'ENCOURS',
      retcie: 'ENATTENTE',
      dsitcie: new Date(),
      numcie: `NC-000${i + 3}`,
      debeffet: new Date(`2025-07-${10 + i}`),
      fineffet: new Date(`2026-07-${10 + i}`),
      debit: new Date(`2025-07-${12 + i}`),
      soldedu: 5000 + i * 1000,
      soldedu1: 'DJF',
      totquit: 8000 + i * 1000,
      totquit1: 'DJF',
      ptotale: 8500 + i * 1000,
      ptotale1: 'DJF',
      pnette: 7500 + i * 1000,
      pnette1: 'DJF',
      comm: 1000 + i * 200,
      comm1: 'DJF',
      taxe: 500,
      taxe1: 'DJF',
      libelle: `Quittance ${i + 3}`,
      echprin: i % 2 === 0,
    })),
  ];



  encaisser(){

    alert(
      'Quittance encaissé avec succés'
    )
  }
}
