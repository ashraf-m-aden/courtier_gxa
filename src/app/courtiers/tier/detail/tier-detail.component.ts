import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TierFacade } from '../store/tier.Facade';
import { Tier } from '../../../Model/tier.model';
//import { constructor } from 'assert';
//import { classify } from '../store/__name@dasherize__.state';

@Component({
    selector: 'app-tier-detail',
    standalone: true,
    imports: [
      CommonModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule
    ],
    styleUrls: ['./tier-detail.component.scss'],
    templateUrl: './tier-detail.component.html'
  })
export class TierDetailComponent {
  public id:string
  selected= signal<Tier | null>(null);
  constructor(private route: ActivatedRoute, private facade: TierFacade) {
    this.id! = this.route.snapshot.paramMap.get('id')?? "";
  }

  ngOnInit() {
    const id = parseInt(window.location.pathname.split('/').pop() || '0', 10);
    if (id) this.facade.getById(id);
          this.selected.set(this.facade.selected());

  }
}
