import { filter } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Piec } from '../../../../Model/piec.model';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-admin-piece-contrat',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './admin-piece-contrat.component.html',
  styleUrl: './admin-piece-contrat.component.css'
})
export class EditAdminPieceContratComponent {
  @Input() isContrat = signal(true); // Indique si c'est un contrat
  @Input() isEdit = signal(true); // Indique si c'est un contrat ou une police
  @Input() contratDetails = signal<any>(null);
  @Input() retrievedcontratDetails = signal<any>(null);

  pieces: Piec[] = []

  pieceForm: FormGroup;
  piece = signal({
    Contrat: 0,
    Piece: 0,
    Adhprin: 0,
    Codeprod: "",
    Oripiece: "",
    Effet: "",
    Sitpiece: "",
    Datesit: "",
    Suspens: "",
    Finpiece: "",
    Datefin: "",
    Entite: 0,
    Ciemaj: 0,
    Navenant: "",
    Motif: "",
    Globalor: "",
    Globalte: "",
    Preavis: 0,
    Memo: "",
    // Coeffcom: 0,
    Centre: "",
    Heure: "",
    Datemed: "",
    Datcreat: "",
    Cg: "",
  });


  constructor(private fb: FormBuilder, private courtierService: CourtierService, private toastr: ToastrService) {
    effect(() => {
      this.pieces = this.retrievedcontratDetails().filter((c: any) => { return c.typename == "piec" })
      console.log("UPDATE");

      this.patchPieceForm(this.piece())
    })
    this.pieceForm = this.fb.group({
      Numero: [''],
      NumeroPolice: [''],
      NumeroAvenant: [''],
      RefCg: [''],
      Origine: [''],
      Effet: [new Date()],
      HeureEffet: [''],
      Motif: [''],
      Situation: [''],

      // Champs manquants ajoutés ci-dessous :
      Contrat: [],
      Piece: [0],
      Adhprin: [0],
      Codeprod: [],
      Oripiece: [''],
      Sitpiece: [''],
      Datesit: [''],
      Suspens: [''],
      Finpiece: [''],
      Datefin: [''],
      Entite: [0],
      Ciemaj: [0],
      Navenant: [''],
      Globalor: [''],
      Globalte: [''],
      Preavis: [0],
      Memo: [''],
      //  Coeffcom: [0],
      Centre: [''],
      Datemed: [''],
      Datcreat: [''],
      Cg: [''],
      typename: "PIEC"

    });

  }

  update(existing: any) {
    console.log(existing)
    this.piece.set({
      ...existing,
      /*   Adhprin: existing.Adhprin ?? 0,
         Contrat: existing.Contrat ?? 0,
         Piece: existing.Piece ?? 0,
         Codeprod: existing.Codeprod ?? "",
         Oripiece: existing.Oripiece ?? "",
         Effet: existing.Effet ?? "",
         Sitpiece: existing.Sitpiece ?? "",
         Datesit: existing.Datesit ?? "",
         Suspens: existing.Suspens ?? "",
         Finpiece: existing.Finpiece ?? "",
         Datefin: existing.Datefin ?? "",
         Entite: existing.Entite ?? 0,
         Ciemaj: existing.Ciemaj ?? 0,
         Navenant: existing.Navenant ?? "",
         Motif: existing.Motif ?? "",
         Globalor: existing.Globalor ?? "",
         Globalte: existing.Globalte ?? "",
         Preavis: existing.Preavis ?? 0,
         Memo: existing.Memo ?? "",
         // Coeffcom: existing.Coeffcom ?? 0,
         Centre: existing.Centre ?? "",
         Heure: existing.Heure ?? "",
         Datemed: existing.Datemed ?? "",
         Datcreat: existing.Datcreat ?? "",
         Cg: existing.Cg ?? "",*/
      typename: "PIEC",
      Cie: 201,
      Cieprime: existing.Cieprime ?? null,
      Cietaxes: existing.Cietaxes ?? null,
      Commsup: existing.Commsup ?? null,
      Coutpol: existing.Coutpol ?? null,
      Coutpol1: existing.Coutpol1 ?? null,
      external_cie_nomcie: existing.external_cie_nomcie ?? "GXA ASSURANCES",
      PolGroupe: existing.PolGroupe ?? null,
      Police: existing.Police ?? null,
      Reference: existing.Reference ?? null,
      Role: existing.Role ?? "P",
      Tauxcn: existing.Tauxcn ?? null,
      Tauxcom: existing.Tauxcom ?? null,
      Tauxcout: existing.Tauxcout ?? null,
      Tauxpart: existing.Tauxpart ?? null,

    });

  }

  ngOnInit(): void {
    console.log("piece");
    console.log(this.isEdit());


  }
  patchPieceForm(piece: Piec) {
    this.pieceForm.patchValue({
      /*    Origine: piece.Oripiece || '',
          DateEffet: piece.Effet ? new Date(piece.Effet) : new Date(),
          HeureEffet: piece.Heure || '',
          Motif: piece.Motif || '',

          Contrat: piece.Contrat ?? 0,
          Piece: piece.Piece ?? 0,
          Adhprin: piece.Adhprin ?? 0,
          Codeprod: piece.Codeprod || '',
          Oripiece: piece.Oripiece || '',
          Sitpiece: piece.Sitpiece || '',
          Datesit: piece.Datesit ? new Date(piece.Datesit) : '',
          Suspens: piece.Suspens ? new Date(piece.Suspens) : '',
          Finpiece: piece.Finpiece || '',
          Datefin: piece.Datefin ? new Date(piece.Datefin) : '',
          Entite: piece.Entite ?? 0,
          Ciemaj: piece.Ciemaj ?? 0,
          Navenant: piece.Navenant || '',
          Globalor: piece.Globalor || '',
          Globalte: piece.Globalte || '',
          Preavis: piece.Preavis ?? 0,
          Memo: piece.Memo || '',
          // Coeffcom: piece.Coeffcom ?? "",
          Centre: piece.Centre || '',
          Datemed: piece.Datemed ? new Date(piece.Datemed) : '',
          Datcreat: piece.Datcreat ? new Date(piece.Datcreat) : '',
          Cg: piece.Cg || '',*/
      Cie: 201,
      Cieprime: null,
      Cietaxes: null,
      Commsup: null,
      Coutpol: null,
      Coutpol1: null,
      external_cie_nomcie: "GXA ASSURANCES",
      PolGroupe: null,
      Police: null,
      Reference: null,
      Role: "P",
      Tauxcn: null,
      Tauxcom: null,
      Tauxcout: null,
      Tauxpart: null,
      typename: "PIEC",
      Effet: piece.Effet || '',

    });
  }

  ngOnChanges(): void {

    console.log(this.retrievedcontratDetails());

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

  onSubmit() {
    if (this.pieceForm.valid) {

      let payload = {
        // "contrat": this.contratDetails().Contrat,

        "dossier": this.contratDetails().Numtiers,
        "produit": this.contratDetails().Codeprod,
        "Effet": this.pieceForm.get("Effet")?.value,
        "BasSecurityContext": JSON.parse(localStorage.getItem("BasSecurityContext")!),
        "contrat": this.contratDetails().Contrat,
        "data": { "PIEC": this.pieceForm.value, "CONT": this.contratDetails(), },
      }
      console.log(payload);
      console.log(this.contratDetails());


      if (payload.produit && payload.produit != "" && payload.produit != null && payload.produit != undefined) {
        this.courtierService.getAjoutPieceAuContrat(payload).subscribe({

          next: () => {
            this.toastr.success('Contrat mis à jour avec succès!')

            this.courtierService.getDetailContrat(payload.dossier).subscribe({
              next: (data: any) => {
                this.contratDetails.set(data)
              }
            })
          },
          error: (err) => {
            console.error("Erreur lors de l'ajout de la pièce au contrat", err);
            this.toastr.error("Erreur lors de l'ajout de la pièce au contrat", err);
          }
        })
      } else {
        this.courtierService.getAjoutPieceAuContrat(payload).subscribe({
          next: () => {
            this.courtierService.getDetailContrat(payload.dossier).subscribe({
              next: (data: any) => {
                this.contratDetails.set(data)
              }
            })
          }
          , error: (err) => {
            console.error("Erreur lors de l'ajout de la pièce au contrat", err);
            this.toastr.error("Erreur lors de l'ajout de la pièce au contrat", err);
          }
        })
      }

    }
  }

  onCancel() {
    this.pieceForm.reset();
    this.pieceForm.get("Contrat")?.setValue(this.retrievedcontratDetails()[0].Contrat)
    this.pieceForm.get("Codeprod")?.setValue(this.retrievedcontratDetails()[0].Codeprod)
  }
}
