import { Component, computed, Input, signal } from '@angular/core';
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
  @Input() vehiculeForm!: FormGroup;
  @Input() isEdit = signal(true); // Indique si c'est un contrat ou une police
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
            typeMine: 'M10LAN003',
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
            cv: 8,
            typeMine: 'M20QAS004',
            carburant: 'Essence',
            places: 5,
            carrosserie: 'SUV'
          }
        ]
      },
      {
        nom: 'FORD',
        modeles: [
          {
            nom: 'Ranger',
            cv: 11,
            typeMine: 'M30RAN005',
            carburant: 'Diesel',
            places: 5,
            carrosserie: 'Pick-up'
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
            cv: 6,
            typeMine: 'U10KAN001',
            carburant: 'Diesel',
            places: 2,
            carrosserie: 'Fourgon'
          },
          {
            nom: 'Master',
            cv: 10,
            typeMine: 'U10MAS002',
            carburant: 'Diesel',
            places: 3,
            carrosserie: 'Fourgon'
          }
        ]
      },
      {
        nom: 'PEUGEOT',
        modeles: [
          {
            nom: 'Partner',
            cv: 7,
            typeMine: 'U20PAR003',
            carburant: 'Diesel',
            places: 2,
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
            cv: 30,
            typeMine: 'P10ACT001',
            carburant: 'Diesel',
            places: 2,
            carrosserie: 'Camion'
          }
        ]
      },
      {
        nom: 'VOLVO',
        modeles: [
          {
            nom: 'FH16',
            cv: 33,
            typeMine: 'P20FH16002',
            carburant: 'Diesel',
            places: 2,
            carrosserie: 'Camion'
          }
        ]
      }
    ]
  },
  {
    code: 'GXA_4CAT',
    libelle: 'Autobus et autocars',
    marques: [
      {
        nom: 'IVECO',
        modeles: [
          {
            nom: 'Daily Minibus',
            cv: 18,
            typeMine: 'B10DAI001',
            carburant: 'Diesel',
            places: 19,
            carrosserie: 'Minibus'
          }
        ]
      },
      {
        nom: 'MERCEDES-BENZ',
        modeles: [
          {
            nom: 'Citaro',
            cv: 25,
            typeMine: 'B20CIT002',
            carburant: 'Diesel',
            places: 50,
            carrosserie: 'Bus'
          }
        ]
      }
    ]
  },
  {
    code: 'GXA_5CAT',
    libelle: 'Véhicules à 2 ou 3 roues',
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
          },
          {
            nom: 'Burgman 200',
            cv: 12,
            typeMine: 'M50BUR200',
            carburant: 'Essence',
            places: 2,
            carrosserie: 'Scooter'
          }
        ]
      },
      {
        nom: 'YAMAHA',
        modeles: [
          {
            nom: 'MT-07',
            cv: 20,
            typeMine: 'M60MT07',
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

  constructor(private fb: FormBuilder) { }

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
