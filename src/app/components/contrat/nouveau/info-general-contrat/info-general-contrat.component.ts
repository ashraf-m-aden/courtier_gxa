import { Component, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'info-general-contrat',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './info-general-contrat.component.html',
  styleUrl: './info-general-contrat.component.css'
})
export class InfoGeneralContratComponent {
  @Input() isContrat = signal(true); // Indique si c'est un contrat
  @Input() isEdit = signal(true);
  @Input() formGroup!: FormGroup;

  intitule = ""
  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      intitule: [''],

    });
  }


  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.intitule = this.formGroup?.get('intitule')?.value
  }
}
