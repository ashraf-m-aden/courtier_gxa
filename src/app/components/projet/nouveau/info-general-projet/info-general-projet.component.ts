import { Component, effect, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produit } from '../../../../Model/produit.model';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { D } from '@angular/cdk/bidi-module.d-D-fEBKdS';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'info-general-projet',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './info-general-projet.component.html',
  styleUrl: './info-general-projet.component.scss'
})
export class InfoGeneralProjetComponent {
  @Input() isContrat = signal(true);
  @Input() project = signal<any>(null);
  @Input() numtier = signal<any>(0);

  formGroup: FormGroup;

  codeprodSignal = signal("");
  listProduits: Produit[] = []
  detailProduit = signal<any>(undefined);

  visibleProductEntries: any[] = [];
  constructor(private fb: FormBuilder, private courtierService: CourtierService, private router: Router, private toastr: ToastrService) {
    this.formGroup = this.fb.group({
      Intitule: ['', Validators.required],
      codeprod: ['', Validators.required],

    });

  }



  async ngOnInit() {

    this.courtierService.getListeDesProduits().subscribe({
      next: (data: Produit[]) => {
        this.listProduits = data


      }
    })
    this.formGroup.get('codeprod')?.valueChanges.subscribe(value => {

      this.courtierService.getDetailProduit(this.formGroup.get('codeprod')!.value).subscribe({
        next: (data: any) => {
          this.detailProduit.set(data[0])
          console.log(data);

          this.visibleProductEntries = Object.entries(data[0])
            .filter(([key]) => this.productDisplayMap[key])
            .map(([key, value]) => ({
              label: this.productDisplayMap[key]?.label || key,
              value,
              isDate: this.productDisplayMap[key]?.isDate || false,
            })) ?? [];

          this.codeprodSignal.set(
            this.formGroup.get('codeprod')!.value,
          );

        }
      })
    });

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


  onSubmit(): void {

    let payload = {
      "dossier": this.numtier(),
      "libelle": this.formGroup.get('Intitule')!.value,
      "produit": this.detailProduit().codeprod,
      "BasSecurityContext": JSON.parse(localStorage.getItem("BasSecurityContext")!)


    }
    this.courtierService.postCreateProjet(payload).subscribe({
      next: (data: any) => {
        console.log("Le projet créé avec succès", data);
        this.toastr.success("Le projet a été créé avec succès")

        const url = this.router.serializeUrl(
          this.router.createUrlTree(['/courtiers/projets/edit/' + data.project.proj_id])
        ); window.open(url, '_blank');


      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Une erreur est survenu lors de la création du projet: " + err)
      }
    });
  }
}


