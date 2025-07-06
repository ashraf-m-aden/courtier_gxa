import { Component, Input, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { InfoGeneralContratComponent } from '../../../components/contrat/nouveau/info-general-contrat/info-general-contrat.component';
import { AdminContratComponent } from '../../../components/contrat/nouveau/admin-contrat/admin-contrat.component';
import { AdminPieceContratComponent } from '../../../components/contrat/nouveau/admin-piece-contrat/admin-piece-contrat.component';
import { RisqueContratComponent } from '../../../components/contrat/nouveau/risque-contrat/risque-contrat.component';
import { ProduitsContratComponent } from '../../../components/contrat/nouveau/produits-contrat/produits-contrat.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nouveau-contrat',
  imports: [FormsModule, MatStepperModule, ReactiveFormsModule, InfoGeneralContratComponent, AdminContratComponent, AdminPieceContratComponent, RisqueContratComponent, ProduitsContratComponent],
  templateUrl: './nouveau-contrat.component.html',
  styleUrl: './nouveau-contrat.component.css'
})
export class NouveauContratComponent {
  contratForm!: FormGroup;
  isContrat = signal<boolean>(true);
  isEdit = signal<boolean>(true);

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {

    this.isContrat.set(this.route.snapshot.data['isContrat'])
    this.isEdit.set(this.route.snapshot.data['isEdit'])

  }

  ngOnInit(): void {
    this.contratForm = this.fb.group({
      contrat: [null, Validators.required],
      numtiers: [null],
      frac: [''],
      echpjj: [''],
      echpmm: [''],
      intitule: [''],
      affnouv: [''],
      tacite: [false],
      prelev: [''],
      prelbank: [null],
      jourp: [''],
      querab: [null],
      realis: [null],
      apport1: [null],
      apport2: [null],
      tauxrea: [null],
      tauxap1: [null],
      tauxap2: [null],
      gestionn: [''],
      portef: [''],
      remplace: [''],
      remppar: [''],
      derpiece: [null],
      memo: [''],
      ext: [''],
      primann: [null],
      primann1: [''],
      commann: [null],
      commann1: [''],
      totann: [null],
      totann1: [''],
      dateresi: [''],
      debcours: [''],
      fincours: [''],
      debsuiv: [''],
      finsuiv: [''],
      debann: [''],
      finann: [''],
      nbsin: [null],
      impaye: [null],
      impaye1: [''],
      acompte: [null],
      acompte1: [''],
      netimp: [null],
      netimp1: [''],
      lima: [null],
      retrorea: [''],
      retroap1: [''],
      retroap2: [''],
      kprretro: [null],
      kprretem: [null],
      retroemi: [false],
      datdermo: [''],
      modifpar: [''],
      ole: [''],
      txcomm: [null],
      comges: [null],
      polinter: [false],
      polrefus: [null],
      modrev: [''],
      sansquit: [false],
      duree: [null],
      modegest: [''],
      echu: [false],
      echeance: [''],
      ddebpiec: [''],
      dfinpiec: [''],
      hono: [null],
      hono1: [''],
      frprel: [null],
      frprel1: [''],
      datereal: [''],
      histo: [''],
      typretrr: [''],
      typretr1: [''],
      typretr2: [''],
      ptini: [null],
      ptini1: [''],
      pnini: [null],
      pnini1: [''],
      comini: [null],
      comini1: [''],
      agelimit: [null],
      fiscal: [''],
      numproj: [null],
      propproj: [null],
      archive: [''],
      indic: [null],
      nonepur: [false],
      mandat: [null],
      prevsusp: [''],
      prevresi: [''],
      fvahom: [false],
      daterefindice: [''],
      typesignature: ['']
    });

    if (this.isEdit()) {
      this.contratForm.setValue({
        contrat: 'C12345',
        numtiers: 'T67890',
        frac: 'Mensuel',
        echpjj: '15',
        echpmm: '06',
        intitule: 'Contrat auto',
        affnouv: 'Nouvelle affaire',
        tacite: true,
        prelev: 'Oui',
        prelbank: 'BANQUE123',
        jourp: '5',
        querab: 'Aucun',
        realis: '2024-01-15',
        apport1: 5000,
        apport2: 2500,
        tauxrea: 12.5,
        tauxap1: 6.25,
        tauxap2: 3.12,
        gestionn: 'Dupont',
        portef: 'Portefeuille A',
        remplace: 'Ancien contrat',
        remppar: 'Contrat B',
        derpiece: '2024-06-30',
        memo: 'Notes internes',
        ext: 'Extension A',
        primann: 1200,
        primann1: '1 200 EUR',
        commann: 150,
        commann1: '150 EUR',
        totann: 1350,
        totann1: '1 350 EUR',
        dateresi: '2025-01-01',
        debcours: '2024-01-01',
        fincours: '2024-12-31',
        debsuiv: '2025-01-01',
        finsuiv: '2025-12-31',
        debann: '2024-01-01',
        finann: '2024-12-31',
        nbsin: 2,
        impaye: 300,
        impaye1: '300 EUR',
        acompte: 500,
        acompte1: '500 EUR',
        netimp: 200,
        netimp1: '200 EUR',
        lima: 1000,
        retrorea: 'Retro Réa',
        retroap1: 'Retro Ap1',
        retroap2: 'Retro Ap2',
        kprretro: 50,
        kprretem: 25,
        retroemi: true,
        datdermo: '2024-06-01',
        modifpar: 'Admin',
        ole: 'OLE123',
        txcomm: 7.5,
        comges: 2.5,
        polinter: false,
        polrefus: 'Pas de refus',
        modrev: 'Révision annuelle',
        sansquit: false,
        duree: 3,
        modegest: 'Gestion directe',
        echu: true,
        echeance: '2024-06-15',
        ddebpiec: '2024-01-01',
        dfinpiec: '2024-12-31',
        hono: 500,
        hono1: '500 EUR',
        frprel: 100,
        frprel1: '100 EUR',
        datereal: '2024-01-01',
        histo: 'Historique des modifications',
        typretrr: 'Type R',
        typretr1: 'Type 1',
        typretr2: 'Type 2',
        ptini: 1000,
        ptini1: '1 000 EUR',
        pnini: 800,
        pnini1: '800 EUR',
        comini: 150,
        comini1: '150 EUR',
        agelimit: 65,
        fiscal: 'Fiscalité A',
        numproj: 123,
        propproj: 456,
        archive: 'Non',
        indic: 10,
        nonepur: true,
        mandat: 'Mandat spécial',
        prevsusp: '2024-09-01',
        prevresi: '2024-12-01',
        fvahom: false,
        daterefindice: '2024-06-30',
        typesignature: 'Électronique'
      });
    }

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
