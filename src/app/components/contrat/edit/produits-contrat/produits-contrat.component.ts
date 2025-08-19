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
  selector: 'edit-produits-contrat',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, DatePipe],
  templateUrl: './produits-contrat.component.html',
  styleUrl: './produits-contrat.component.scss'
})
export class EditProduitsContratComponent {
  @Input() vehiculeForm!: FormGroup;
  @Input() isEdit = signal(false); // Indique si c'est un contrat ou une police
  @Input() isContrat = signal(true); // Indique si c'est un contrat ou une police
  @Input() contratDetails = signal<any>(null);
  @Input() adhesion = signal<any>(undefined);

  codeprodSignal = signal("");
  detailProduit = signal<any>(undefined);

  visibleProductEntries: any[] = [];
  constructor(private fb: FormBuilder, private courtierService: CourtierService) {
    this.vehiculeForm = this.fb.group({
      codeprod: [''],
    });


    effect(() => {
      if (this.adhesion()?.Codeprod || this.contratDetails().Codeprod) {
        this.courtierService.getDetailProduit(this.adhesion()?.Codeprod ?? this.contratDetails().Codeprod).subscribe({
          next: (data: Produit) => {

            this.detailProduit.set(data);

            this.codeprodSignal.set(this.adhesion()?.Codeprod ?? this.contratDetails().Codeprod);
            console.log(this.detailProduit());
            const productObject = this.detailProduit()

            if (!productObject) this.visibleProductEntries = [];

            this.visibleProductEntries = Object.entries(productObject)
              .filter(([key]) => this.productDisplayMap[key])
              .map(([key, value]) => ({
                label: this.productDisplayMap[key]?.label || key,
                value,
                isDate: this.productDisplayMap[key]?.isDate || false,
              }));

          }
        })
      }



    });
  }

  async ngOnInit() {







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


  // Helper to safely access dynamic property
  getPieceValue(entry: any): any {
    return entry.value;
  }

}
