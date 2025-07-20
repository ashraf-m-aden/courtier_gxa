import { Component, Input, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { InfoGeneralContratComponent } from '../../../components/contrat/nouveau/info-general-contrat/info-general-contrat.component';
import { AdminContratComponent } from '../../../components/contrat/nouveau/admin-contrat/admin-contrat.component';
import { AdminPieceContratComponent } from '../../../components/contrat/nouveau/admin-piece-contrat/admin-piece-contrat.component';
import { RisqueContratComponent } from '../../../components/contrat/nouveau/risque-contrat/risque-contrat.component';
import { ProduitsContratComponent } from '../../../components/contrat/nouveau/produits-contrat/produits-contrat.component';
import { ActivatedRoute } from '@angular/router';
import { Contrat } from '../../../Model/contrat.model';
import { CourtierService } from '../../../Services/courtier/courtier.service';

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
  contratDetails: Contrat | null = null;
  idContrat = 0
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courtierService: CourtierService) {

    this.isContrat.set(this.route.snapshot.data['isContrat'])
    this.isEdit.set(this.route.snapshot.data['isEdit'])
    console.log(this.isEdit());
    this.idContrat = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id']) : 0;

  }


  async ngOnInit() {
       this.contratForm = this.fb.group({
      contrat: [null],
      Numtiers: [null],
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

    if (this.idContrat != 0 && this.isEdit()) {
      await this.courtierService.postDetailContrat(this.idContrat).subscribe({
        next: (data: any) => {
          this.contratDetails = data;
          this.contratForm.patchValue(this.contratDetails!);
          console.log('Contrat details:', this.contratDetails);

        },
        error: (error) => {
          console.error('Error fetching contract details:', error);
        },
        complete: () => {
          console.log('Contract details fetched successfully');
        }
      })
    }






  }

  onSubmit(): void {
    if (this.contratForm.valid) {
      const contratData = this.contratForm.value;
      if (this.isContrat()) {
        console.log('Contrat soumis :', contratData);
        alert("Contrat enregistré avec succés")

      } else {
        console.log('Projet soumis :', contratData);
        alert("Projet enregistré avec succés")

      }

      // TODO : Envoyer contratData à l’API
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
