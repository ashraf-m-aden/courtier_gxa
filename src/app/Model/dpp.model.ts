export interface Dpp {
  /** N° de personne physique */
  Numdpp: number;

  /** N° de tiers */
  Numtiers?: number;

  /** Titre */
  Titre?: string;

  /** Nom */
  Nom?: string;

  /** Prénom */
  Prenom?: string;

  /** Nom et prénom */
  Nompre?: string;

  /** Nom de jeune fille */
  Nomfille?: string;

  /** Alias */
  Alias?: string;

  /** Sexe */
  Sexe?: string;

  /** Date de naissance */
  Datenais?: Date;

  /** Age */
  Age?: number;

  /** Age millésime */
  Agemsme?: number;

  /** Nationalité */
  National?: string;

  /** N° de sécurité sociale */
  Numss?: string;

  /** Situation familiale */
  Sitfam?: string;

  /** Activité */
  Activite?: string;

  /** Catégorie professionnelle */
  Catprof?: string;

  /** Code socio professionnel */
  Csp?: string;

  /** Profession */
  Profess?: string;

  /** Employeur */
  Employe?: string;

  /** Filiale */
  Filiale?: string;

  /** Date entrée dans l'entreprise */
  Dateent?: Date;

  /** Salaire annuel */
  Salaire?: number;

  /** Salaire annuel (ISO 4217 currency code) */
  Salaire1?: string;

  /** Année du salaire annuel */
  Datesal?: number;

  /** Numéro téléphone professionnel */
  Telprof?: string;

  /** Numéro de poste */
  Postetel?: string;

  /** Numéro de FAX professionnel */
  Faxpro?: string;

  /** Numéro de téléphone portable */
  Portable?: string;

  /** Numéro du permis de conduire */
  Npermis?: string;

  /** Permis délivré par : */
  Lieuperm?: string;

  /** Conduite accompagnée */
  Condacc?: boolean;

  /** Att. conduite accompagnée */
  Dateca?: Date;

  /** Date du permis moto A */
  Datemoto?: Date;

  /** Date du permis auto B */
  Datevl?: Date;

  /** Date du permis Poids-lourds C */
  Datepl?: Date;

  /** Date du permis Transp/Commun D */
  Datetc?: Date;

  /** Photo */
  Images?: string;

  /** Code région */
  Ssregion?: string;

  /** Code caisse */
  Sscaisse?: string;

  /** Centre de paiement */
  Sscentre?: string;

  /** Enfant d'assuré */
  Enfass?: boolean;

  /** Salaire tranche A */
  Saltra?: number;

  /** Salaire tranche A (ISO 4217 currency code) */
  Saltra1?: string;

  /** Salaire tranche B */
  Saltrb?: number;

  /** Salaire tranche B (ISO 4217 currency code) */
  Saltrb1?: string;

  /** Salaire tranche C */
  Saltrc?: number;

  /** Salaire tranche C (ISO 4217 currency code) */
  Saltrc1?: string;

  /** Email personnel */
  Numemail?: string;

  /** Date permis A1 */
  Datea1?: Date;

  /** Date obtention BSR */
  Datebsr?: Date;

  /** Organisme d'affiliation */
  Orgaffil?: string;

  /** Date permis A2 */
  Datea2?: Date;

  /** Date du permis B1 (Quad) */
  Dateb1?: Date;

  /** Régime Social */
  Regimesocial?: string;

  /** Régime Social Local */
  Regimelocal?: string;

  /** Email professionnel */
  Emailprof?: string;

  /** Lieu de Naissance */
  Lieunaissance?: string;

  /** Date d'optention du permis bateau */
  Datepermisbateau?: Date;

  /** Type de Permis Bateau */
  Typepermisbateau?: string;

  /** Date Validité Permis Moto */
  Datevalvl?: Date;
}

export enum DppTitre {
  TITRE = 'TITRE'
}

export enum DppSexe {
  SEXE = 'SEXE'
}

export enum DppNational {
  ISO3166 = 'ISO3166'
}

export enum DppSitfam {
  SITFAM = 'SITFAM'
}

export enum DppActivite {
  ACTIVITE = 'ACTIVITE'
}

export enum DppCatprof {
  CATPROF = 'CATPROF'
}

export enum DppCsp {
  CSP = 'CSP'
}
