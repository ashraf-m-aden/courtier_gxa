import { filter } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Piec } from '../../../../Model/piec.model';
import { CourtierService } from '../../../../Services/courtier/courtier.service';

@Component({
  selector: 'details-admin-piece-contrat',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './admin-piece-contrat.component.html',
  styleUrl: './admin-piece-contrat.component.css'
})
export class DetailsAdminPieceContratComponent {
  @Input() isContrat = signal(true); // Indique si c'est un contrat
  @Input() isEdit = signal(true); // Indique si c'est un contrat ou une police
  @Input() contratDetails = signal<any>(null);

  pieces: Piec[] = []




  constructor( private courtierService: CourtierService) {
    effect(() => {
      this.pieces = this.contratDetails().filter((c: any) => { return c.typename == "piec" })
      console.log("UPDATE");

    })
  ;

  }


  ngOnInit(): void {
    console.log("piece");
    console.log(this.isEdit());


  }

  ngOnChanges(): void {

    console.log(this.contratDetails());

  }

  // component.ts
  readonly pieceDisplayMap: Record<string, { label: string; hidden?: boolean; isDate?: boolean }> = {
    Adhprin: { label: 'Adhérent principal' },
    Codeprod: { label: 'Produit' },
    Contrat: { label: 'Numéro de contrat' },
    Datcreat: { label: 'Date de création', isDate: true },

    external_cie_nomcie: { label: 'Nom Compagnie' },
    external_prod_libelle: { label: 'Libellé produit' },

    Motif: { label: 'Motif' },
    Sitpiece: { label: 'Situation pièce' },
    // Ajoute d'autres champs si besoin
  };
  get visiblePieceKeys() {
    return Object.keys(this.pieceDisplayMap).filter(
      (key) => !this.pieceDisplayMap[key]?.hidden
    );
  }


  formatValue(entry: { value: any; isDate: boolean }) {
    if (entry.isDate) {
      const date = new Date(entry.value);
      return isNaN(date.getTime()) ? '-' : date.toLocaleDateString('fr-FR');
    }
    return entry.value ?? '-';
  }

  // Helper to safely access dynamic property
  getPieceValue(piece: any, key: string): any {
    return piece?.[key];
  }




}
