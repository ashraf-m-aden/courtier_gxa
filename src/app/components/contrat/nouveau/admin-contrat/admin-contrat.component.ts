import { Component, effect, Input, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'admin-contrat',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './admin-contrat.component.html',
  styleUrl: './admin-contrat.component.css'
})
export class AdminContratComponent {

  form!: FormGroup;
  @Input() isEdit = signal(true); // Indique si c'est un contrat ou une police
  @Input() contratDetails = signal<any>(null);

  fractionnements = ['A', 'S', 'T', 'M'];

  constructor(private fb: FormBuilder) {

    effect(() => {
      this.patchForm(this.contratDetails())
    })

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      echeances: this.fb.group({
        fractionnement: [''],
        jour: [],
        mois: [],
        termeEchu: [false],
        sansTaciteReconduction: [false],
        prochaineEcheance: [''],
        periodeEnCours: [''],
        periodeAnniversaire: [''],
        dateSuspensionPrevisionnelle: [''],
        dateResiliationPrevisionnelle: ['']
      }),
      situationComptable: this.fb.group({
        net: [''],
        impayes: [''],
        actes: ['']
      }),
      gestion: this.fb.group({
        gestionnaire: [''],
        centreGestionCie: [''],
        modeGestion: [''],
        destinataireTaxes: [''],
        commissionAttendue: [0],
        commissionGestion: [0],
        pollicitationInterdite: [false],
        aConserverSiEpuration: [false],
        dateRealisation: [''],
        signature: [''],
        preavisResiliation: [''],
        modalitesRevision: [''],
        dureeFixe: ['']
      })
    });
  }


  patchForm(data: any): void {
    this.form.patchValue({
      echeances: {
        fractionnement: this.contratDetails().Frac ?? '',
        jour: this.contratDetails().Echpjj ?? '',
        mois: this.contratDetails().Echpmm ?? '',
        termeEchu: this.contratDetails().Echu ?? false,
        sansTaciteReconduction: this.contratDetails().Tacite !== true, // inversion logique
        prochaineEcheance: this.contratDetails().Echeance ?? null,
        periodeEnCours: (this.contratDetails().Debcours && this.contratDetails().Fincours) ? `${this.contratDetails().Debcours} - ${this.contratDetails().Fincours}` : null,
        periodeAnniversaire: (this.contratDetails().Debann && this.contratDetails().Finann) ? `${this.contratDetails().Debann} - ${this.contratDetails().Finann}` : null,
        dateSuspensionPrevisionnelle: this.contratDetails().Prevsusp ?? null,
        dateResiliationPrevisionnelle: this.contratDetails().Prevresi ?? null,
      },
      situationComptable: {
        net: this.contratDetails().Netimp ?? null,
        impayes: this.contratDetails().Impaye ?? null,
        actes: this.contratDetails().Hono ?? null,
      },
      gestion: {
        gestionnaire: this.contratDetails().Gestionn ?? '',
        centreGestionCie: this.contratDetails().Centre ?? '',
        modeGestion: this.contratDetails().Modegest ?? '',
        destinataireTaxes: this.contratDetails().external_cie_nomcie ?? '', // affichage du libellé
        commissionAttendue: this.contratDetails().Tauxcom ?? 0,
        commissionGestion: this.contratDetails().Comges ?? 0,
        pollicitationInterdite: this.contratDetails().Polinter ?? false,
        aConserverSiEpuration: this.contratDetails().Sansquit ?? false,
        dateRealisation: this.contratDetails().Datereal ?? null,
        signature: this.contratDetails().TypeSignature ?? '',
        preavisResiliation: this.contratDetails().Preavis ?? '',
        modalitesRevision: this.contratDetails().Modrev ?? '',
        dureeFixe: this.contratDetails().Duree ?? 0,
      },
    });
  }

}
