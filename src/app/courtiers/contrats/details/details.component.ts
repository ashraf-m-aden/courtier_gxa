import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { AdminContratComponent } from '../../../components/contrat/nouveau/admin-contrat/admin-contrat.component';
import { AdminPieceContratComponent } from '../../../components/contrat/nouveau/admin-piece-contrat/admin-piece-contrat.component';
import { InfoGeneralContratComponent } from '../../../components/contrat/nouveau/info-general-contrat/info-general-contrat.component';
import { ProduitsContratComponent } from '../../../components/contrat/nouveau/produits-contrat/produits-contrat.component';
import { RisqueContratComponent } from '../../../components/contrat/nouveau/risque-contrat/risque-contrat.component';
import { Contrat } from '../../../Model/contrat.model';
import { CourtierService } from '../../../Services/courtier/courtier.service';


@Component({
  selector: 'details',
  imports: [FormsModule, MatStepperModule, ReactiveFormsModule, InfoGeneralContratComponent, AdminContratComponent, AdminPieceContratComponent, RisqueContratComponent, ProduitsContratComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsContratComponent {
  contratForm!: FormGroup;
  isContrat = signal<boolean>(true);
  contratDetails: Contrat | null = null;
  idContrat = 0
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courtierService: CourtierService) {
    console.log(this.route.snapshot.data['isContrat']);

    this.isContrat.set(this.route.snapshot.data['isContrat'])
    this.idContrat = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id']) : 0;

  }

  async ngOnInit() {
    if (this.idContrat != 0) {
      await this.courtierService.postDetailContrat(this.idContrat).subscribe({
        next: (data: any) => {
          this.contratDetails = data;

        },
        error: (error) => {
          console.error('Error fetching contract details:', error);
        },
        complete: () => {
          console.log('Contract details fetched successfully');
        }
      })
    }
    this.contratForm.patchValue(this.contratDetails!);

  }

  onSubmit(): void {
    if (this.contratForm.valid) {
      const contratData = this.contratForm.value;
      if (this.isContrat()) {
        console.log('Contrat soumis :', contratData);

      } else {
        console.log('Projet soumis :', contratData);

      }

      // TODO : Envoyer contratData à l’API
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
