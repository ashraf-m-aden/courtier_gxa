import { Component, computed, effect, Input, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { Produit } from '../../../../Model/produit.model';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
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
  selector: 'edit-produits-nouveau-projet',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, DatePipe],
  templateUrl: './produits-nouveau-projet.component.html',
  styleUrl: './produits-nouveau-projet.component.scss'
})
export class EditProduitsNouveauProjetComponent {
  @Input() vehiculeForm!: FormGroup;
  @Input() project = signal<any>(null);
  @Input() adhesion = signal<any>(undefined);

  codeprodSignal = signal("");
  detailProduit = signal<any>(undefined);
  listProduits: Produit[] = []

  visibleProductEntries: any[] = [];
  constructor(private fb: FormBuilder, private courtierService: CourtierService, private toastr: ToastrService) {
    this.vehiculeForm = this.fb.group({
      codeprod: ['', Validators.required],
    });


    effect(() => {


      const productObject = this.detailProduit()





    });
  }



  async ngOnInit() {

    if (this.project() && this.project().offers && this.project().offers.length > 0) {
        this.vehiculeForm.get('codeprod')!.setValue(this.project().offers[0].offer.prod_id);
      this.courtierService.getDetailProduit(this.project().offers[0].offer.prod_id).subscribe({
        next: (data: any[]) => {
          this.detailProduit.set(data[0])
          console.log(data[0]);

          this.visibleProductEntries = Object.entries(data[0])
            .filter(([key]) => this.productDisplayMap[key])
            .map(([key, value]) => ({
              label: this.productDisplayMap[key]?.label || key,
              value,
              isDate: this.productDisplayMap[key]?.isDate || false,
            })) ?? [];

          this.codeprodSignal.set(
            this.vehiculeForm.get('codeprod')!.value,
          );

        }
      })
    }
    else {

      this.courtierService.getListeDesProduits().subscribe({
        next: (data: Produit[]) => {
          this.listProduits = data
        }
      })
      this.vehiculeForm.valueChanges.subscribe(values => {

        this.courtierService.getDetailProduit(this.vehiculeForm.get('codeprod')!.value).subscribe({
          next: (data: any[]) => {
            this.detailProduit.set(data[0])
            console.log(data[0]);

            this.visibleProductEntries = Object.entries(data[0])
              .filter(([key]) => this.productDisplayMap[key])
              .map(([key, value]) => ({
                label: this.productDisplayMap[key]?.label || key,
                value,
                isDate: this.productDisplayMap[key]?.isDate || false,
              })) ?? [];
            console.log(this.visibleProductEntries);

            this.codeprodSignal.set(
              this.vehiculeForm.get('codeprod')!.value,
            );

          }
        })
      });
    }
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
    return entry?.value;
  }

  submitnewOffer() {
    console.log("Soumission nouvelle offre avec code produit:", this.codeprodSignal());
    // Logique pour soumettre la nouvelle offre
    this.courtierService.postNewproposition(this.project().proj_id, this.codeprodSignal()).subscribe({
      next: (data: any) => {
        console.log("Nouvelle proposition ajoutée avec succès:", data);
        this.toastr.success("Nouvelle proposition ajoutée avec succès");
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la proposition:', err);
        this.toastr.error("Erreur lors de l'ajout de la proposition", err.toString());
      }
    });
  }

}
