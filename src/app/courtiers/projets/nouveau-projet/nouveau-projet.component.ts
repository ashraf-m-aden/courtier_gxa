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
import { EditInfoGeneralprojetComponent } from '../../../components/projet/edit/info-general-projet/info-general-projet.component';
import { InfoGeneralProjetComponent } from '../../../components/projet/nouveau/info-general-projet/info-general-projet.component';

@Component({
  selector: 'nouveau-projet',
  imports: [FormsModule, MatStepperModule, ReactiveFormsModule, InfoGeneralProjetComponent, AdminContratComponent, AdminPieceContratComponent, RisqueContratComponent, ProduitsContratComponent],
  templateUrl: './nouveau-projet.component.html',
  styleUrl: './nouveau-projet.component.css'
})
export class NouveauprojetComponent {
  contratForm!: FormGroup;
  isContrat = signal<boolean>(true);
  contratDetails = signal<any>(null);
  retrievedcontratDetails = signal<any>(null);
  numtier = signal(0);
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private courtierService: CourtierService) {

    this.isContrat.set(this.route.snapshot.data['isContrat'])
    this.route.snapshot.params['id'] ? this.numtier.set(parseInt(this.route.snapshot.params['id'])) : this.numtier.set(0);

  }


  async ngOnInit() {








  }


}
