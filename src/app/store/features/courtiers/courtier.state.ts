import { TierDisplay } from "../../../Model/tierDisplay.model";
  export const tiersData: TierDisplay[] = [
  // Personnes physiques
  {
    numtiers: 1001,
    nom: 'Ali Mohamed',
    adresse: 'Quartier 6, Rue du Stade',
    type: 'physique',
    ville: 'Djibouti',
    icon: 'person',
    color: 'accent'
  },
  {
    numtiers: 1002,
    nom: 'Fatouma Ibrahim',
    adresse: 'Avenue Nasser, Lot 45',
    type: 'physique',
    ville: 'Balbala',
    icon: 'person',
    color: 'accent'
  },
  {
    numtiers: 1003,
    nom: 'Hassan Youssouf',
    adresse: 'PK12, Immeuble A1',
    type: 'physique',
    ville: 'PK12',
    icon: 'person',
    color: 'accent'
  },
  {
    numtiers: 1004,
    nom: 'Noura Abdallah',
    adresse: 'Cité Einguella, Blok C',
    type: 'physique',
    ville: 'Einguella',
    icon: 'person',
    color: 'accent'
  },
  {
    numtiers: 1005,
    nom: 'Mohamed Warsama',
    adresse: 'Rue Cheik Osman, Villa 17',
    type: 'physique',
    ville: 'Djibouti',
    icon: 'person',
    color: 'accent'
  },

  // Personnes morales
  {
    numtiers: 2001,
    nom: 'Entreprise Al Amal SARL',
    adresse: 'Zone industrielle, Lot 12',
    type: 'morale',
    ville: 'Djibouti',
    icon: 'apartment',
    color: 'primary'
  },
  {
    numtiers: 2002,
    nom: 'Clinique Al-Rahma',
    adresse: 'Boulaos, rue 10',
    type: 'morale',
    ville: 'Boulaos',
    icon: 'apartment',
    color: 'primary'
  },
  {
    numtiers: 2003,
    nom: 'Logistics Horn of Africa',
    adresse: 'Route de l’aéroport',
    type: 'morale',
    ville: 'Djibouti',
    icon: 'apartment',
    color: 'primary'
  },
  {
    numtiers: 2004,
    nom: 'StarTech SARL',
    adresse: 'Zone Franche, Bâtiment 3',
    type: 'morale',
    ville: 'Zone Franche',
    icon: 'apartment',
    color: 'primary'
  },
  {
    numtiers: 2005,
    nom: 'Groupe Educatif Lumière',
    adresse: 'Heron, rue du lycée',
    type: 'morale',
    ville: 'Héron',
    icon: 'apartment',
    color: 'primary'
  },

  // Données supplémentaires (optionnel)
  {
    numtiers: 1006,
    nom: 'Yasmine Dirieh',
    adresse: 'Salines Ouest, rue 3',
    type: 'physique',
    ville: 'Salines Ouest',
    icon: 'person',
    color: 'accent'
  },
  {
    numtiers: 2006,
    nom: 'ONG Aide Djibouti',
    adresse: 'Ambouli, avenue 15',
    type: 'morale',
    ville: 'Ambouli',
    icon: 'apartment',
    color: 'primary'
  },
  {
    numtiers: 1007,
    nom: 'Abdillahi Aden',
    adresse: 'Arhiba, Immeuble 8',
    type: 'physique',
    ville: 'Arhiba',
    icon: 'person',
    color: 'accent'
  },
  {
    numtiers: 2007,
    nom: 'TransGaz Africa',
    adresse: 'Port de Doraleh',
    type: 'morale',
    ville: 'Doraleh',
    icon: 'apartment',
    color: 'primary'
  },
  {
    numtiers: 1008,
    nom: 'Saida Moussa',
    adresse: 'Gabode 5, rue 21',
    type: 'physique',
    ville: 'Gabode',
    icon: 'person',
    color: 'accent'
  }
];
export interface CourtierState {
    dossiers: any[];
    contrats: any[];
    produits: any[];
    commissions: any[];
    tiers:TierDisplay[];
    loading: boolean;
    error: string | null;
  }

  export const initialCourtierState: CourtierState = {
    dossiers: [],
    contrats: [],
    produits: [],
    commissions: [],
    tiers:tiersData,
    loading: false,
    error: null
  };


