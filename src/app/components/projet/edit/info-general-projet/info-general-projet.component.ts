import { DatePipe } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'edit-info-general-projet',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './info-general-projet.component.html',
  styleUrl: './info-general-projet.component.css'
})
export class EditInfoGeneralprojetComponent {
  @Input() project = signal<any>(null);
  @Input() offre = signal<any>(null);

  formGroup: FormGroup;
  offerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      Intitule: [''],
    });
    this.offerForm = this.fb.group({
      idproj: [null, Validators.required],     // obligatoire
      produit: ['', Validators.required]       // obligatoire
    });
    effect(() => {
      if (this.project()) {
        this.formGroup.patchValue({
          Intitule: this.project().proj_libelle || '',
        });
      }
    });
  }


  ngOnInit(): void {
    // Optionnel si tu veux surveiller en continu les changements de project

  }
  selectOffer(offer: any) {
    console.log('Offre cliquée:', offer);
    this.offre.set(offer);
    // ex: this.router.navigate(['/offers', offer.id]);
  }

}


