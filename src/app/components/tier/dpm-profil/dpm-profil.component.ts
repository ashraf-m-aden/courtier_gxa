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
  selector: 'app-dpm-profil',
  imports: [   CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatCardModule, MatTabsModule,MatDatepickerModule,    MatNativeDateModule,
    MatInputModule, MatCheckboxModule,
    MatButtonModule, MatIconModule],
  templateUrl: './dpm-profil.component.html',
  styleUrl: './dpm-profil.component.css'
})
export class DpmProfilComponent {


 public id: string
  selected = signal<Tier | null>(null);
  selectedDPM = signal<DpmModel | null>(null);
  editMode = false;
  dpmForm!: FormGroup;
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
dpmData: DpmModel = {
  numtiers: 3001,
  statutju: Statutju.SARL,
  capital: 1500000,
  capital1: "DJF",
  nsiret: "12345678900012",
  nrc: "RC-DJ-98765",
  nrm: "RM-12345",
  codeape: "6201Z", // ex : développement logiciel
  lieuimm: "Djibouti",
  tvaintra: "DJ123456789",
  datecre: "2010-06-15",
  nbetabli: 3,
  nbsalar: 120,
  nbcadre: 25,
  noncadre: 95,
  groupe: 0,
  partic: 100,
  annee1: "2022",
  annee2: "2023",
  annee3: "2024",
  salair1: 18000000,
  salair11: "DJF",
  salair2: 19000000,
  salair21: "DJF",
  salair3: 20000000,
  salair31: "DJF",
  caht1: 50000000,
  caht11: "DJF",
  caht2: 55000000,
  caht21: "DJF",
  caht3: 60000000,
  caht31: "DJF",
  marge1: 15000000,
  marge11: "DJF",
  marge2: 16000000,
  marge21: "DJF",
  marge3: 17000000,
  marge31: "DJF",
  entite: undefined,
  emetteur: undefined,
  compteba: undefined,
  interl: 101,
  activite: "Développement logiciel",
  convcol: ConvColl.CCN_COMMERCE,
  url: "https://www.exemple-sarl.dj",
  expert: 201,
  debexe: "01/01",
  finexe: "31/12",
  numeroconvcol: "123-456",
  numerobrochure: ConvColl.CCN_COMMERCE,
  oriasregistrationid: "ORIAS-000123",
  rbelastupdate: "2024-05-01",
};


  constructor(private route: ActivatedRoute, private facade: TierFacade, private fb: FormBuilder) {
    this.id! = this.route.snapshot.paramMap.get('id') ?? "";
  }

  ngOnInit() {
    // const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    // if (id) this.facade.getById(id);
    // this.selected.set(this.facade.selected());
    this.initForm();
    this.dpmForm.patchValue(this.dpmData); // ou dpmTierData
  }

  initForm() {

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
      this.dpmForm.enable();
      this.dpmForm.get('id')?.disable(); // keep ID disabled always if needed
    } else {
      this.dpmForm.disable();
    }
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
    this.updateFormState()
  }

  isDPP(): boolean {
    return this.dpmForm.get('typtiers')?.value === 'ddp';
  }

  isDPM(): boolean {
    return this.dpmForm.get('typtiers')?.value === 'dpm';
  }

  save() {
    if (this.dpmForm.valid) {
      console.log('Données enregistrées :', this.dpmForm.value);
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

