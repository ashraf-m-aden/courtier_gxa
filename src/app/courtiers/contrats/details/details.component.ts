import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { CourtierService } from '../../../Services/courtier/courtier.service';
import { DetailsAdminContratComponent } from '../../../components/contrat/details/admin-contrat/admin-contrat.component';
import { DetailsAdminPieceContratComponent } from '../../../components/contrat/details/admin-piece-contrat/admin-piece-contrat.component';
import { DetailsInfoGeneralContratComponent } from '../../../components/contrat/details/info-general-contrat/info-general-contrat.component';
import { DetailsProduitsContratComponent } from '../../../components/contrat/details/produits-contrat/produits-contrat.component';
import { DetailsRisqueContratComponent } from '../../../components/contrat/details/risque-contrat/risque-contrat.component';
import { ListQuittanceDetailsComponent } from '../../../components/contrat/details/list-quittance/list-quittance.component';

@Component({
  selector: 'details',
  imports: [FormsModule, MatStepperModule,ListQuittanceDetailsComponent, ReactiveFormsModule, DetailsInfoGeneralContratComponent, DetailsAdminContratComponent, DetailsAdminPieceContratComponent, DetailsRisqueContratComponent, DetailsProduitsContratComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsContratComponent {
  isContrat = signal<boolean>(true);
  isEdit = signal<boolean>(true);
  contratDetails = signal<any>(null);
  retrievedcontratDetails = signal<any>(null);
  idContrat = 0
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courtierService: CourtierService) {

    console.log(this.idContrat);

  }


  async ngOnInit() {
    this.idContrat = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id']) : 0;


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


}
