import { Component, effect, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'details-info-general-contrat',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './info-general-contrat.component.html',
  styleUrl: './info-general-contrat.component.css'
})
export class DetailsInfoGeneralContratComponent {
  @Input() isContrat = signal(true);
  @Input() isEdit = signal(true);
  @Input() contratDetails = signal<any>(null);


  constructor(private fb: FormBuilder) {

    effect(() => {
      const details = this.contratDetails();

    });
  }

  ngOnChanges(): void {
    const details = this.contratDetails();

  }

  ngOnInit(): void {
    // Optionnel si tu veux surveiller en continu les changements de contratDetails

  }
}


