import { CommonModule } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatCardModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule,
    MatInputModule, MatCheckboxModule,
    MatButtonModule, MatIconModule],
  templateUrl: './dpm-profil.component.html',
  styleUrl: './dpm-profil.component.css'
})
export class DpmProfilComponent {


  public id: string
  selected = signal<Tier | null>(null);
  @Input() selectedDPM = signal<DpmModel | null>(null);
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


  constructor(private route: ActivatedRoute, private facade: TierFacade, private fb: FormBuilder) {
    this.id! = this.route.snapshot.paramMap.get('id') ?? "";
    effect(() => {
      if (this.selectedDPM()) {
        this.dpmForm.patchValue(this.selectedDPM()!); // ou dpmTierData
      }
    });
  }

  ngOnInit() {
    // const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    // if (id) this.facade.getById(id);
    // this.selected.set(this.facade.selected());
    this.initForm();
  }

  initForm() {

  this.dpmForm = this.fb.group({
  Numtiers: [null],
  Statutju: [null],
  Capital: [null],
  Capital1: [null],
  Nsiret: [null],
  Nrc: [null],
  Nrm: [null],
  Codeape: [null],
  Lieuimm: [null],
  Tvaintra: [null],
  Datecre: [null],
  Nbetabli: [null],
  Nbsalar: [null],
  Nbcadre: [null],
  Noncadre: [null],
  Groupe: [null],
  Partic: [null],
  Annee1: [null],
  Annee2: [null],
  Annee3: [null],
  Salair1: [null],
  Salair11: [null],
  Salair2: [null],
  Salair21: [null],
  Salair3: [null],
  Salair31: [null],
  Caht1: [null],
  Caht11: [null],
  Caht2: [null],
  Caht21: [null],
  Caht3: [null],
  Caht31: [null],
  Marge1: [null],
  Marge11: [null],
  Marge2: [null],
  Marge21: [null],
  Marge3: [null],
  Marge31: [null],
  Entite: [null],
  Emetteur: [null],
  Compteba: [null],
  Interl: [null],
  Activite: [null],
  Convcol: [null],
  Url: [null],
  Expert: [null],
  Debexe: [null],
  Finexe: [null],
  Numeroconvcol: [null],
  Numerobrochure: [null],
  Oriasregistrationid: [null],
  Rbelastupdate: [null],
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

