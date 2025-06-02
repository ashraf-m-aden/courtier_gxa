import { Component, computed, HostBinding, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TierFacade } from '../store/tier.Facade';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TierDisplay } from '../../../Model/tierDisplay.model';
import { DpmModel } from '../../../Model/dpm.model';
import { Dpp } from '../../../Model/dpp.model';
import { debounceTime, Observable } from 'rxjs';
import { TierService } from '../service/tier.service';
import { Store } from '@ngrx/store';
import { loadTiersData } from '../../../store/features/courtiers/courtier.actions';
import { selectTiers } from '../../../store/features/courtiers/courtier.selector';

@Component({
  selector: 'app-tier-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, MatInputModule, MatSelectModule,RouterModule,RouterLink,RouterLinkActive,
    MatFormFieldModule, FormsModule, ReactiveFormsModule,
    MatIconModule, MatCardModule
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  styleUrls: ['./tier-list.component.scss'],
  templateUrl: './tier-list.component.html',
})
export class TierListComponent {
  @HostBinding('@fadeIn') anim = true;
  private tierService = inject(TierService);
  private fb = inject(FormBuilder);

  filtersForm: FormGroup = this.fb.group({
    search: [''],
    typtiers: [''],
    ville: [''],
  });

  allTiers = signal<TierDisplay[]>([]);

  searchTerm = signal('');
  selectedType = signal('all');
  selectedCity = signal('');

  displayedColumns: string[] = ['type', 'nom', 'tel', 'adresse', 'ville', 'actions'];


  constructor(private facade: TierFacade, private courtierStore: Store) {
    this.courtierStore.select(selectTiers).subscribe(this.allTiers.set);

  }

  ngOnInit(): void {
    this.filtersForm.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.searchTerm.set(value.search?.toLowerCase().trim() || '');
      this.selectedType.set(value.typtiers || 'all');
      this.selectedCity.set(value.ville || '');
    });

    this.loadTiers();
  }

  private loadTiers(): void {
    // const dppList: Dpp[] = [
    //   {
    //     numdpp: 1,
    //     titre: 'M.',
    //     nom: 'Ali',
    //     prenom: 'Omar',
    //     numtiers: 1001,
    //     portable: '77223344',
    //     numemail: 'ali@example.com',
    //     activite: 'Médecin'
    //   }
    // ];

    // const dpmList: DpmModel[] = [
    //   {
    //     numtiers: 2001,
    //     nsiret: '12345678900010',
    //     nrc: 'RC123456',
    //     nrm: 'RM789456',
    //     url: 'https://entreprise.example.com',
    //     capital: 50000,
    //     capital1: 'EUR',
    //     codeape: '6201Z',
    //     lieuimm: 'Paris',
    //     tvaintra: 'FR123456789'
    //   }
    // ];

    // const tiers: TierDisplay[] = [
    //   ...dppList.map((dpp): TierDisplay => ({
    //     numtiers: dpp.numtiers!,
    //     nom: `${dpp.nom} ${dpp.prenom}`,
    //     adresse: dpp.portable ?? '',
    //     type: 'physique',
    //     ville: 'Djibouti',
    //     icon: 'person',
    //     color: 'accent'
    //   })),
    //   ...dpmList.map((dpm): TierDisplay => ({
    //     numtiers: dpm.numtiers,
    //     nom: dpm.nsiret ?? 'N/A',
    //     adresse: dpm.lieuimm ?? '',
    //     type: 'morale',
    //     ville: dpm.lieuimm ?? '',
    //     icon: 'apartment',
    //     color: 'primary'
    //   }))
    // ];

    // this.facade.loadAll();
    // this.items.set(this.facade.all());
    this.courtierStore.dispatch(loadTiersData())
    // this.allTiers.set(tiers);

  }
  allCities = computed(() =>
    Array.from(
      new Set(
        this.allTiers()
          .map(t => t.ville)
          .filter((v): v is string => typeof v === 'string')
      )
    )
  );

  filteredTiers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const type = this.selectedType();
    const city = this.selectedCity().toLowerCase();

    return this.allTiers().filter(tier => {
      const matchesSearch = [
        tier.nom?.toLowerCase(),
        tier.adresse?.toLowerCase(),
        tier.numtiers?.toString(),
        tier.ville?.toLowerCase()
      ].some(field => field?.includes(term));

      const matchesType = type === 'all' || tier.type === type;
      const matchesCity = city === '' || tier.ville?.toLowerCase() === city;

      return matchesSearch && matchesType && matchesCity;
    });
  });

  editTier(tier: TierDisplay): void {
    console.log('Edit:', tier);
  }

  viewTier(tier: TierDisplay): void {
    console.log('View:', tier);
  }

  deleteTier(tier: TierDisplay): void {
    console.log('Delete:', tier);
  }
}
