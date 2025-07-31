import { Component, effect, Input, signal } from '@angular/core';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { QuitModel } from '../../../../Model/quit.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'list-quittance-details',
  imports: [DatePipe],
  templateUrl: './list-quittance.component.html',
  styleUrl: './list-quittance.component.css'
})
export class ListQuittanceDetailsComponent {
  @Input() contratDetails = signal<any>(undefined)
  list_quittances: QuitModel[] = []
  constructor(private courtierService: CourtierService) {



    effect(() => {
      courtierService.getListeDesQuittances(this.contratDetails().Numtier, this.contratDetails().Contrat).subscribe({
        next: (data: any) => {
          this.list_quittances = data
        }
      })
    })
  }
}
