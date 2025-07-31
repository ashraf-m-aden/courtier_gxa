import { Component, Input, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { InfoGeneralContratComponent } from '../../../components/contrat/nouveau/info-general-contrat/info-general-contrat.component';
import { AdminContratComponent } from '../../../components/contrat/nouveau/admin-contrat/admin-contrat.component';
import { AdminPieceContratComponent } from '../../../components/contrat/nouveau/admin-piece-contrat/admin-piece-contrat.component';
import { RisqueContratComponent } from '../../../components/contrat/nouveau/risque-contrat/risque-contrat.component';
import { ProduitsContratComponent } from '../../../components/contrat/nouveau/produits-contrat/produits-contrat.component';
import { ActivatedRoute } from '@angular/router';
import { Contrat } from '../../../Model/contrat.model';
import { CourtierService } from '../../../Services/courtier/courtier.service';
import { EditAdminContratComponent } from '../../../components/contrat/edit/admin-contrat/admin-contrat.component';
import { EditAdminPieceContratComponent } from '../../../components/contrat/edit/admin-piece-contrat/admin-piece-contrat.component';
import { EditInfoGeneralContratComponent } from '../../../components/contrat/edit/info-general-contrat/info-general-contrat.component';
import { EditProduitsContratComponent } from '../../../components/contrat/edit/produits-contrat/produits-contrat.component';
import { EditRisqueContratComponent } from '../../../components/contrat/edit/risque-contrat/risque-contrat.component';

@Component({
  selector: 'edit-contrat',
  imports: [FormsModule, MatStepperModule, ReactiveFormsModule, EditInfoGeneralContratComponent, EditAdminContratComponent, EditAdminPieceContratComponent, EditRisqueContratComponent, EditProduitsContratComponent],
  templateUrl: './edit-contrat.component.html',
  styleUrl: './edit-contrat.component.css'
})
export class EditContratComponent {
  contratForm!: FormGroup;
  isContrat = signal<boolean>(true);
  isEdit = signal<boolean>(true);
  contratDetails = signal<any>(null);
  retrievedcontratDetails = signal<any>(null);
  idContrat = 0
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courtierService: CourtierService) {

    this.isContrat.set(this.route.snapshot.data['isContrat'])
    this.isEdit.set(this.route.snapshot.data['isEdit'])
    console.log(this.isEdit());
    this.idContrat = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id']) : 0;

  }


  async ngOnInit() {


    if (this.idContrat != 0 && this.isEdit()) {
      await this.courtierService.getDetailContrat(this.idContrat).subscribe({
        next: (data: any) => {
          this.contratDetails.set(this.courtierService.mergeObjects(data));
          this.retrievedcontratDetails.set(data);
          console.log('Contrat details:', this.retrievedcontratDetails());

        },
        error: (error) => {
          console.error('Error fetching contract details:', error);
        },
        complete: () => {
          console.log('Contract details fetched successfully');
        }
      })
    }






  }

  onSubmit(): void {
    if (this.contratForm.valid) {
      const contratData = this.contratForm.value;
      if (this.isContrat()) {
        console.log('Contrat soumis :', contratData);
        alert("Contrat enregistré avec succés")

      } else {
        console.log('Projet soumis :', contratData);
        alert("Projet enregistré avec succés")

      }

      // TODO : Envoyer contratData à l’API
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
