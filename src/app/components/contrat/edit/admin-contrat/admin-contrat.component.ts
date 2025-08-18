import { Component, effect, Input, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contrat } from '../../../../Model/contrat.model';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { Piec } from '../../../../Model/piec.model';

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
  @Input()  piece = signal<Piec|undefined>(undefined);

  fractionnements = ['A', 'S', 'T', 'M','D'];

  constructor(private fb: FormBuilder, private courtierService: CourtierService) {

    effect(() => {
      this.patchForm(this.contratDetails()!)
    })

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      Contrat: [""],
      Numtiers: [""],
      Frac: [''],
      Echpjj: [''],
      Echpmm: [''],
      Intitule: [''],
      Affnouv: [''],
      Tacite: [false],
      Prelev: [''],
      Prelbank: [""],
      Jourp: [''],
      Querab: [""],
      Realis: [""],
      Apport1: [""],
      Apport2: [""],
      Tauxrea: [""],
      Tauxap1: [""],
      Tauxap2: [""],
      Gestionn: [''],
      Portef: [''],
      Remplace: [''],
      Remppar: [''],
      Derpiece: [""],
      Memo: [''],
      Ext: [''],
      Primann: [""],
      Primann1: [''],
      Commann: [""],
      Commann1: [''],
      Totann: [""],
      Totann1: [''],
      Dateresi: [''],
      Debcours: [''],
      Fincours: [''],
      Debsuiv: [''],
      Finsuiv: [''],
      Debann: [''],
      Finann: [''],
      Nbsin: [""],
      Impaye: [""],
      Impaye1: [''],
      Acompte: [""],
      Acompte1: [''],
      Netimp: [""],
      Netimp1: [''],
      Lima: [""],
      Retrorea: [''],
      Retroap1: [''],
      Retroap2: [''],
      Kprretro: [""],
      Kprretem: [""],
      Retroemi: [false],
      Datdermo: [''],
      Modifpar: [''],
      Ole: [''],
      Txcomm: [""],
      Comges: [""],
      Polinter: [false],
      Polrefus: [""],
      Modrev: [''],
      Sansquit: [false],
      Duree: [""],
      Modegest: [''],
      Echu: [false],
      Echeance: [''],
      Ddebpiec: [''],
      Dfinpiec: [''],
      Hono: [""],
      Hono1: [''],
      Frprel: [""],
      Frprel1: [''],
      Datereal: [''],
      Histo: [''],
      Typretrr: [''],
      Typretr1: [''],
      Typretr2: [''],
      Ptini: [""],
      Ptini1: [''],
      Pnini: [""],
      Pnini1: [''],
      Comini: [""],
      Comini1: [''],
      Agelimit: [""],
      Fiscal: [''],
      Numproj: [""],
      Propproj: [""],
      Archive: [''],
      Indic: [""],
      Nonepur: [false],
      Mandat: [""],
      Prevsusp: [''],
      Prevresi: [''],
      Fvahom: [false],
      Daterefindice: [''],
      TypeSignature: [''],
      "typename": "CONT"

    });


    this.form.valueChanges.subscribe(values => {
      let payload = {
        // "contrat": this.contratDetails().Contrat,

        "piece": this.contratDetails().Piece,
        "BasSecurityContext": JSON.parse(localStorage.getItem("BasSecurityContext")!),
        "contrat": this.contratDetails().Contrat,
        "data": { "CONT": this.form.value,"PIEC":this.piece() },
      }
      this.courtierService.getContratUpdate(payload).subscribe({
        next: (data: any) => {
          console.log("Contrat mis à jour avec succès", data);
          this.courtierService.getDetailContrat(payload.contrat).subscribe({
            next: (data: any) => {
              this.contratDetails.set(this.courtierService.mergeObjects(data));
            },
            error: (err) => {
              console.error("Erreur lors de la récupération des détails du contrat", err);
            }
          });
        }
        , error: (err) => {
          console.error("Erreur lors de la mise à jour du contrat", err);
        }

      });
    });

  }


  patchForm(data: any): void {
    this.form.patchValue({
      Contrat: data?.Contrat ?? "",
      Numtiers: data?.Numtiers ?? "",
      Frac: data?.Frac ?? '',
      Echpjj: data?.Echpjj ?? '',
      Echpmm: data?.Echpmm ?? '',
      Intitule: data?.Intitule ?? '',
      Affnouv: data?.Affnouv ?? '',
      Tacite: data?.Tacite ?? false,
      Prelev: data?.Prelev ?? '',
      Prelbank: data?.Prelbank ?? "",
      Jourp: data?.Jourp ?? '',
      Querab: data?.Querab ?? "",
      Realis: data?.Realis ?? "",
      Apport1: data?.Apport1 ?? "",
      Apport2: data?.Apport2 ?? "",
      Tauxrea: data?.Tauxrea ?? "",
      Tauxap1: data?.Tauxap1 ?? "",
      Tauxap2: data?.Tauxap2 ?? "",
      Gestionn: data?.Gestionn ?? '',
      Portef: data?.Portef ?? '',
      Remplace: data?.Remplace ?? '',
      Remppar: data?.Remppar ?? '',
      Derpiece: data?.Derpiece ?? "",
      Memo: data?.Memo ?? '',
      Ext: data?.Ext ?? '',
      Primann: data?.Primann ?? "",
      Primann1: data?.Primann1 ?? '',
      Commann: data?.Commann ?? "",
      Commann1: data?.Commann1 ?? '',
      Totann: data?.Totann ?? "",
      Totann1: data?.Totann1 ?? '',
      Dateresi: data?.Dateresi ?? '',
      Debcours: data?.Debcours ?? '',
      Fincours: data?.Fincours ?? '',
      Debsuiv: data?.Debsuiv ?? '',
      Finsuiv: data?.Finsuiv ?? '',
      Debann: data?.Debann ?? '',
      Finann: data?.Finann ?? '',
      Nbsin: data?.Nbsin ?? "",
      Impaye: data?.Impaye ?? "",
      Impaye1: data?.Impaye1 ?? '',
      Acompte: data?.Acompte ?? "",
      Acompte1: data?.Acompte1 ?? '',
      Netimp: data?.Netimp ?? "",
      Netimp1: data?.Netimp1 ?? '',
      Lima: data?.Lima ?? "",
      Retrorea: data?.Retrorea ?? '',
      Retroap1: data?.Retroap1 ?? '',
      Retroap2: data?.Retroap2 ?? '',
      Kprretro: data?.Kprretro ?? "",
      Kprretem: data?.Kprretem ?? "",
      Retroemi: data?.Retroemi ?? false,
      Datdermo: data?.Datdermo ?? '',
      Modifpar: data?.Modifpar ?? '',
      Ole: data?.Ole ?? '',
      Txcomm: data?.Txcomm ?? "",
      Comges: data?.Comges ?? "",
      Polinter: data?.Polinter ?? false,
      Polrefus: data?.Polrefus ?? "",
      Modrev: data?.Modrev ?? '',
      Sansquit: data?.Sansquit ?? false,
      Duree: data?.Duree ?? "",
      Modegest: data?.Modegest ?? '',
      Echu: data?.Echu ?? false,
      Echeance: data?.Echeance ?? '',
      Ddebpiec: data?.Ddebpiec ?? '',
      Dfinpiec: data?.Dfinpiec ?? '',
      Hono: data?.Hono ?? "",
      Hono1: data?.Hono1 ?? '',
      Frprel: data?.Frprel ?? "",
      Frprel1: data?.Frprel1 ?? '',
      Datereal: data?.Datereal ?? '',
      Histo: data?.Histo ?? '',
      Typretrr: data?.Typretrr ?? '',
      Typretr1: data?.Typretr1 ?? '',
      Typretr2: data?.Typretr2 ?? '',
      Ptini: data?.Ptini ?? "",
      Ptini1: data?.Ptini1 ?? '',
      Pnini: data?.Pnini ?? "",
      Pnini1: data?.Pnini1 ?? '',
      Comini: data?.Comini ?? "",
      Comini1: data?.Comini1 ?? '',
      Agelimit: data?.Agelimit ?? "",
      Fiscal: data?.Fiscal ?? '',
      Numproj: data?.Numproj ?? "",
      Propproj: data?.Propproj ?? "",
      Archive: data?.Archive ?? '',
      Indic: data?.Indic ?? "",
      Nonepur: data?.Nonepur ?? false,
      Mandat: data?.Mandat ?? "",
      Prevsusp: data?.Prevsusp ?? '',
      Prevresi: data?.Prevresi ?? '',
      Fvahom: data?.Fvahom ?? false,
      Daterefindice: data?.Daterefindice ?? '',
      TypeSignature: data?.TypeSignature ?? '',
              "typename": "CONT"

    }, { emitEvent: false }  // <--- n’émet pas de valueChanges
    );
  }


}
