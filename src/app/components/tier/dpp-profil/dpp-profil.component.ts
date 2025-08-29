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
  selector: 'app-dpp-profil',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule,
    MatCardModule, MatTabsModule, MatDatepickerModule, MatNativeDateModule,
    MatInputModule, MatCheckboxModule,
    MatButtonModule, MatIconModule],
  templateUrl: './dpp-profil.component.html',
  styleUrl: './dpp-profil.component.scss'
})
export class DppProfilComponent {


  public id: string
  selected = signal<Dpp | null>(null);
  selectedDPP = signal<Dpp | null>(null);
  @Input() listdpp = signal<Dpp[]>([]);

  editMode = false;
  detailMode = false;
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
      this.dppForm.patchValue(this.selectedDPP()!); // ou dpmTierData

    })
  }

  ngOnInit() {
    // const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    // if (id) this.facade.getById(id);
    // this.selected.set(this.facade.selected());
    this.initForm();
  }

  initForm() {

 this.dppForm = this.fb.group({
  Numdpp: [null, [Validators.required]],
  Numtiers: [null],
  Titre: [null],
  Nom: [null],
  Prenom: [null],
  Nompre: [null],
  Nomfille: [null],
  Alias: [null],
  Sexe: [null],
  Datenais: [null],
  Age: [null],
  Agemsme: [null],
  National: [null],
  Numss: [null],
  Sitfam: [null],
  Activite: [null],
  Catprof: [null],
  Csp: [null],
  Profess: [null],
  Employe: [null],
  Filiale: [null],
  Dateent: [null],
  Salaire: [null],
  Salaire1: [null],
  Datesal: [null],
  Telprof: [null],
  Postetel: [null],
  Faxpro: [null],
  Portable: [null],
  Npermis: [null],
  Lieuperm: [null],
  Condacc: [false],
  Dateca: [null],
  Datemoto: [null],
  Datevl: [null],
  Datepl: [null],
  Datetc: [null],
  Images: [null],
  Ssregion: [null],
  Sscaisse: [null],
  Sscentre: [null],
  Enfass: [false],
  Saltra: [null],
  Saltra1: [null],
  Saltrb: [null],
  Saltrb1: [null],
  Saltrc: [null],
  Saltrc1: [null],
  Numemail: [null],
  Datea1: [null],
  Datebsr: [null],
  Orgaffil: [null],
  Datea2: [null],
  Dateb1: [null],
  Regimesocial: [null],
  Regimelocal: [null],
  Emailprof: [null],
  Lieunaissance: [null],
  Datepermisbateau: [null],
  Typepermisbateau: [null],
  Datevalvl: [null],
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
    this.detailMode = !this.detailMode;
    this.updateFormState()
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

