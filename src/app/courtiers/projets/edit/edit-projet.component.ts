import { filter, Observable } from 'rxjs';
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
import { Piec } from '../../../Model/piec.model';
import { ToastrService } from 'ngx-toastr';
import { ListQuittanceDetailsComponent } from '../../../components/contrat/details/list-quittance/list-quittance.component';
import { EditInfoGeneralprojetComponent } from '../../../components/projet/edit/info-general-projet/info-general-projet.component';
import { EditAdminPieceProjetComponent } from '../../../components/projet/edit/admin-piece-projet/admin-piece-projet.component';
import { EditRisqueProjetComponent } from '../../../components/projet/edit/risque-projet/risque-projet.component';
import { EditProduitsProjetComponent } from '../../../components/projet/edit/produits-projet/produits-projet.component';
import { EditAdminProjetComponent } from '../../../components/projet/edit/admin-projet/admin-projet.component';
import { EditProduitsNouveauProjetComponent } from '../../../components/projet/edit/produits-nouveau-projet/produits-nouveau-projet.component';

@Component({
  selector: 'edit-contrat',
  imports: [FormsModule, MatStepperModule, ReactiveFormsModule,EditProduitsNouveauProjetComponent, EditInfoGeneralprojetComponent,EditAdminProjetComponent,EditAdminPieceProjetComponent,EditRisqueProjetComponent,EditProduitsProjetComponent],
  templateUrl: './edit-projet.component.html',
  styleUrl: './edit-projet.component.css'
})
export class EditProjetComponent {
  contratForm!: FormGroup;
  project = signal<any>(null);
   offre = signal<any>(null);

  projet: Observable<any> = new Observable();
  idProj = 0
    adhesion = signal<any>(undefined);
    risa = signal<any>(undefined);
    rveh = signal<any>(undefined);
    garant = signal<any[]>([]);
    idContrat = 0
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courtierService: CourtierService, private toastr: ToastrService) {
    this.idProj = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id']) : 0;
  }

ngOnInit() {
  this.courtierService.getDetailProjet(this.idProj).subscribe({
    next: (data: any) => {
      console.log("result");

      this.project.set(data?.project ?? null);
      console.log("Projet data:", data);
    },
    error: (err) => {
      console.error('API error:', err);
    }
  });
}

refresh(){
    this.courtierService.getDetailProjet(this.idProj).subscribe({
    next: (data: any) => {
      this.toastr.success("Données du projet actualisées");
      this.project.set(data?.project ?? null);
      console.log("Projet data:", data);
    },
    error: (err) => {
      console.error('API error:', err);
      this.toastr.error("Erreur lors de l'actualisation des données du projet",err.toString());
    }
  });
}
  onSubmit(): void {
    if (this.contratForm.valid) {
      const contratData = this.contratForm.value;
      console.log('Projet soumis :', contratData);
      alert("Projet enregistré avec succés")

      // TODO : Envoyer contratData à l’API
    } else {
      console.warn('Formulaire invalide');
    }
  }


}
