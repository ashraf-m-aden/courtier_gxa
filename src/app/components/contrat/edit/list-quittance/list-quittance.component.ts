import { Component, effect, Input, signal } from '@angular/core';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { QuitModel } from '../../../../Model/quit.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'list-quittance-details',
  imports: [DatePipe, MatCardModule, FormsModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './list-quittance.component.html',
  styleUrl: './list-quittance.component.scss'
})
export class ListQuittanceDetailsComponent {
  @Input() contratDetails = signal<any>(undefined)
  list_quittances: QuitModel[] = []
  @Input() isEdit = signal(true);
  quitForm: FormGroup;

  constructor(private courtierService: CourtierService, private fb: FormBuilder) {



    effect(() => {
      courtierService.getListeDesQuittances(this.contratDetails()?.Numtiers, this.contratDetails()?.Contrat).subscribe({
        next: (data: any) => {
          if (Array.isArray(data)) {
            this.list_quittances = data

          } else {
            this.list_quittances = []
          }
        }
      })
    })
    this.quitForm = this.fb.group({
      Numero: [null, Validators.required],
      Numbor: [null],
      Lignebor: [null],
      Idente: [null],
      Contrat: [this.contratDetails()?.Contrat],
      Piece: [this.contratDetails()?.Piece],
      Police: [null],
      Nature: [null],
      Entite: [null],
      Cie: [this.contratDetails()?.Cie],
      Gestion: [null],
      Quitopt: [false],
      Bloque: [false],
      Emission: [null],
      Encaiss: [null],
      Enreg: [null],
      Sitcli: [null],
      Typeff: [null],
      Dsitcli: [null],
      Sitcie: [null],
      Retcie: [null],
      Dsitcie: [null],
      Numcie: [null],
      Debeffet: [null],
      Fineffet: [null],
      Debit: [null],
      Rcm: [null],
      Indice: [null],
      Coeff: [null],
      Soldedu: [null],
      Soldedu1: [null],
      Totquit: [null],
      Totquit1: [null],
      Ptotale: [null],
      Ptotale1: [null],
      Pnette: [null],
      Pnette1: [null],
      Ppure: [null],
      Ppure1: [null],
      Catnat: [null],
      Catnat1: [null],
      Ristec: [null],
      Ristec1: [null],
      Frcie: [null],
      Frcie1: [null],
      Comm: [null],
      Comm1: [null],
      Commges: [null],
      Commges1: [null],
      Taxe: [null],
      Taxe1: [null],
      Taxatt: [null],
      Taxatt1: [null],
      Frgest: [null],
      Frgest1: [null],
      Netcie: [null],
      Netcie1: [null],
      Acompte: [null],
      Acompte1: [null],
      Hono: [null],
      Hono1: [null],
      CodeTva: [null],
      TauxTva: [null],
      Tvafr: [null],
      Tvafr1: [null],
      Frprel: [null],
      Frprel1: [null],
      Frcbt: [null],
      Frcbt1: [null],
      Memo: [null],
      Prorata: [null],
      Numtiers: [this.contratDetails()?.Numtiers],
      Prelevok: [false],
      Datenc: [null],
      Commatt: [null],
      Commatt1: [null],
      Ecart: [null],
      Ecart1: [null],
      Histo: [null],
      Coeffenc: [null],
      Libelle: [null],
      Adhesion: [null],
      Tvaht: [null],
      Tvaht1: [null],
      Tvamnt: [null],
      Tvamnt1: [null],
      Nfacture: [null],
      Basetra: [null],
      Basetra1: [null],
      Basetrb: [null],
      Basetrb1: [null],
      Basetrc: [null],
      Basetrc1: [null],
      Txtra: [null],
      Txtrb: [null],
      Txtrc: [null],
      Txdna: [null],
      Mandat: [null],
      Dispatch: [false],
      Quitlie: [null],
      Echprin: [false],
      Ext: [null]
    });
  }

  onSubmit() {
    if (this.quitForm.valid) {
      const quit: QuitModel = this.quitForm.value;
      console.log('Formulaire soumis : ', quit);
    }
  }
}
