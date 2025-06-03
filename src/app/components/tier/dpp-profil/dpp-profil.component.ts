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
  selector: 'app-dpp-profil',
  imports: [  CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatCardModule, MatTabsModule,MatDatepickerModule,    MatNativeDateModule,
    MatInputModule, MatCheckboxModule,
    MatButtonModule, MatIconModule],
  templateUrl: './dpp-profil.component.html',
  styleUrl: './dpp-profil.component.css'
})
export class DppProfilComponent {


 public id: string
  selected = signal<Tier | null>(null);
  selectedDPP = signal<Dpp | null>(null);
  selectedDPM = signal<DpmModel | null>(null);
  editMode = false;
  dppForm!: FormGroup;

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
dppData: Dpp = {
  numdpp: 1001,
  numtiers: 2001,
  titre: "Monsieur",
  nom: "Ali",
  prenom: "Omar",
  nompre: "Ali Omar",
  nomfille: "",
  alias: "Omar Djib",
  sexe: "M",
  datenais: new Date("1985-05-15"),
  age: 40,
  agemsme: 1985,
  national: "DJ", // code ISO3166 pour Djibouti
  numss: "1234567890123",
  sitfam: "Marié",
  activite: "Employé",
  catprof: "Cadre",
  csp: "3",
  profess: "Ingénieur électricien",
  employe: "EDD",
  filiale: "Direction Réseaux",
  dateent: new Date("2012-09-01"),
  salaire: 25000,
  salaire1: "DJF",
  datesal: 2025,
  telprof: "+25321345678",
  postetel: "101",
  faxpro: "+25321340000",
  portable: "+25377234567",
  npermis: "DJ987654",
  lieuperm: "Djibouti",
  condacc: false,
  dateca: undefined,
  datemoto: new Date("2006-07-10"),
  datevl: new Date("2005-04-20"),
  datepl: undefined,
  datetc: undefined,
  images: "https://example.com/photo.jpg",
  ssregion: "01",
  sscaisse: "CAISSE-DJ",
  sscentre: "CENTRE-VILLE",
  enfass: false,
  saltra: 8000,
  saltra1: "DJF",
  saltrb: 10000,
  saltrb1: "DJF",
  saltrc: 7000,
  saltrc1: "DJF",
  numemail: "omar.ali@example.com",
  datea1: new Date("2003-08-01"),
  datebsr: new Date("2002-06-01"),
  orgaffil: "CNSS",
  datea2: new Date("2004-04-04"),
  dateb1: new Date("2001-01-15"),
  regimesocial: "Régime Général",
  regimelocal: "Régime Local Djibouti",
  emailprof: "omar.ali@edd.dj",
  lieunaissance: "Djibouti",
  datepermisbateau: new Date("2018-12-01"),
  typepermisbateau: "Côtier",
  datevalvl: new Date("2035-04-20"),
};



  constructor(private route: ActivatedRoute, private facade: TierFacade, private fb: FormBuilder) {
    this.id! = this.route.snapshot.paramMap.get('id') ?? "";
  }

  ngOnInit() {
    // const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    // if (id) this.facade.getById(id);
    // this.selected.set(this.facade.selected());
    this.initForm();
    this.dppForm.patchValue(this.dppData); // ou dpmTierData
  }

  initForm() {

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

    this.updateFormState()
  }

  updateFormState() {
    if (this.editMode) {
      this.dppForm.enable();
      this.dppForm.get('id')?.disable(); // keep ID disabled always if needed
    } else {
      this.dppForm.disable();
    }
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
    this.updateFormState()
  }

  isDPP(): boolean {
    return this.dppForm.get('typtiers')?.value === 'ddp';
  }

  isDPM(): boolean {
    return this.dppForm.get('typtiers')?.value === 'dpm';
  }

  save() {
    if (this.dppForm.valid) {
      console.log('Données enregistrées :', this.dppForm.value);
      this.editMode = false;
    }
  }

    onSubmit() {
    if (this.dppForm.valid) {
      console.log('Form Value:', this.dppForm.value);
    } else {
      console.log('Form invalid');
    }
  }
}

