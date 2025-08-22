import { Piec } from './../../../../Model/piec.model';
import { Component, effect, Input, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourtierService } from '../../../../Services/courtier/courtier.service';
import { RvehModel } from '../../../../Model/rveh.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-risque-projet',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './risque-projet.component.html',
  styleUrl: './risque-projet.component.css'
})
export class EditRisqueProjetComponent {


  riskForm!: FormGroup;
  @Input() project = signal<any>(undefined);
  @Input() adhesion = signal<any>(undefined);
  @Input() risa = signal<any>(undefined);
  @Input() rveh = signal<any>(undefined);
  @Input() garant = signal<any[]>([]);
  conducteurs: any[] = [];


  conducteurSelectionne: any = null;
  constructor(private fb: FormBuilder, private courtierService: CourtierService,private toastr: ToastrService) {
    this.riskForm = this.fb.group({

      Appel: [null],
      Usage: ['Promenade / Trajet'],
      Valneuf: [null],
      Valexp: [null],
      Dateach: [new Date()],
      Type: [null],
      DerogationFVA: [null],

      Titulai: [null],
      Titulq: [null],
      Marque: [null],
      Paysimmat: [null],
      Modele: [null],
      Symbmine: [null],
      Immat: [null],
      Datecg: [new Date()],
      Dateori: [new Date()],
      Datecirc: [new Date()],
      Genre: [null],
      Carross: [null],

      Energie: [null],
      Transmis: [null],
      Ancimmat: [null],
      Nserie: [null],
      Pfiscale: [0],
      Cate: [null],
      Places: [0],
      Poidvide: [null],
      Poidstr: [null],
      Co2: [null],
      Catco2: [null],
      Risque: [null],
      Numtiers: [this.project()?.Numtiers ?? this.risa()?.Numtiers ?? null],

      "typename": ['rveh']

    });
    effect(() => {
      if (this.rveh()) {
        this.patchRiskForm(this.rveh());
      } else {
        this.riskForm.reset();
      }


    }
    );
  }




  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.riskForm.get('Datecg')!.valueChanges.subscribe(value => {
      if (value) {
        const date = new Date(value);
        this.riskForm.get('Datecg')!.setValue(date, { emitEvent: false });
      }
    });
    this.riskForm.get('Datecirc')!.valueChanges.subscribe(value => {
      if (value) {
        const date = new Date(value);
        this.riskForm.get('Datecirc')!.setValue(date, { emitEvent: false });
      }
    });
    this.riskForm.valueChanges.subscribe(values => {
      if(this.risa()){
        this.risa().Appel = values?.Appel;
      this.risa().Dateori = null;
      }


    });
  }

  ajouterConducteurDepuisSelect() {
    if (this.conducteurSelectionne) {
      const existe = this.conducteurs.some(c => { return c.id == this.conducteurSelectionne.id });
      if (!existe) {
        this.conducteurs.push(this.conducteurSelectionne);
        console.log(this.conducteurSelectionne.id);
      }
    }
    this.conducteurSelectionne = null;
  }

  supprimerConducteur(index: number) {
    this.conducteurs.splice(index, 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['conducteurSelectionne']) {
      console.log(this.conducteurSelectionne)
    }


  }


  patchRiskForm(data: RvehModel): void {
    this.riskForm.patchValue({



      Appel: this.risa()?.Appel ?? null,
      Usage: data.Usage ?? null,
      Valneuf: data.Valneuf ?? null,
      Valexp: data.Valexp ?? null,
      Dateach: data.Dateach ?? null,
      Type: data.Type?.toString() ?? null,
      Modele: data.Modele ?? null,
      Symbmine: data.Symbmine?.toString() ?? null,
      Nserie: data.Nserie ?? null,
      Immat: data.Immat?.toString() ?? null,
      Datecg: data.Datecg ?? null,
      Datecirc: data.Datecirc ?? null,
      Genre: data.Genre ?? null,
      Carross: data.Carross ?? null,
      Energie: data.Energie ?? null,
      Puissan: data.Puissan ?? null,
      Pfiscale: data.Pfiscale ?? 0,
      Places: data.Places ?? 0,
      Poidvide: data.Poidvide ?? null,
      Poidstr: data.Poidstr ?? null,
      Remorque: data.Remorque ?? false,
      Numtiers: data?.Numtiers ?? this.risa()?.Numtiers ?? null,
      Risque: data?.Risque ?? this.risa()?.Risque ?? null,


      DerogationFVA: data.DerogationFVA ?? null,


      "typename": 'rveh'

    }, { emitEvent: false });
  }

  updateRisque() {
    let payload = {
      // "contrat": this.project().Contrat,

      "piece": this.project().Piece,
      "BasSecurityContext": JSON.parse(localStorage.getItem("BasSecurityContext")!),
      "contrat": this.project().Contrat,
      "data": { "RISA": this.risa(), "rveh": this.riskForm.value },
    }
    this.courtierService.postupdateRisk(payload).subscribe({
      next: (data: any) => {
        console.log("Contrat mis à jour avec succès", data);
            this.toastr.success('Contrat mis à jour avec succès!');

        this.courtierService.getDetailContrat(payload.contrat).subscribe({
          next: (data: any) => {
            this.project.set(this.courtierService.mergeObjects(data));
          },
          error: (err) => {
            console.error("Erreur lors de la récupération des détails du contrat", err);
            this.toastr.error("Erreur lors de la récupération des détails du contrat", err);
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
