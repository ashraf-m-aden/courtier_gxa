import { filter } from 'rxjs';
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

@Component({
  selector: 'edit-contrat',
  imports: [FormsModule, MatStepperModule, ReactiveFormsModule, EditInfoGeneralContratComponent,ListQuittanceDetailsComponent, EditAdminContratComponent, EditAdminPieceContratComponent, EditRisqueContratComponent, EditProduitsContratComponent],
  templateUrl: './edit-contrat.component.html',
  styleUrl: './edit-contrat.component.css'
})
export class EditContratComponent {
  contratForm!: FormGroup;
  isContrat = signal<boolean>(true);
  isEdit = signal<boolean>(true);
  contratDetails = signal<any>(null);
  piece = signal<Piec | undefined>(undefined);
  retrievedcontratDetails = signal<any>(null);
  adhesion = signal<any>(undefined);
  risa = signal<any>(undefined);
  rveh = signal<any>(undefined);
  garant = signal<any[]>([]);
  idContrat = 0
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courtierService: CourtierService,private toastr: ToastrService) {

    this.isContrat.set(this.route.snapshot.data['isContrat'])
    this.isEdit.set(true)
    this.idContrat = this.route.snapshot.params['id'] ? parseInt(this.route.snapshot.params['id']) : 0;

  }


  ngOnInit() {


    if (this.idContrat != 0 && this.isEdit()) {
      this.courtierService.getDetailContrat(this.idContrat).subscribe({
        next: (data: any) => {
          this.contratDetails.set(this.courtierService.mergeObjects(data));
          this.retrievedcontratDetails.set(data);
          this.piece.set(data.filter((p: any) => p.typename == "piec")[0]);
          console.log('Contrat details:', this.retrievedcontratDetails());
          this.courtierService.getDetailAdhesion(this.piece()?.Adhprin!).subscribe({
            next: (data: any) => {
              this.adhesion.set(data.filter((p: any) => p.typename == "adh")[0]);
              this.risa.set(data.filter((p: any) => p.typename == "RISA")[0]);
              this.rveh.set(data.filter((p: any) => p.typename == "rveh")[0]);
              this.garant.set(data.filter((p: any) => p.typename == "garan"));
              if (!this.risa()) {
                console.log("no riza ici")
              } else {
                console.log("riza ici", this.risa());
              }
            },
            error: (error) => {
              console.error('Error fetching adhesion details:', error);
                          this.toastr.error('Erreur lors de la récupération des détails de l’adhésion', error);

            },
            complete: () => {
              console.log('adhesion details fetched successfully');
            }
          })
        },
        error: (error) => {
          console.error('Error fetching adhesion details:', error);
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

  createRisque() {
    let payload = {
      "contrat": this.contratDetails().Contrat,
      "piece": this.adhesion().Piece,
      "BasSecurityContext": JSON.parse(localStorage.getItem("BasSecurityContext")!),
      "data": {
        "adh": this.adhesion(),
        "RISA": {
          "Appel": "",
          "Centre": null,
          "Datebia": null,
          "Dateori": null,
          "Datetar": null,
          "Ext": null,
          "Identifi": null,
          "Images": null,
          "Memo": null,
          "Numtiers": this.adhesion()?.Numtiers,
          "Ole": null,
          "Tarif": null,
          "Zone": null
        },

      }
    }
    this.courtierService.postcreateeRisk(payload).subscribe({
      next: (data: any) => {
        console.log("Contrat mis à jour avec succès", data);
        this.courtierService.getDetailAdhesion(this.adhesion()?.Adhesion!).subscribe({
          next: (data: any) => {

            this.adhesion.set(data.filter((p: any) => p.typename == "adh")[0]);
            this.risa.set(data.filter((p: any) => p.typename == "RISA")[0]);
            this.rveh.set(data.filter((p: any) => p.typename == "rveh")[0]);
            this.garant.set(data.filter((p: any) => p.typename == "garan"));

          },
          error: (error) => {
            console.error('Error fetching adhesion details:', error);
            this.toastr.error('Erreur lors de la récupération des détails de l’adhésion', error);
          },
          complete: () => {
            console.log('adhesion details fetched successfully');
          }
        })
      }
      , error: (err) => {
        console.error("Erreur lors de la mise à jour du contrat", err);
      }

    });
  }
}
