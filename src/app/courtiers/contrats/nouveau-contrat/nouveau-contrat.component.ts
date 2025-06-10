import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'nouveau-contrat',
  imports: [FormsModule,MatStepperModule,ReactiveFormsModule],
  templateUrl: './nouveau-contrat.component.html',
  styleUrl: './nouveau-contrat.component.css'
})
export class NouveauContratComponent {
contratForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
  }

  onSubmit(): void {
    if (this.contratForm.valid) {
      const contratData = this.contratForm.value;
      console.log('Contrat soumis :', contratData);
      // TODO : Envoyer contratData à l’API
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
