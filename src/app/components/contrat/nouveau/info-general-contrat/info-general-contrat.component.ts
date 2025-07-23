import { Component, effect, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'info-general-contrat',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './info-general-contrat.component.html',
  styleUrl: './info-general-contrat.component.css'
})
export class InfoGeneralContratComponent {
  @Input() isContrat = signal(true);
  @Input() isEdit = signal(true);
  @Input() contratDetails = signal<any>(null);

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      Intitule: [''],
    });
    effect(() => {
      const details = this.contratDetails();
      if (this.isEdit() && details) {
        this.formGroup.patchValue({
          Intitule: details.Intitule || '',
        });
      }
    });
  }

  ngOnChanges(): void {
    const details = this.contratDetails();
    if (this.isEdit() && details) {
      this.formGroup.patchValue({
        Intitule: details.Intitule || '',
      });
    } else {
      this.formGroup.reset();
    }

  }

  ngOnInit(): void {
    // Optionnel si tu veux surveiller en continu les changements de contratDetails

  }
}


