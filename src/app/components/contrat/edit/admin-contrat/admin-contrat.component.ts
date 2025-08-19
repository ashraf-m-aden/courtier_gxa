import { Component, effect, Input, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contrat } from '../../../../Model/contrat.model';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { Piec } from '../../../../Model/piec.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-admin-contrat',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './admin-contrat.component.html',
  styleUrl: './admin-contrat.component.css'
})
export class EditAdminContratComponent {

  form!: FormGroup;
  @Input() isEdit = signal(true); // Indique si c'est un contrat ou une police
  @Input() contratDetails = signal<any>(undefined);
  @Input() piece = signal<Piec | undefined>(undefined);

  fractionnements = ['A', 'S', 'T', 'M', 'D'];

  constructor(private fb: FormBuilder, private courtierService: CourtierService, private toastr: ToastrService) {

    effect(() => {
      this.patchForm(this.contratDetails()!)
    })

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      Contrat: [null],
      Numtiers: [null],
      Frac: [null],
      Echpjj: [null],
      Echpmm: [null],
      Intitule: [null],
      Affnouv: [null],
      Tacite: [false],
      Prelev: [null],
      Prelbank: [null],
      Jourp: [null],
      Querab: [null],
      Realis: [null],
      Apport1: [null],
      Apport2: [null],
      Tauxrea: [null],
      Tauxap1: [null],
      Tauxap2: [null],
      Gestionn: [null],
      Portef: [null],
      Remplace: [null],
      Remppar: [null],
      Derpiece: [null],
      Memo: [null],
      Ext: [null],
      Primann: [null],
      Primann1: [null],
      Commann: [null],
      Commann1: [null],
      Totann: [null],
      Totann1: [null],
      Dateresi: [null],
      Debcours: [null],
      Fincours: [null],
      Debsuiv: [null],
      Finsuiv: [null],
      Debann: [null],
      Finann: [null],
      Nbsin: [null],
      Impaye: [null],
      Impaye1: [null],
      Acompte: [null],
      Acompte1: [null],
      Netimp: [null],
      Netimp1: [null],
      Lima: [null],
      Retrorea: [null],
      Retroap1: [null],
      Retroap2: [null],
      Kprretro: [null],
      Kprretem: [null],
      Retroemi: [false],
      Datdermo: [null],
      Modifpar: [null],
      Ole: [null],
      Txcomm: [null],
      Comges: [null],
      Polinter: [false],
      Polrefus: [null],
      Modrev: [null],
      Sansquit: [false],
      Duree: [null],
      Modegest: [null],
      Echu: [false],
      Echeance: [null],
      Ddebpiec: [null],
      Dfinpiec: [null],
      Hono: [null],
      Hono1: [null],
      Frprel: [null],
      Frprel1: [null],
      Datereal: [null],
      Histo: [null],
      Typretrr: [null],
      Typretr1: [null],
      Typretr2: [null],
      Ptini: [null],
      Ptini1: [null],
      Pnini: [null],
      Pnini1: [null],
      Comini: [null],
      Comini1: [null],
      Agelimit: [null],
      Fiscal: [null],
      Numproj: [null],
      Propproj: [null],
      Archive: [null],
      Indic: [null],
      Nonepur: [false],
      Mandat: [null],
      Prevsusp: [null],
      Prevresi: [null],
      Fvahom: [false],
      Daterefindice: [null],
      TypeSignature: [null],
      "typename": "CONT"

    });




  }
  cleanQuestionMarks(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.cleanQuestionMarks(item));
    } else if (obj !== null && typeof obj === "object") {
      const newObj: any = {};
      for (const key of Object.keys(obj)) {
        newObj[key] = this.cleanQuestionMarks(obj[key]);
      }
      return newObj;
    } else if (typeof obj === "string" && obj.includes("?")) {
      // change here what you want instead of '?'
      return ""; // or null or a default value
    }
    return obj;
  }

  patchForm(obj: any): void {

    const data = this.cleanQuestionMarks(obj);

    this.form.patchValue({
      Contrat: data?.Contrat ?? null,
      Numtiers: data?.Numtiers ?? null,
      Frac: data?.Frac ?? null,
      Echpjj: data?.Echpjj ?? null,
      Echpmm: data?.Echpmm ?? null,
      Intitule: data?.Intitule ?? null,
      Affnouv: data?.Affnouv ?? null,
      Tacite: data?.Tacite ?? false,
      Prelev: data?.Prelev ?? null,
      Prelbank: data?.Prelbank ?? null,
      Jourp: data?.Jourp ?? null,
      Querab: data?.Querab ?? null,
      Realis: data?.Realis ?? null,
      Apport1: data?.Apport1 ?? null,
      Apport2: data?.Apport2 ?? null,
      Tauxrea: data?.Tauxrea ?? null,
      Tauxap1: data?.Tauxap1 ?? null,
      Tauxap2: data?.Tauxap2 ?? null,
      Gestionn: data?.Gestionn ?? null,
      Portef: data?.Portef ?? null,
      Remplace: data?.Remplace ?? null,
      Remppar: data?.Remppar ?? null,
      Derpiece: data?.Derpiece ?? null,
      Memo: data?.Memo ?? null,
      Ext: data?.Ext ?? null,
      Primann: data?.Primann ?? null,
      Primann1: data?.Primann1 ?? null,
      Commann: data?.Commann ?? null,
      Commann1: data?.Commann1 ?? null,
      Totann: data?.Totann ?? null,
      Totann1: data?.Totann1 ?? null,
      Dateresi: data?.Dateresi ?? null,
      Debcours: data?.Debcours ?? null,
      Fincours: data?.Fincours ?? null,
      Debsuiv: data?.Debsuiv ?? null,
      Finsuiv: data?.Finsuiv ?? null,
      Debann: data?.Debann ?? null,
      Finann: data?.Finann ?? null,
      Nbsin: data?.Nbsin ?? null,
      Impaye: data?.Impaye ?? null,
      Impaye1: data?.Impaye1 ?? null,
      Acompte: data?.Acompte ?? null,
      Acompte1: data?.Acompte1 ?? null,
      Netimp: data?.Netimp ?? null,
      Netimp1: data?.Netimp1 ?? null,
      Lima: data?.Lima ?? null,
      Retrorea: data?.Retrorea ?? null,
      Retroap1: data?.Retroap1 ?? null,
      Retroap2: data?.Retroap2 ?? null,
      Kprretro: data?.Kprretro ?? null,
      Kprretem: data?.Kprretem ?? null,
      Retroemi: data?.Retroemi ?? false,
      Datdermo: data?.Datdermo ?? null,
      Modifpar: data?.Modifpar ?? null,
      Ole: data?.Ole ?? null,
      Txcomm: data?.Txcomm ?? null,
      Comges: data?.Comges ?? null,
      Polinter: data?.Polinter ?? false,
      Polrefus: data?.Polrefus ?? null,
      Modrev: data?.Modrev ?? null,
      Sansquit: data?.Sansquit ?? false,
      Duree: data?.Duree ?? null,
      Modegest: data?.Modegest ?? null,
      Echu: data?.Echu ?? false,
      Echeance: data?.Echeance ?? null,
      Ddebpiec: data?.Ddebpiec ?? null,
      Dfinpiec: data?.Dfinpiec ?? null,
      Hono: data?.Hono ?? null,
      Hono1: data?.Hono1 ?? null,
      Frprel: data?.Frprel ?? null,
      Frprel1: data?.Frprel1 ?? null,
      Datereal: data?.Datereal ?? null,
      Histo: data?.Histo ?? null,
      Typretrr: data?.Typretrr ?? null,
      Typretr1: data?.Typretr1 ?? null,
      Typretr2: data?.Typretr2 ?? null,
      Ptini: data?.Ptini ?? null,
      Ptini1: data?.Ptini1 ?? null,
      Pnini: data?.Pnini ?? null,
      Pnini1: data?.Pnini1 ?? null,
      Comini: data?.Comini ?? null,
      Comini1: data?.Comini1 ?? null,
      Agelimit: data?.Agelimit ?? null,
      Fiscal: data?.Fiscal ?? null,
      Numproj: data?.Numproj ?? null,
      Propproj: data?.Propproj ?? null,
      Archive: data?.Archive ?? null,
      Indic: data?.Indic ?? null,
      Nonepur: data?.Nonepur ?? false,
      Mandat: data?.Mandat ?? null,
      Prevsusp: data?.Prevsusp ?? null,
      Prevresi: data?.Prevresi ?? null,
      Fvahom: data?.Fvahom ?? false,
      Daterefindice: data?.Daterefindice ?? null,
      TypeSignature: data?.TypeSignature ?? null,
      "typename": "CONT"

    }, { emitEvent: false }  // <--- n’émet pas de valueChanges
    );
  }



  updateContrat() {
    let payload = {
      // "contrat": this.contratDetails().Contrat,

      "piece": this.contratDetails().Piece,
      "BasSecurityContext": JSON.parse(localStorage.getItem("BasSecurityContext")!),
      "contrat": this.contratDetails().Contrat,
      "data": { "CONT": this.form.value, "PIEC": this.piece() },
    }
    this.courtierService.getContratUpdate(payload).subscribe({
      next: (data: any) => {
        console.log("Contrat mis à jour avec succès", data);
        this.courtierService.getDetailContrat(payload.contrat).subscribe({
          next: (data: any) => {
            this.toastr.success('Contrat mis à jour avec succès!');

            this.contratDetails.set(this.courtierService.mergeObjects(data));
          },
          error: (err) => {
            console.error("Erreur lors de la récupération des détails du contrat", err);
          }
        });
      }
      , error: (err) => {
        console.error("Erreur lors de la mise à jour du contrat", err);
        this.toastr.error("Erreur lors de la mise à jour du contrat", err);

      }

    });

  }

}
