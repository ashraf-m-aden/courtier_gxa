import { Component, effect, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'edit-info-general-projet',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './info-general-projet.component.html',
  styleUrl: './info-general-projet.component.css'
})
export class EditInfoGeneralprojetComponent {
  @Input() isContrat = signal(true);
  @Input() isEdit = signal(true);
  @Input() project = signal<any>(null);

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      Intitule: [''],
    });
    effect(() => {
      const details = this.project();
      if (this.isEdit() && details) {
        this.formGroup.patchValue({
          Intitule: details.Intitule || '',
        });
      }
    });
  }

  ngOnChanges(): void {
    const details = this.project();
    if (this.isEdit() && details) {
      this.formGroup.patchValue({
        Intitule: details.Intitule || '',
      });
    } else {
      this.formGroup.reset();
    }

  }

  ngOnInit(): void {
    // Optionnel si tu veux surveiller en continu les changements de project

  }
}


