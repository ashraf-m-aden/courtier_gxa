import { DatePipe } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'details-admin-contrat',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './admin-contrat.component.html',
  styleUrl: './admin-contrat.component.css'
})
export class DetailsAdminContratComponent {

  @Input() isEdit = signal(true); // Indique si c'est un contrat ou une police
  @Input() contratDetails = signal<any>(null);

  fractionnements = ['A', 'S', 'T', 'M'];

  constructor(private fb: FormBuilder) {

    effect(() => {
      console.log(this.contratDetails());

    })

  }

  ngOnInit(): void {

  }




}
