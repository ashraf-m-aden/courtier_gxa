import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { AdminContratComponent } from '../../../components/contrat/nouveau/admin-contrat/admin-contrat.component';
import { AdminPieceContratComponent } from '../../../components/contrat/nouveau/admin-piece-contrat/admin-piece-contrat.component';
import { InfoGeneralContratComponent } from '../../../components/contrat/nouveau/info-general-contrat/info-general-contrat.component';
import { ProduitsContratComponent } from '../../../components/contrat/nouveau/produits-contrat/produits-contrat.component';
import { RisqueContratComponent } from '../../../components/contrat/nouveau/risque-contrat/risque-contrat.component';


@Component({
  selector: 'details',
  imports: [FormsModule, MatStepperModule, ReactiveFormsModule, InfoGeneralContratComponent, AdminContratComponent, AdminPieceContratComponent, RisqueContratComponent, ProduitsContratComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsProjetsComponent {
  contratForm!: FormGroup;
  isContrat = signal<boolean>(false);
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    console.log(this.route.snapshot.data['isContrat']);

    this.isContrat.set(this.route.snapshot.data['isContrat'])

  }

  ngOnInit(): void {

 this.contratForm.patchValue({
  contrat: 'C-2025001',
  numtiers: 'T-987654',
  frac: 'Annuel',
  echpjj: '30',
  echpmm: '06',
  intitule: 'Assurance Multirisque Habitation',
  affnouv: 'OUI',
  tacite: true,
  prelev: 'Mensuel',
  prelbank: 'BNP Paribas',
  jourp: '15',
  querab: 'Q-2025',
  realis: 'Réalisation A',
  apport1: 5000,
  apport2: 3000,
  tauxrea: 12.5,
  tauxap1: 5.0,
  tauxap2: 3.0,
  gestionn: 'GEST-001',
  portef: 'PF-2025',
  remplace: 'Ancien Contrat C-2024001',
  remppar: 'Contrat C-2025002',
  derpiece: 'Facture #4567',
  memo: 'Renouvellement automatique prévu.',
  ext: 'EXT123',
  primann: 1200,
  primann1: '1,200 EUR',
  commann: 150,
  commann1: '150 EUR',
  totann: 1350,
  totann1: '1,350 EUR',
  dateresi: '2025-12-31',
  debcours: '2025-01-01',
  fincours: '2025-12-31',
  debsuiv: '2026-01-01',
  finsuiv: '2026-12-31',
  debann: '2025-01-01',
  finann: '2025-12-31',
  nbsin: 2,
  impaye: 100,
  impaye1: '100 EUR',
  acompte: 300,
  acompte1: '300 EUR',
  netimp: 50,
  netimp1: '50 EUR',
  lima: 0,
  retrorea: 'OUI',
  retroap1: 'NON',
  retroap2: 'NON',
  kprretro: 5,
  kprretem: 2,
  retroemi: true,
  datdermo: '2025-06-01',
  modifpar: 'admin',
  ole: 'OLE-001',
  txcomm: 12,
  comges: 5,
  polinter: false,
  polrefus: 'Aucun',
  modrev: 'Automatique',
  sansquit: true,
  duree: 12,
  modegest: 'Gestion directe',
  echu: false,
  echeance: '2025-12-31',
  ddebpiec: '2025-01-01',
  dfinpiec: '2025-12-31',
  hono: 200,
  hono1: '200 EUR',
  frprel: 25,
  frprel1: '25 EUR',
  datereal: '2025-01-15',
  histo: 'Historique mis à jour le 01/06/2025',
  typretrr: 'Type A',
  typretr1: 'Type B',
  typretr2: 'Type C',
  ptini: 10,
  ptini1: '10 points',
  pnini: 5,
  pnini1: '5 points',
  comini: 50,
  comini1: '50 EUR',
  agelimit: 65,
  fiscal: 'Régime Général',
  numproj: 'P-123456',
  propproj: 'Projet Habitation 2025',
  archive: 'Non',
  indic: 1,
  nonepur: false,
  mandat: 'Mandat-789',
  prevsusp: 'Suspension prévue en cas de non-paiement',
  prevresi: 'Résiliation prévue à échéance',
  fvahom: true,
  daterefindice: '2025-12-31',
  typesignature: 'Électronique'
});

  }

  onSubmit(): void {
    if (this.contratForm.valid) {
      const contratData = this.contratForm.value;
      if (this.isContrat()) {
        console.log('Contrat soumis :', contratData);

      } else {
        console.log('Projet soumis :', contratData);

      }

      // TODO : Envoyer contratData à l’API
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
