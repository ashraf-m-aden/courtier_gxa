import { Piec } from './../../../../Model/piec.model';
import { filter } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Component, effect, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-admin-piece-contrat',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './admin-piece-contrat.component.html',
  styleUrl: './admin-piece-contrat.component.scss'
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
      Numero: [null],
      NumeroPolice: [null],
      NumeroAvenant: [null],
      RefCg: [null],
      Origine: [null],
      Effet: [new Date()],
      HeureEffet: [null],
      Motif: [null],
      Situation: [null],

      // Champs manquants ajoutés ci-dessous :
      Contrat: [this.contratDetails()?.Contrat || 0],
      Piece: [0],
      Adhprin: [0],
      Codeprod: [""],
      Oripiece: [null],
      Sitpiece: [null],
      Datesit: [null],
      Suspens: [null],
      Finpiece: [null],
      Datefin: [null],
      Entite: [0],
      Ciemaj: [0],
      Navenant: [null],
      Globalor: [null],
      Globalte: [null],
      Preavis: [0],
      Memo: [null],
      //  Coeffcom: [0],
      Centre: [null],
      Datemed: [null],
      Datcreat: [null],
      Cg: [null],
      typename: ["PIEC"]

    });

  }

  update(existing: any) {
    console.log(existing)
    this.piece.set({
      ...existing,
      Adhprin: existing.Adhprin ?? 0,
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
      Cg: existing.Cg ?? "",
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
      Origine: piece.Oripiece || null,
      DateEffet: piece.Effet ? new Date(piece.Effet) : new Date(),
      HeureEffet: piece.Heure || null,
      Motif: piece.Motif || null,

      Piece: piece.Piece ?? 0,
      Adhprin: piece.Adhprin ?? 0,
      Codeprod: piece.Codeprod || null,
      Oripiece: piece.Oripiece || null,
      Sitpiece: piece.Sitpiece || null,
      Datesit: piece.Datesit ? new Date(piece.Datesit) : null,
      Suspens: piece.Suspens ? new Date(piece.Suspens) : null,
      Finpiece: piece.Finpiece || null,
      Datefin: piece.Datefin ? new Date(piece.Datefin) : null,
      Entite: piece.Entite ?? 0,
      Ciemaj: piece.Ciemaj ?? 0,
      Navenant: piece.Navenant || null,
      Globalor: piece.Globalor || null,
      Globalte: piece.Globalte || null,
      Preavis: piece.Preavis ?? 0,
      Memo: piece.Memo || null,
      // Coeffcom: piece.Coeffcom ?? "",
      Centre: piece.Centre || null,
      Datemed: piece.Datemed ? new Date(piece.Datemed) : null,
      Datcreat: piece.Datcreat ? new Date(piece.Datcreat) : null,
      Cg: piece.Cg || null,
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
      Effet: piece.Effet || null,

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
      let cont = this.retrievedcontratDetails().filter((c: any) => { return c.typename == "CONT" })[0];
      cont.Echpjj = cont.Echpjj.toString()
      let payload = {
        // "contrat": this.contratDetails().Contrat,

        "dossier": this.contratDetails().Numtiers,
        "produit": this.contratDetails()?.Codeprod ?? this.pieces[0]?.Codeprod,
        "Effet": this.pieceForm.get("Effet")?.value,
        "BasSecurityContext": JSON.parse(localStorage.getItem("BasSecurityContext")!),
        "contrat": this.contratDetails().Contrat,
        "data": { "PIEC": this.pieceForm.value, "CONT": cont },
      }


      if (this.pieceForm.get("Piece")?.value > 0) {
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
            this.toastr.error("Erreur lors de l'ajout de la pièce au contrat ", err.error);
          }
        })
      } else {
        this.courtierService.getAjoutPieceAuContrat(payload).subscribe({
          next: () => {
            this.toastr.success('Contrat mis à jour avec succès!')

            this.courtierService.getDetailContrat(payload.dossier).subscribe({
              next: (data: any) => {
                this.contratDetails.set(data)
              }
            })
          }
          , error: (err) => {
            console.error("Erreur lors de l'ajout de la pièce au contrat", err);
            this.toastr.error("Erreur lors de l'ajout de la pièce au contrat", err.error);
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
