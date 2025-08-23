import { Component, effect, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produit } from '../../../../Model/produit.model';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { D } from '@angular/cdk/bidi-module.d-D-fEBKdS';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'info-general-contrat',
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './info-general-contrat.component.html',
  styleUrl: './info-general-contrat.component.css'
})
export class InfoGeneralContratComponent {
  @Input() isContrat = signal(true);
  @Input() isEdit = signal(true);
  @Input() contratDetails = signal<any>(null);
  @Input() numtier = signal<any>(0);

  formGroup: FormGroup;

  codeprodSignal = signal("");
  listProduits: Produit[] = []
  detailProduit: Produit = {} as Produit;

  visibleProductEntries: any[] = [];
  constructor(private fb: FormBuilder, private courtierService: CourtierService, private router: Router, private toastr: ToastrService) {
    this.formGroup = this.fb.group({
      Intitule: ['', Validators.required],
      codeprod: ['', Validators.required],

    });
    effect(() => {


      const productObject = this.detailProduit
      console.log(Object.entries(productObject)
        .filter(([key]) => this.productDisplayMap[key])
        .map(([key, value]) => ({
          label: this.productDisplayMap[key]?.label || key,
          value,
          isDate: this.productDisplayMap[key]?.isDate || false,
        })));

      if (!productObject) this.visibleProductEntries = [];

      this.visibleProductEntries = Object.entries(productObject)
        .filter(([key]) => this.productDisplayMap[key])
        .map(([key, value]) => ({
          label: this.productDisplayMap[key]?.label || key,
          value,
          isDate: this.productDisplayMap[key]?.isDate || false,
        }));


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
        next: (data: Produit) => {
          this.detailProduit = data


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
      "Effet": new Date().toISOString().split('T')[0],
      "produit": this.detailProduit.codeprod,
      "BasSecurityContext": JSON.parse(localStorage.getItem("BasSecurityContext")!)
      ,
      "data": {
        "CONT": {
          "Acompte": null,
          "Acompte1": null,
          "Agelimit": null,
          "Apport1": null,
          "Apport2": null,
          "Archive": null,
          "Codeprod": this.detailProduit.codeprod,
          "Comges": null,
          "Comini": null,
          "Comini1": null,
          "Commann1": "???",
          "Datereal": null,
          "DateRefIndice": null,
          "Dateresi": "",
          "Duree": null,
          "Echeance": null,
          "Echpjj": "30",
          "Echpmm": "6t",
          "Echu": false,
          "Ext": null,
          "ext_cie_ncie": 201,
          "ext_cie_nomcie": "GXA ASSURANCES",
          "ext_piec_codeprod": this.detailProduit.codeprod,
          "ext_poli_police": null,
          "ext_prod_branc": "AU",
          "ext_prod_branche": "F1",
          "ext_prod_libelle": this.detailProduit.libelle,
          "Fiscal": null,
          "Frac": "A",
          "Frprel": null,
          "Frprel1": null,
          "Fvahom": null,
          "Gestionn": "AUTRES",
          "Histo": "",
          "Hono": null,
          "Hono1": null,
          "Impaye": null,
          "Impaye1": null,
          "Indic": null,
          "Intitule": this.formGroup.get('Intitule')!.value,
          "Jourp": null,
          "Kprretem": null,
          "Kprretro": null,
          "Lima": null,
          "Mandat": null,
          "Memo": null,
          "Modegest": null,
          "Modifpar": "ZAKARIA",
          "Modrev": null,
          "Nbsin": null,
          "Nonepur": false,
          "Numproj": null,
          "Numtiers": this.numtier(),
          "Ole": null,
          "Pnini": null,
          "Pnini1": null,
          "Polinter": false,
          "Polrefus": null,
          "Portef": null,
          "Prelbank": null,
          "Prelev": null,
          "Primann1": "???",
          "Propproj": null,
          "Ptini": null,
          "Ptini1": null,
          "Querab": null,
          "Realis": null,
          "Remplace": null,
          "Remppar": null,
          "Retroap1": null,
          "Retroap2": null,
          "Retroemi": false,
          "Retrorea": null,
          "Sansquit": false,
          "Tacite": false,
          "Tauxap1": null,
          "Tauxap2": null,
          "Tauxrea": null,
          "Totann1": "???",
          "TypeSignature": null,
          "Typretr1": null,
          "Typretr2": null,
          "Typretrr": null,
          "typename": "cont"
        },
        "PIEC": {
          "Cie": 201,
          "Cieprime": null,
          "Cietaxes": null,
          "Codeprod": this.detailProduit.codeprod,

          "Commsup": null,
          "Coutpol": null,
          "Coutpol1": null,
          "external_cie_nomcie": "GXA ASSURANCES",
          "PolGroupe": null,
          "Reference": null,
          "Role": "P",
          "Tauxcn": null,
          "Tauxcom": null,
          "Tauxcout": null,
          "Tauxpart": null
        }
      }
    }
    this.courtierService.getCreateContrat(payload).subscribe({
      next: (data: any) => {
        console.log("Contrat créé avec succès", data);
        this.toastr.success('Contrat créé avec succès!');
        const url = this.router.serializeUrl(
          this.router.createUrlTree(['/courtiers/contrats/edit/' + data.piec.contrat])
        ); window.open(url, '_blank');


      },
      error: (err) => {
        console.error(err);
        this.toastr.error("Une erreur est survenu lors de la création du contrat: " + err)
      }
    });
  }
}


