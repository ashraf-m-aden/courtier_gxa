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
  contrats: Contrat[] = [
    {
      contrat: 1001,
      numtiers: 501,
      frac: "Mensuel",
      echpjj: "15",
      echpmm: "06",
      intitule: "Contrat Auto Premium",
      affnouv: "2023-12-01",
      tacite: true,
      prelev: "Prélèvement automatique",
      prelbank: 123456,
      jourp: "15",
      querab: 0,
      realis: 100,
      apport1: 30,
      apport2: 20,
      tauxrea: 5,
      tauxap1: 2,
      tauxap2: 1.5,
      gestionn: "Gestion Alpha",
      portef: "Portefeuille A",
      remplace: "Non",
      remppar: "",
      derpiece: 1,
      memo: "Contrat prioritaire",
      ext: "Extension A",
      primann: 1200.5,
      primann1: "1200.50 EUR",
      commann: 150,
      commann1: "150 EUR",
      totann: 1350.5,
      totann1: "1350.50 EUR",
      dateresi: "2024-11-30",
      debcours: "2024-01-01",
      fincours: "2024-12-31",
      debsuiv: "2025-01-01",
      finsuiv: "2025-12-31",
      debann: "2024-01-01",
      finann: "2024-12-31",
      nbsin: 2,
      impaye: 0,
      impaye1: "0 EUR",
      acompte: 100,
      acompte1: "100 EUR",
      netimp: 1250.5,
      netimp1: "1250.50 EUR",
      lima: 0,
      retrorea: "Oui",
      retroap1: "Non",
      retroap2: "Non",
      kprretro: 0,
      kprretem: 0,
      retroemi: false,
      datdermo: "2024-04-15",
      modifpar: "admin",
      ole: "OLE001",
      txcomm: 12,
      comges: 5,
      polinter: true,
      polrefus: 0,
      modrev: "Standard",
      sansquit: false,
      duree: 12,
      modegest: "Automatique",
      echu: false,
      echeance: "Mensuelle",
      ddebpiec: "2024-01-01",
      dfinpiec: "2024-12-31",
      hono: 50,
      hono1: "50 EUR",
      frprel: 20,
      frprel1: "20 EUR",
      datereal: "2024-01-02",
      histo: "Aucun",
      typretrr: "Type1",
      typretr1: "TypeA",
      typretr2: "TypeB",
      ptini: 0,
      ptini1: "0 EUR",
      pnini: 0,
      pnini1: "0 EUR",
      comini: 10,
      comini1: "10 EUR",
      agelimit: 65,
      fiscal: "Non",
      numproj: 200,
      propproj: 1,
      archive: "Non",
      indic: 1,
      nonepur: false,
      mandat: 101,
      prevsusp: "Non",
      prevresi: "Non",
      fvahom: true,
      daterefindice: "2024-06-01",
      typesignature: "Electronique"
    },
    {
      contrat: 1002,
      numtiers: 502,
      frac: "Annuel",
      echpjj: "01",
      echpmm: "01",
      intitule: "Contrat Habitation Standard",
      affnouv: "2023-06-15",
      tacite: false,
      prelev: "Chèque",
      prelbank: 654321,
      jourp: "01",
      querab: 1,
      realis: 200,
      apport1: 50,
      apport2: 30,
      tauxrea: 4.5,
      tauxap1: 1.8,
      tauxap2: 1.2,
      gestionn: "Gestion Beta",
      portef: "Portefeuille B",
      remplace: "Oui",
      remppar: "1001",
      derpiece: 2,
      memo: "Renouvellement prévu",
      ext: "Extension B",
      primann: 850.75,
      primann1: "850.75 EUR",
      commann: 120,
      commann1: "120 EUR",
      totann: 970.75,
      totann1: "970.75 EUR",
      dateresi: "2023-12-31",
      debcours: "2023-06-15",
      fincours: "2024-06-14",
      debsuiv: "2024-06-15",
      finsuiv: "2025-06-14",
      debann: "2023-06-15",
      finann: "2024-06-14",
      nbsin: 1,
      impaye: 100,
      impaye1: "100 EUR",
      acompte: 50,
      acompte1: "50 EUR",
      netimp: 800.75,
      netimp1: "800.75 EUR",
      lima: 1,
      retrorea: "Non",
      retroap1: "Oui",
      retroap2: "Non",
      kprretro: 5,
      kprretem: 3,
      retroemi: true,
      datdermo: "2023-11-20",
      modifpar: "user1",
      ole: "OLE002",
      txcomm: 10,
      comges: 4,
      polinter: false,
      polrefus: 1,
      modrev: "Premium",
      sansquit: true,
      duree: 24,
      modegest: "Manuel",
      echu: true,
      echeance: "Annuel",
      ddebpiec: "2023-06-15",
      dfinpiec: "2024-06-14",
      hono: 40,
      hono1: "40 EUR",
      frprel: 15,
      frprel1: "15 EUR",
      datereal: "2023-06-16",
      histo: "Renouvelé",
      typretrr: "Type2",
      typretr1: "TypeB",
      typretr2: "TypeC",
      ptini: 5,
      ptini1: "5 EUR",
      pnini: 2,
      pnini1: "2 EUR",
      comini: 15,
      comini1: "15 EUR",
      agelimit: 70,
      fiscal: "Oui",
      numproj: 201,
      propproj: 2,
      archive: "Oui",
      indic: 0,
      nonepur: true,
      mandat: 102,
      prevsusp: "Oui",
      prevresi: "Non",
      fvahom: false,
      daterefindice: "2023-12-01",
      typesignature: "Papier"
    },
    {
      contrat: 1003,
      numtiers: 503,
      frac: "Trimestriel",
      echpjj: "10",
      echpmm: "03",
      intitule: "Contrat Santé Famille",
      affnouv: "2024-03-01",
      tacite: true,
      prelev: "Virement",
      prelbank: 789012,
      jourp: "10",
      querab: 0,
      realis: 150,
      apport1: 40,
      apport2: 25,
      tauxrea: 6,
      tauxap1: 2.5,
      tauxap2: 2,
      gestionn: "Gestion Gamma",
      portef: "Portefeuille C",
      remplace: "Non",
      remppar: "",
      derpiece: 3,
      memo: "Contrat santé famille",
      ext: "Extension C",
      primann: 1500,
      primann1: "1500 EUR",
      commann: 180,
      commann1: "180 EUR",
      totann: 1680,
      totann1: "1680 EUR",
      dateresi: "2025-02-28",
      debcours: "2024-03-01",
      fincours: "2025-02-28",
      debsuiv: "2025-03-01",
      finsuiv: "2026-02-28",
      debann: "2024-03-01",
      finann: "2025-02-28",
      nbsin: 3,
      impaye: 50,
      impaye1: "50 EUR",
      acompte: 200,
      acompte1: "200 EUR",
      netimp: 1300,
      netimp1: "1300 EUR",
      lima: 2,
      retrorea: "Oui",
      retroap1: "Oui",
      retroap2: "Oui",
      kprretro: 10,
      kprretem: 5,
      retroemi: false,
      datdermo: "2024-08-10",
      modifpar: "admin",
      ole: "OLE003",
      txcomm: 14,
      comges: 6,
      polinter: true,
      polrefus: 0,
      modrev: "Standard",
      sansquit: false,
      duree: 18,
      modegest: "Automatique",
      echu: false,
      echeance: "Trimestriel",
      ddebpiec: "2024-03-01",
      dfinpiec: "2025-02-28",
      hono: 60,
      hono1: "60 EUR",
      frprel: 25,
      frprel1: "25 EUR",
      datereal: "2024-03-02",
      histo: "Nouveau",
      typretrr: "Type3",
      typretr1: "TypeC",
      typretr2: "TypeD",
      ptini: 10,
      ptini1: "10 EUR",
      pnini: 5,
      pnini1: "5 EUR",
      comini: 20,
      comini1: "20 EUR",
      agelimit: 75,
      fiscal: "Non",
      numproj: 202,
      propproj: 3,
      archive: "Non",
      indic: 2,
      nonepur: false,
      mandat: 103,
      prevsusp: "Non",
      prevresi: "Oui",
      fvahom: true,
      daterefindice: "2024-09-01",
      typesignature: "Electronique"
    }
  ];
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
        this.router.createUrlTree(['/courtiers/contrats/details/'+contrat.id])
      ); window.open(url, '_blank');

    } else {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/courtiers/projets/details/'+contrat.id])
      ); window.open(url, '_blank');

    }
  }
}
