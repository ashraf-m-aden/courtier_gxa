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
  selector: 'app-tier-profil',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatCardModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule,
    MatInputModule, MatCheckboxModule,
    MatButtonModule, MatIconModule],
  templateUrl: './tier-profil.component.html',
  styleUrl: './tier-profil.component.scss'
})
export class TierProfilComponent {

  public id: string
  @Input() retrieveData: any[] | null = null;
  selectedDPP = signal<Dpp | null>(null);
  selectedDPM = signal<DpmModel | null>(null);
  @Input() tier = signal<Tier | null>(null);
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


  constructor(private route: ActivatedRoute, private facade: TierFacade, private fb: FormBuilder) {
    this.id! = this.route.snapshot.paramMap.get('id') ?? "";

    effect(() => {
      if (this.tier()) {
        this.tierForm.patchValue(this.tier()!); // ou dpmTierData

      }
    })
  }


  ngOnInit() {
    // const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    // if (id) this.facade.getById(id);
    // this.selected.set(this.facade.selected());
    this.initForm();
  }

  initForm() {
    this.tierForm = this.fb.group({
      Typtiers: [1, Validators.required],
      Nattiers: [''],
      Numdpp: [null],
      Titre: [''],
      Rsociale: [''],
      Referenc: [''],
      Connexe: [''],
      Refext: [''],
      Adr1: [''],
      Adr2: [''],
      Adr3: [''],
      Codp: [''],
      Ville: [''],
      CodePays: [''],
      Pays: [''],
      Ntel: [''],
      Nfax: [''],
      Numemail: [''],
      Memo: [''],
      Ext: [''],
      Images: [''],
      Titnom: [''],
      Gommette: [''],
      Ole: [''],
      Titrecou: [''],
      Datdermo: [''],
      Modifpar: [''],
      Nbpercha: [null],
      Const: [''],
      Histo: [''],
      Adrinsee: [false],
      Adresse1: [''],
      Adresse2: [''],
      Adresse3: [''],
      Grcok: [false],
      Nonepur: [false],
      Territory: [''],
      Latitude: [null],
      Longitude: [null],
      // DDP specific
      Nom: [''],
      Prenom: [''],
      // DPM specific
      NomEntreprise: [''],
      RegCom: [''],
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

