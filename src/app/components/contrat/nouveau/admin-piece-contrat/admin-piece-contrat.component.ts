import { DatePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'admin-piece-contrat',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './admin-piece-contrat.component.html',
  styleUrl: './admin-piece-contrat.component.css'
})
export class AdminPieceContratComponent {
  @Input() isContrat = signal(true); // Indique si c'est un contrat
  @Input() isEdit = signal(true);
  pieces = [
    { id: 1, motif: 'affaire nouvelle', dateEffet: new Date('2023-08-26'), situation: 'Nouvelle pièce' },
    { id: 2, motif: 'renouvellement', dateEffet: new Date('2023-11-26'), situation: 'Nouvelle pièce' },
    { id: 3, motif: 'AFFAIRE NOUVEL', dateEffet: new Date('2023-07-10'), situation: 'Nouvelle pièce' },
    { id: 4, motif: 'RESILATION', dateEffet: new Date('2024-07-20'), situation: 'Résiliée' },
  ];

  pieceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pieceForm = this.fb.group({
      numero: [''],
      numeroPolice: [''],
      numeroAvenant: [''],
      refCg: [''],
      origine: ['affaire nouvelle'],
      dateEffet: [new Date()],
      heureEffet: [''],
      motif: ['affaire nouvelle'],
      situation: ['Nouvelle pièce'],
    });
  }
  ngOnInit(): void {
    if (!this.isEdit()) {
      this.pieces = [
        { id: 1, motif: 'affaire nouvelle', dateEffet: new Date('2023-08-26'), situation: 'Nouvelle pièce' },

      ];
    }
  }
}
