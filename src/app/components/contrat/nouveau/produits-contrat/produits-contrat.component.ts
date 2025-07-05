import { Component, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
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
  selector: 'produits-contrat',
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './produits-contrat.component.html',
  styleUrl: './produits-contrat.component.css'
})
export class ProduitsContratComponent {
  vehiculeForm!: FormGroup;

categoriesVehicules: CategorieVehicule[] = [
  {
    code: 'GXA_1CAT',
    libelle: 'Automobile, 1ère catégorie',
    marques: [
      {
        nom: 'TOYOTA',
        modeles: [
          {
            nom: 'Corolla',
            cv: 6,
            typeMine: 'M10COR001',
            carburant: 'Essence',
            places: 5,
            carrosserie: 'Berline'
          },
          {
            nom: 'Hilux',
            cv: 9,
            typeMine: 'M10HIL002',
            carburant: 'Diesel',
            places: 5,
            carrosserie: 'Pick-up'
          },
          {
            nom: 'Land Cruiser',
            cv: 12,
            typeMine: 'M10LC003',
            carburant: 'Diesel',
            places: 7,
            carrosserie: 'SUV'
          }
        ]
      },
      {
        nom: 'NISSAN',
        modeles: [
          {
            nom: 'Navara',
            cv: 10,
            typeMine: 'M20NAV003',
            carburant: 'Diesel',
            places: 5,
            carrosserie: 'Pick-up'
          },
          {
            nom: 'Qashqai',
            cv: 7,
            typeMine: 'M20QSH004',
            carburant: 'Essence',
            places: 5,
            carrosserie: 'SUV'
          }
        ]
      }
    ]
  },
  {
    code: 'GXA_2CAT',
    libelle: 'Utilitaires légers',
    marques: [
      {
        nom: 'RENAULT',
        modeles: [
          {
            nom: 'Kangoo',
            cv: 5,
            typeMine: 'M30KAN005',
            carburant: 'Diesel',
            places: 2,
            carrosserie: 'Fourgon'
          },
          {
            nom: 'Trafic',
            cv: 9,
            typeMine: 'M30TRA006',
            carburant: 'Diesel',
            places: 3,
            carrosserie: 'Fourgon'
          }
        ]
      },
      {
        nom: 'FORD',
        modeles: [
          {
            nom: 'Transit Custom',
            cv: 10,
            typeMine: 'M40TRA007',
            carburant: 'Diesel',
            places: 3,
            carrosserie: 'Fourgon'
          }
        ]
      }
    ]
  },
  {
    code: 'GXA_3CAT',
    libelle: 'Poids lourds',
    marques: [
      {
        nom: 'MERCEDES-BENZ',
        modeles: [
          {
            nom: 'Actros',
            cv: 45,
            typeMine: 'M50ACT008',
            carburant: 'Diesel',
            places: 2,
            carrosserie: 'Tracteur routier'
          }
        ]
      },
      {
        nom: 'MAN',
        modeles: [
          {
            nom: 'TGX',
            cv: 48,
            typeMine: 'M60TGX009',
            carburant: 'Diesel',
            places: 2,
            carrosserie: 'Tracteur routier'
          }
        ]
      }
    ]
  },
  {
    code: 'GXA_4CAT',
    libelle: 'Autocars et autobus',
    marques: [
      {
        nom: 'IVECO',
        modeles: [
          {
            nom: 'Crossway',
            cv: 35,
            typeMine: 'M70CRW010',
            carburant: 'Diesel',
            places: 55,
            carrosserie: 'Autocar'
          }
        ]
      },
      {
        nom: 'MERCEDES-BENZ',
        modeles: [
          {
            nom: 'Citaro',
            cv: 30,
            typeMine: 'M70CTR011',
            carburant: 'Diesel',
            places: 45,
            carrosserie: 'Autobus'
          }
        ]
      }
    ]
  },
  {
    code: 'GXA_5CAT',
    libelle: 'Véhicule à 2 ou 3 roues',
    marques: [
      {
        nom: 'SUZUKI',
        modeles: [
          {
            nom: 'GSX-R125',
            cv: 15,
            typeMine: 'M50GSXR',
            carburant: 'Essence',
            places: 2,
            carrosserie: 'Moto'
          }
        ]
      },
      {
        nom: 'YAMAHA',
        modeles: [
          {
            nom: 'MT-07',
            cv: 35,
            typeMine: 'M80MT7012',
            carburant: 'Essence',
            places: 2,
            carrosserie: 'Moto'
          }
        ]
      }
    ]
  }
];


  marquesDisponibles: Marque[] = [];
  modelesDisponibles: Modele[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.vehiculeForm = this.fb.group({
      categorie: [''],
      marque: ['']
    });

    this.vehiculeForm.get('categorie')?.valueChanges.subscribe(code => {
      const selected = this.categoriesVehicules.find(c => c.code === code);
      this.marquesDisponibles = selected?.marques || [];
      this.vehiculeForm.get('marque')?.reset(); // Reset marque quand on change de catégorie
      this.modelesDisponibles = [];
    });

    this.vehiculeForm.get('marque')?.valueChanges.subscribe(nom => {
      const selected = this.marquesDisponibles.find(m => m.nom === nom);
      this.modelesDisponibles = selected?.modeles || [];
    });
  }
}
