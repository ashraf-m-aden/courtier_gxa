import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { TierFacade } from '../../../courtiers/tier/store/tier.Facade';
import { DpmModel, Statutju, ConvColl } from '../../../Model/dpm.model';
import { Dpp } from '../../../Model/dpp.model';
import { Tier } from '../../../Model/tier.model';

@Component({
  selector: 'app-tier-profil',
  imports: [    CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatCardModule, MatTabsModule,MatDatepickerModule,    MatNativeDateModule,
    MatInputModule, MatCheckboxModule,
    MatButtonModule, MatIconModule],
  templateUrl: './tier-profil.component.html',
  styleUrl: './tier-profil.component.css'
})
export class TierProfilComponent {

 public id: string
  selected = signal<Tier | null>(null);
  selectedDPP = signal<Dpp | null>(null);
  selectedDPM = signal<DpmModel | null>(null);
  editMode = false;
  tierForm!: FormGroup;
  dppForm!: FormGroup;

  titres = ['M.', 'Mme', 'Mlle']; // example titles
  sexes = ['M', 'F'];
  nationals = ['FR', 'US', 'GB']; // example ISO country codes
  sitfams = ['Célibataire', 'Marié', 'Divorcé', 'Veuf']; // example
  activites = ['Employé', 'Indépendant', 'Sans emploi']; // example
  catprofs = ['Cadre', 'Ouvrier', 'Employé']; // example
  csps = ['Profession libérale', 'Agriculteur', 'Commerçant']; // example

  dpmForm!: FormGroup;

  statutjuOptions = Object.values(Statutju);
  convCollOptions = Object.values(ConvColl);
  currencyCodes = ['EUR', 'USD', 'GBP', 'XAF']; // Add your currency codes
  ddpTierData = {
    id: 'TIER001',
    typtiers: 'ddp',
    nom: 'Ali',
    prenom: 'Mohamed',
    nomentreprise: null,
    regcom: null,
    adresse: 'Quartier 7, Djibouti',
    ville: 'Djibouti',
    pays: 'Djibouti',
    telephone: '77889900',
    email: 'ali.mohamed@example.com',
    siteweb: null,
    lat: 11.5721,
    long: 43.1456,
    modifpar: 'admin',
    datdermo: '2025-05-30T14:00:00Z',
    nbpercha: 3,
    nbcont: 2,
    typeclient: 'normal',
    clientbloque: false,
    clientparticulier: true,
    clientprofessionnel: false
  };
  dpmTierData = {
    id: 'TIER002',
    typtiers: 'dpm',
    nom: null,
    prenom: null,
    nomentreprise: 'Entreprise Horizon SARL',
    regcom: 'RC123456',
    adresse: 'Zone industrielle Sud',
    ville: 'Djibouti',
    pays: 'Djibouti',
    telephone: '77223344',
    email: 'contact@horizon.dj',
    siteweb: 'https://www.horizon.dj',
    lat: 11.5854,
    long: 43.1599,
    modifpar: 'user42',
    datdermo: '2025-06-01T10:30:00Z',
    nbpercha: 10,
    nbcont: 5,
    typeclient: 'premium',
    clientbloque: false,
    clientparticulier: false,
    clientprofessionnel: true
  };


  constructor(private route: ActivatedRoute, private facade: TierFacade, private fb: FormBuilder) {
    this.id! = this.route.snapshot.paramMap.get('id') ?? "";
  }

  ngOnInit() {
    // const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    // if (id) this.facade.getById(id);
    // this.selected.set(this.facade.selected());
    this.initForm();
    this.tierForm.patchValue(this.ddpTierData); // ou dpmTierData
  }

  initForm() {
    this.tierForm = this.fb.group({
      typtiers: ['ddp', Validators.required],
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
      // ... les autres champs ...
      nom: [''],              // pour DDP
      prenom: [''],           // pour DDP
      nomentreprise: [''],    // pour DPM
      regcom: [''],           // pour DPM
    });
    this.dppForm = this.fb.group({
      numdpp: [null, [Validators.required]],
      numtiers: [null],
      titre: [''],
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
      activite: [''],
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
      images: [''],
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
      numemail: [''],
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
    this.dpmForm = this.fb.group({
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
    });
    this.updateFormState()
  }

  updateFormState() {
    if (this.editMode) {
      this.tierForm.enable();
      this.tierForm.get('id')?.disable(); // keep ID disabled always if needed
    } else {
      this.tierForm.disable();
    }
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
    this.updateFormState()
  }

  isDPP(): boolean {
    return this.tierForm.get('typtiers')?.value === 'ddp';
  }

  isDPM(): boolean {
    return this.tierForm.get('typtiers')?.value === 'dpm';
  }

  save() {
    if (this.tierForm.valid) {
      console.log('Données enregistrées :', this.tierForm.value);
      this.editMode = false;
    }
  }
    onSubmitDPM() {
    if (this.dpmForm.valid) {
      console.log('Form Value:', this.dpmForm.value);
    } else {
      console.log('Form invalid');
    }
  }
    onSubmitDPP() {
    if (this.dpmForm.valid) {
      console.log('Form Value:', this.dpmForm.value);
    } else {
      console.log('Form invalid');
    }
  }
}

