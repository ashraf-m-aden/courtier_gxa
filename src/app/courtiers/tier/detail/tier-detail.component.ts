import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TierFacade } from '../store/tier.Facade';
import { Tier } from '../../../Model/tier.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Dpp } from '../../../Model/dpp.model';
import { ConvColl, DpmModel, Statutju } from '../../../Model/dpm.model';
//import { constructor } from 'assert';
//import { classify } from '../store/__name@dasherize__.state';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TierProfilComponent } from '../../../components/tier/tier-profil/tier-profil.component';
import { DpmProfilComponent } from '../../../components/tier/dpm-profil/dpm-profil.component';
import { DppProfilComponent } from '../../../components/tier/dpp-profil/dpp-profil.component';
import { ProjetBaseComponent } from '../../../components/projets/base/base.component';
import { ListContratComponent } from '../../contrats/list/list.component';
@Component({
  selector: 'app-tier-detail',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatCardModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule,
    MatInputModule, MatCheckboxModule,ProjetBaseComponent,ListContratComponent,
    MatButtonModule, MatIconModule, TierProfilComponent, DpmProfilComponent, DppProfilComponent
  ],
  styleUrls: ['./tier-detail.component.scss'],
  templateUrl: './tier-detail.component.html'
})
export class TierDetailComponent {
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

  exempleTier: Tier = {
    numtiers: 12345,
    typtiers: "Client",
    nattiers: "Particulier",
    numdpp: 67890,
    titre: "M.",
    rsociale: "Société Exemple SARL",
    referenc: "REF-2025-001",
    connexe: "C123",
    refext: "EXT-456",
    adr1: "10 rue de la Paix",
    adr2: "Bâtiment B",
    adr3: "2ème étage",
    codp: "75002",
    ville: "Paris",
    codepays: "FR",
    pays: "France",
    ntel: "+33 1 23 45 67 89",
    nfax: "+33 1 23 45 67 80",
    numemail: "contact@example.com",
    memo: "Client important, préférer contact par email.",
    ext: "EXT01",
    images: "logo_exemple.png",
    titnom: "Exemple",
    gommette: "rouge",
    ole: "OLE123",
    titrecou: "M.",
    datdermo: "2025-06-01T10:30:00Z",
    modifpar: "admin",
    nbpercha: 3,
    const: "CONST456",
    histo: "Historique des commandes disponibles.",
    adrinsee: true,
    adresse1: "10 rue de la Paix",
    adresse2: "Bâtiment B",
    adresse3: "2ème étage",
    grcok: false,
    nonepur: false,
    territory: "Île-de-France",
    latitude: 48.8686,
    longitude: 2.3444
  };


  constructor(private route: ActivatedRoute, private facade: TierFacade, private fb: FormBuilder) {
    this.id! = this.route.snapshot.paramMap.get('id') ?? "";
  }

  ngOnInit() {
    // const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    // if (id) this.facade.getById(id);
    // this.selected.set(this.facade.selected());
    this.initForm();
    this.tierForm.patchValue(this.exempleTier); // ou dpmTierData
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
