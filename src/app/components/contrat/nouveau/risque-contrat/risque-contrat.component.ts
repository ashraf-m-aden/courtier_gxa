import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'risque-contrat',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './risque-contrat.component.html',
  styleUrl: './risque-contrat.component.css'
})
export class RisqueContratComponent {


  riskForm!: FormGroup;


  conducteurs = [
    {
      id: 1,
      titre: '',
      nomPrenom: '',
      age: null,
      dateB: '',
      numeroPermis: '',
      permisDelivrePar: '',
    },
  ];
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





}
