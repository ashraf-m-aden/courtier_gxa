import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { tierActions } from '../store/tier.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Statutju, ConvColl } from '../../../Model/dpm.model';

@Component({
  selector: 'tier-nouveau',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCardModule, MatInputModule,
    MatSelectModule, MatIcon, MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,],
  templateUrl: './tier-nouveau.component.html',
  styleUrl: './tier-nouveau.component.scss'
})
export class TierNouveauComponent {

  tierForm: FormGroup;
  titres = ['M.', 'Mme', 'Mlle']; // example titles
  sexes = ['M', 'F'];
  nationals = ['FR', 'US', 'GB']; // example ISO country codes
  sitfams = ['Célibataire', 'Marié', 'Divorcé', 'Veuf']; // example
  activites = ['Employé', 'Indépendant', 'Sans emploi']; // example
  catprofs = ['Cadre', 'Ouvrier', 'Employé']; // example
  csps = ['Profession libérale', 'Agriculteur', 'Commerçant']; // example


  statutjuOptions = Object.values(Statutju);
  convCollOptions = Object.values(ConvColl);
  currencyCodes = ['EUR', 'USD', 'GBP', 'XAF']; // Add your currency codes
  constructor(private fb: FormBuilder) {
    this.tierForm = this.fb.group({
      typtiers: [null, Validators.required],
      nattiers: [''],
      numdpp: [null],
      titre: [''],
      rsociale: [''],
      referenc: [''],
      connexe: [''],
      refext: [''],
      adr1: [''],
      adr2: [''],
      adr3: [''],
      codp: [''],
      ville: [''],
      codepays: [''],
      pays: [''],
      ntel: [''],
      nfax: [''],
      numemail: [''],
      memo: [''],
      ext: [''],
      images: [''],
      titnom: [''],
      gommette: [''],
      ole: [''],
      titrecou: [''],
      datdermo: [''],
      modifpar: [''],
      nbpercha: [null],
      const: [''],
      histo: [''],
      adrinsee: [false],
      adresse1: [''],
      adresse2: [''],
      adresse3: [''],
      grcok: [false],
      nonepur: [false],
      territory: [''],
      latitude: [null],
      longitude: [null],
      numtiers: [null],
      statutju: [''],
      capital: [null],
      capital1: [''],
      nsiret: [''],
      nrc: [''],
      nrm: [''],
      codeape: [''],
      lieuimm: [''],
      tvaintra: [''],
      datecre: [''],
      nbetabli: [null],
      nbsalar: [null],
      nbcadre: [null],
      noncadre: [null],
      groupe: [null],
      partic: [null],
      annee1: [''],
      annee2: [''],
      annee3: [''],
      salair1: [null],
      salair11: [''],
      salair2: [null],
      salair21: [''],
      salair3: [null],
      salair31: [''],
      caht1: [null],
      caht11: [''],
      caht2: [null],
      caht21: [''],
      caht3: [null],
      caht31: [''],
      marge1: [null],
      marge11: [''],
      marge2: [null],
      marge21: [''],
      marge3: [null],
      marge31: [''],
      entite: [''],
      emetteur: [''],
      compteba: [''],
      interl: [null],
      activite: [''],
      convcol: [''],
      url: [''],
      expert: [null],
      debexe: [''],
      finexe: [''],
      numeroconvcol: [''],
      numerobrochure: [''],
      oriasregistrationid: [''],
      rbelastupdate: [''],
      nom: [''],
      prenom: [''],
      nompre: [''],
      nomfille: [''],
      alias: [''],
      sexe: [''],
      datenais: [''],
      age: [null],
      agemsme: [null],
      national: [''],
      numss: [''],
      sitfam: [''],
      catprof: [''],
      csp: [''],
      profess: [''],
      employe: [''],
      filiale: [''],
      dateent: [''],
      salaire: [null],
      salaire1: [''],
      datesal: [null],
      telprof: [''],
      postetel: [''],
      faxpro: [''],
      portable: [''],
      npermis: [''],
      lieuperm: [''],
      condacc: [false],
      dateca: [''],
      datemoto: [''],
      datevl: [''],
      datepl: [''],
      datetc: [''],
      ssregion: [''],
      sscaisse: [''],
      sscentre: [''],
      enfass: [false],
      saltra: [null],
      saltra1: [''],
      saltrb: [null],
      saltrb1: [''],
      saltrc: [null],
      saltrc1: [''],
      datea1: [''],
      datebsr: [''],
      orgaffil: [''],
      datea2: [''],
      dateb1: [''],
      regimesocial: [''],
      regimelocal: [''],
      emailprof: [''],
      lieunaissance: [''],
      datepermisbateau: [''],
      typepermisbateau: [''],
      datevalvl: [''],
    });

  }


  onSubmit() {
    console.log(this.tierForm.value);
  }
}
