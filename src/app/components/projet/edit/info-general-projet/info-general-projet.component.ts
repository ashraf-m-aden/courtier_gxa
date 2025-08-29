import { DatePipe } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { Router } from 'express';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-info-general-projet',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './info-general-projet.component.html',
  styleUrl: './info-general-projet.component.scss'
})
export class EditInfoGeneralprojetComponent {
  @Input() project = signal<any>(null);
  @Input() offre = signal<any>(null);

  formGroup: FormGroup;
  offerForm: FormGroup;

  constructor(private fb: FormBuilder,private courtierservice: CourtierService, private toastr: ToastrService) {
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

    deleteOffer(offer: any) {
    this.courtierservice.deleteproposition( this.project().proj_id,offer.id).subscribe({
      next: (data: any) => {
        console.log('Offre supprimée:', data);
        this.toastr.success("L'offre a été supprimée avec succès", "Succès" );
        // Mettre à jour l'affichage ou notifier l'utilisateur
        const updatedOffers = this.project().offers.filter((o: any) => o.offer.id !== offer.id);
        this.project().offers = updatedOffers;
        if (this.offre() && this.offre().id === offer.id) {
          this.offre.set(null); // Réinitialiser l'offre sélectionnée si elle a été supprimée
        }
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'offre:', err);
        this.toastr.error("Erreur lors de la suppression de l'offre", "Erreur");
      }
    });

  }

}


