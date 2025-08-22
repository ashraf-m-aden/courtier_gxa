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
import { ListContratComponent } from '../../contrats/list/list.component';
import { CourtierService } from '../../../Services/courtier/courtier.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tier-detail',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatCardModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule,
    MatInputModule, MatCheckboxModule, ListContratComponent,
    MatButtonModule, MatIconModule, TierProfilComponent, DpmProfilComponent, DppProfilComponent
  ],
  styleUrls: ['./tier-detail.component.scss'],
  templateUrl: './tier-detail.component.html'
})
export class TierDetailComponent {
  public id: number
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
  isLoading = signal<boolean>(true);
  statutjuOptions = Object.values(Statutju);
  convCollOptions = Object.values(ConvColl);
  currencyCodes = ['EUR', 'USD', 'GBP', 'XAF']; // Add your currency codes


  retrievedTier :any[] = [];
  tierObject=signal<Tier | null>(null);
  dpmObject = signal<DpmModel | null>(null);
  dpplist = signal<Dpp[]>([]);
  contrats :any[] = [];
  projets:any[] = [];
  constructor(private route: ActivatedRoute, private facade: TierFacade, private fb: FormBuilder, private courtierService: CourtierService,private toastr:ToastrService) {
    this.id! = parseInt(this.route.snapshot.paramMap.get('id')!) ?? undefined;
  }

  async ngOnInit() {
    // const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    // if (id) this.facade.getById(id);
    // this.selected.set(this.facade.selected());
    this.initForm();
    this.courtierService.getDetailTier(this.id).subscribe({
      next: async (data: any) => {
        this.retrievedTier = data;
        if (this.retrievedTier.length > 0) {
          this.toastr.success('Les données du tiers ont été chargées avec succès.', 'Succès');
          this.editMode = false; // Disable edit mode after loading data
          this.tierObject.set(this.retrievedTier.filter(t => t.typename === "TIERS")[0]);
          this.dpmObject.set(this.retrievedTier.filter(t => t.typename === "DPM")[0]);
          this.dpplist.set(this.retrievedTier.filter(t => t.typename === "DPP"));
        } else {
          console.warn('No tier data found for the given ID');
          this.toastr.warning('Aucune donnée de tiers trouvée pour cet ID.', 'Attention');
        }

      },
      error: (error) => {
        console.error('Error fetching tier details:', error);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    })

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
