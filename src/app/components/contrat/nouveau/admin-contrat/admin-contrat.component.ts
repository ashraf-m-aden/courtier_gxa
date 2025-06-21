import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'admin-contrat',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './admin-contrat.component.html',
  styleUrl: './admin-contrat.component.css'
})
export class AdminContratComponent {

form!: FormGroup;

  fractionnements = ['Annuel', 'Semestriel', 'Trimestriel', 'Mensuel'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      echeances: this.fb.group({
        fractionnement: ['Semestriel'],
        jour: [20],
        mois: [7],
        termeEchu: [true],
        sansTaciteReconduction: [true],
        prochaineEcheance: ['2025-07-20'],
        periodeEnCours: [''],
        periodeAnniversaire: [''],
        dateSuspensionPrevisionnelle: [''],
        dateResiliationPrevisionnelle: ['2024-10-09']
      }),
      situationComptable: this.fb.group({
        net: ['-14749 FDJ'],
        impayes: ['-14749 FDJ'],
        actes: ['']
      }),
      gestion: this.fb.group({
        gestionnaire: ['AUTRES CLIENTS'],
        centreGestionCie: ['GXA ASSURANCES'],
        modeGestion: [''],
        destinataireTaxes: [''],
        commissionAttendue: [0],
        commissionGestion: [0],
        pollicitationInterdite: [false],
        aConserverSiEpuration: [true],
        dateRealisation: [''],
        signature: [''],
        preavisResiliation: [''],
        modalitesRevision: [''],
        dureeFixe: ['']
      })
    });
  }
}
