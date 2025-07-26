
// export enum OripieceCode {
//     // Valeurs attendues de ORIPIECE à compléter ici si disponibles
//   }

//   export enum SitpieceCode {
//     // Valeurs attendues de SITPIECE à compléter ici si disponibles
//   }

//   export enum FinpieceCode {
//     // Valeurs attendues de FINPIECE à compléter ici si disponibles
//   }
export interface Piec {
  /** N° contrat */
  Contrat: number;

  /** N° pièce du contrat */
  Piece: number;

  /** N° adhésion principale */
  Adhprin?: number;

  /** Produit */
  Codeprod?: string;

  /** Origine de la pièce */
  Oripiece?: string; //OripieceCode;

  /** date effet */
  Effet?: string;

  /** Situation pièce */
  Sitpiece?: string; // SitpieceCode;

  /** Date de situation */
  Datesit?: string;

  /** Date de suspension */
  Suspens?: string;

  /** Fin de pièce */
  Finpiece?: string; //FinpieceCode;

  /** Date de fin de pièce */
  Datefin?: string;

  /** Comptabilité */
  Entite?: number;

  /** compagnie majeure */
  Ciemaj?: number;

  /** N° avenant */
  Navenant?: string;

  /** motif de la pièce */
  Motif?: string;

  /** indice global d'origine */
  Globalor?: string;

  /** indice global terme */
  Globalte?: string;

  /** nb de mois de préavis */
  Preavis?: number;

  /** commentaires */
  Memo?: string;

  /** Coefficient commercial */
  Coeffcom?: number;

  /** Adresse de gestion Cie */
  Centre?: string;

  /** Heure */
  Heure?: string;

  /** Date Mise en demeure */
  Datemed?: string;

  /** Date/Heure Saisie */
  Datcreat?: string;

  /** Conditions Générales */
  Cg?: string;
}
