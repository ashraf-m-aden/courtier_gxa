
import { Component, computed, HostBinding, Inject, inject, Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TierFacade } from '../store/tier.Facade';
import { Tier } from '../../../Model/tier.model';

@Component({
  selector: 'app-tier-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
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
  // readonly items = this.facade.all;
  readonly items = signal<Tier[]>([]) // Signal<Tier[]>
  columns = ['name','id','actions'];
  // data = signal(this.items());
  // searchTerm = signal('');

  readonly searchTerm = signal<string>('');

  readonly filtered = computed(() => {
    const list = this.items();
    const term = this.searchTerm().toLowerCase();
    return term ? list?.filter(t => t.rsociale?.toLowerCase().includes(term)) ?? [] : this.items() ;
  });
  constructor(private router: Router, private facade: TierFacade) { }

  ngOnInit() {
    this.facade.loadAll();
    this.items.set(this.facade.all());
  }

  onRowClick(row: any) {
    window.location.href = `/tier/${row.id}`;
  }
  onSearch(event: Event) {
    this.searchTerm.set((event?.target as HTMLInputElement)?.value!.toLowerCase());
  }



  goToDetail(row: { name: string }) {
    this.router.navigate(['tier', row.name]);
  }
}
