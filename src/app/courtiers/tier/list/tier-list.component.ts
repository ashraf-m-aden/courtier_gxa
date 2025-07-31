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
import { CourtierService } from '../../../Services/courtier/courtier.service';
import { Tier } from '../../../Model/tier.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-tier-list',
  standalone: true,
  imports: [
    CommonModule,MatProgressSpinnerModule,
    MatTableModule, MatInputModule, MatSelectModule, RouterModule, RouterLink, RouterLinkActive,
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

  allTiers = signal<Tier[]>([]);

  searchTerm = signal('');
  selectedType = signal('all');
  selectedCity = signal('');

  displayedColumns: string[] = ['type', 'nom', 'tel', 'adresse', 'ville', 'actions'];
  isLoading = signal(true);

  constructor(private facade: TierFacade, private courtierStore: Store, private courtierService: CourtierService, private router: Router) {

  }

  async ngOnInit() {
    this.filtersForm.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      this.searchTerm.set(value.search?.toLowerCase().trim() || '');
      this.selectedType.set(value.typtiers || 'all');
      this.selectedCity.set(value.ville || '');
    });

    await this.loadTiers();
  }

  async loadTiers() {
    this.courtierService.getTiersSearch().subscribe({
      next: (data: Tier[]) => {
        this.allTiers.set(data)
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading tiers:', error);
        this.isLoading.set(false);

      },
      complete: () => {
        console.log('Tiers loaded successfully');
        this.isLoading.set(false);

      }
    })

  }
  allCities = computed(() =>
    Array.from(
      new Set(
        this.allTiers()
          .map(t => t.Ville)
          .filter((v): v is string => typeof v === 'string')
      )
    )
  );

  // filteredTiers = computed(() => {
  //   const term = this.searchTerm().toLowerCase();
  //   const type = this.selectedType();
  //   const city = this.selectedCity().toLowerCase();

  //   return this.allTiers().filter(tier => {
  //     const matchesSearch = [
  //       tier.nom?.toLowerCase(),
  //       tier.adresse?.toLowerCase(),
  //       tier.Numtiers?.toString(),
  //       tier.ville?.toLowerCase()
  //     ].some(field => field?.includes(term));

  //     const matchesType = type === 'all' || tier.type === type;
  //     const matchesCity = city === '' || tier.ville?.toLowerCase() === city;

  //     return matchesSearch && matchesType && matchesCity;
  //   });
  // });

  editTier(tier: Tier): void {
    this.router.navigate(['/courtiers/tiers/details/' + tier.Numtiers])
  }

  viewTier(tier: TierDisplay): void {
    console.log('View:', tier);
  }

  deleteTier(tier: TierDisplay): void {
    console.log('Delete:', tier);
  }
}
