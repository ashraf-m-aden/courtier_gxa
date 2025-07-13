import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'risque-contrat',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './risque-contrat.component.html',
  styleUrl: './risque-contrat.component.css'
})
export class RisqueContratComponent {


  riskForm!: FormGroup;

conducteurs: any[] = [];

conducteursDisponibles = [
  {
    id: 1,
    titre: 'M.',
    nomPrenom: 'Ali Mohamed',
    age: 32,
    dateB: '2015-06-01',
    numeroPermis: 'ABC12345',
    permisDelivrePar: 'Préfecture Djibouti'
  },
  {
    id: 2,
    titre: 'Mme',
    nomPrenom: 'Fatouma Ibrahim',
    age: 28,
    dateB: '2018-09-20',
    numeroPermis: 'XYZ78910',
    permisDelivrePar: 'Préfecture Balbala'
  }
];
conducteurSelectionne: any = null;
  constructor(private fb: FormBuilder) {
    this.riskForm = this.fb.group({
      vehicule: ['MITSUBISHI L200 PICK-UP -- 617D99'],
      usage: ['Promenade / Trajet'],
      valeurNeuve: [''],
      expertise: [''],
      dateAcquisition: [''],
      type: [''],

      derogationFVA: [''],
      marque: ['MITSUBISHI'],
      paysImmat: ['JAPON'],
      modele: ['PICK-UP'],
      typeMine: ['L200'],
      immatriculation: ['617D99'],
      dateCarteGrise: [''],
      datePremiereCirculation: [''],
      genre: ['VL'],
      carrosserie: ['Pick up'],

      energie: ['DIESEL'],
      transmission: [''],
      precedenteImmat: ['MMBNGV547PH01'],
      numeroIdentification: ['MMBNGV547PH01'],
      puissanceFiscale: [10],
      categorie: ['2'],
      placesAssises: [5],
      poidsVide: [''],
      poidsTR: [''],
      txCO2: [''],
      catCO2: [''],
      cv: [''],
      kilometrage: [''],
      couleur: [''],
      cleRep: [''],

      titulaire: [''],
      titulaireNom: [''],
      assurePrincipal: [false],
      enfantAssure: [false],
    });
  }


ajouterConducteurDepuisSelect() {
  if (this.conducteurSelectionne) {
    const existe = this.conducteurs.some(c => {return c.id == this.conducteurSelectionne.id});
    if (!existe) {
      this.conducteurs.push(this.conducteurSelectionne );
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
  if(changes['conducteurSelectionne']){
    console.log(this.conducteurSelectionne)
  }
}

}
