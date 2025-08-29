import { Component, computed, effect, Input, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { Produit } from '../../../../Model/produit.model';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
interface Modele {
  nom: string;
  cv: number;
  typeMine: string;
  carburant: string;
  places: number;
  carrosserie: string;
}

interface Marque {
  nom: string;
  modeles: Modele[];
}

interface CategorieVehicule {
  code: string;
  libelle: string;
  marques: Marque[];
}

@Component({
  selector: 'details-produits-contrat',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, DatePipe],
  templateUrl: './produits-contrat.component.html',
  styleUrl: './produits-contrat.component.scss'
})
export class DetailsProduitsContratComponent {
  @Input() vehiculeForm!: FormGroup;
  @Input() isEdit = signal(false); // Indique si c'est un contrat ou une police
  @Input() isContrat = signal(true); // Indique si c'est un contrat ou une police
  @Input() contratDetails = signal<any>(null);

  codeprodSignal!: Signal<any>;
  productObject= signal<any> (undefined)



  // Auto-fetch when contratDetails().Codeprod changes
  constructor(private courtierService: CourtierService) {
    effect(() => {
      const codeProd = this.contratDetails().Codeprod;
      if (codeProd) {
        this.fetchProductDetails(codeProd);
      }
    });
  }

  // API call
  private fetchProductDetails(codeProd: string) {
    this.courtierService.getDetailProduit(codeProd).subscribe({
      next: (data: any[]) => {
        this.productObject.set(data[0] ?? undefined);
        console.log("ici");
        console.log(data);

      },
      error: (err) => {
        console.error('Error loading product details', err);
        this.productObject.set(undefined);
      }
    });
  }

  ngOnChanges(): void {

  }
  productDisplayMap: Record<string, { label: string; hidden?: boolean; isDate?: boolean }> = {
    branc: { label: 'Branche' },
    branche: { label: 'Sous-branche' },
    codeprod: { label: 'Code Produit' },
    libelle: { label: 'Libellé' },
    cieprin: { label: 'Compagnie' },
    pronoave: { label: 'Code Avenant' },
    pronopol: { label: 'Code Police' },
    tardev: { label: 'Devise' },


  };
visibleProductEntries = computed(() => {
  const product = this.productObject() ?? {}; // ✅ prevent null errors

  return Object.entries(product)
    .filter(([key]) => !!this.productDisplayMap[key])
    .map(([key, value]) => ({
      label: this.productDisplayMap[key]?.label || key,
      value,
      isDate: this.productDisplayMap[key]?.isDate || false,
    }));
});

  // Helper to safely access dynamic property
  getPieceValue(entry: any): any {
    return entry.value;
  }

}
