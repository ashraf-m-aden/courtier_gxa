import { RisaModel } from "./risa.model";

/**
 * Interface représentant un risque véhicule.
 */
export interface RvehModel {
  Appel?: string;
  Centre?: any;
  Datebia?: Date | null;
  Dateori?: string;
  Datetar?: Date | null;
  Ext?: string;
  Identifi?: any;
  Images?: any;
  Memo?: string;
  Numtiers?: number;
  Ole?: any;
  Origine?: number;
  Risque: number;
  Tarif?: any;
  Zone?: any;
  typename?: string;

  Abs?: boolean;
  Alarme?: boolean;
  Ancimmat?: string | null;
  Anneerem?: Date | null;
  Antivol?: boolean;
  Carross?: string;
  Catco2?: any;
  Cate?: any;
  Catego?: any;
  Clasrep?: any;
  Classe?: any;
  Cnit?: any;
  Co2?: any;
  Codegta?: string | null;
  Conttech?: Date | null;
  Couleur?: string | null;
  Cpgar?: string | null;
  Crm?: number | null;
  Crmdepui?: Date | null;
  Crmmaxi?: Date | null;
  Cylind?: any;
  Dancimm?: any;
  Datdertr?: Date | null;
  Dateach?: Date | null;
  Datecg?: Date | null;
  Datecirc?: Date | null;
  Datecrm?: Date | null;
  Dateprtr?: Date | null;
  DerogationFVA?: any;
  Energie?: string;
  Gage?: boolean;
  Garage?: string | null;
  Genre?: string;
  Groupe?: number | null;
  Immat?: string;
  Joker?: boolean;
  Justanc?: any;
  Majcrm?: any;
  Marquage?: boolean;
  Marque?: string;
  Marquere?: string | null;
  Modele?: string;
  Nbtraite?: number | null;
  Nkm?: number | null;
  Nserie?: string | null;
  Numremor?: string | null;
  Orgleas?: string | null;
  Paysimmat?: string;
  Pct?: Date | null;
  Pfiscale?: number;
  Places?: number;
  Poidstr?: string | null;
  Poidvide?: string | null;
  Ptcrem?: string | null;
  Puissan?: number | null;
  Remorque?: boolean;
  Symbmine?: string;
  Titulai?: string | null;
  Titulq?: string | null;
  Transmis?: any;
  Txbonus?: any;
  Txmalus?: any;
  Type?: string;
  Typegar?: string | null;
  Typeloc?: string | null;
  Usage?: string;
  Valexp?: number | null;
  Valexp1?: string | null;
  Valneuf?: number | null;
  Valneuf1?: string | null;
  Vanrem?: number | null;
  Vanrem1?: string | null;
  Version?: any;
  Szone?: string | null;
}

  export const RisaTagMap: Record<string, keyof RisaModel> = {
    risque: 'risque',
    Numtiers: 'Numtiers',
    appel: 'appel',
    ext: 'ext',
    images: 'images',
    memo: 'memo',
    identifi: 'identifi',
    zone: 'zone',
    tarif: 'tarif',
    origine: 'origine',
    dateori: 'dateori',
    centre: 'centre',
    datetar: 'datetar',
    datebia: 'datebia',
    ole: 'ole'
  };

  // export const RvehFieldMap: Record<keyof RvehModel, string> = {
  //   risque: 'N° ordre',
  //   Numtiers: 'N° tiers',
  //   immat: 'N° immatriculation',
  //   datecg: 'date carte grise',
  //   datecirc: 'date de Mise en circulation',
  //   genre: 'genre',
  //   marque: 'Marque',
  //   type: 'Type',
  //   modele: 'Modèle',
  //   symbmine: 'Type mine',
  //   nserie: 'N° dans la Série du Type',
  //   carross: 'Carrosserie',
  //   energie: 'Energie',
  //   pfiscale: 'Cv fiscaux',
  //   puissan: 'Puissance',
  //   places: 'Places assises',
  //   poidvide: 'Poids à vide',
  //   poidstr: 'Poids total Roulant',
  //   valneuf: 'Valeur à neuf',
  //   valneuf1: 'Valeur à neuf (ISO 4217 currency code)',
  //   codegta: 'code GTA',
  //   groupe: 'groupe',
  //   classe: 'classe',
  //   couleur: 'couleur principale',
  //   alarme: 'avec alarme',
  //   marquage: 'avec marquage',
  //   antivol: 'avec antivol',
  //   abs: 'Avec ABS',
  //   remorque: 'remorque +750kg (ou side)',
  //   numremor: 'immatriculation remorque',
  //   marquere: 'marque de remorque',
  //   anneerem: 'année de la remorque',
  //   vanrem: 'valeur de la remorque',
  //   vanrem1: 'valeur de la remorque (ISO 4217 currency code)',
  //   ptcrem: 'Poids TC remorque',
  //   garage: 'lieu habituel de garage',
  //   cpgar: 'Code postal garage',
  //   typegar: 'type de garage',
  //   zone: 'zone',
  //   szone: 'sous-zone',
  //   nkm: 'nombre de kilometres',
  //   conttech: 'dernier controle technique',
  //   pct: 'prochain controle technique',
  //   orgleas: 'organisme de leasing',
  //   dateprtr: 'date de la 1iere traite',
  //   datdertr: 'date de la derniere traite',
  //   nbtraite: 'nombre de traites',
  //   usage: 'usage',
  //   crm: 'Coeff. Réduction/Majoration',
  //   datecrm: 'CRM à la date du',
  //   crmmaxi: 'date du CRM minimum',
  //   crmdepui: 'CRM sans interruption depuis',
  //   joker: 'Sinistre resp. non imputé CRM',
  // };

  // export const RvehTagMap: Record<string, keyof RvehModel> = Object.entries(RvehFieldMap).reduce((acc, [key]) => {
  //   acc[key] = key as keyof RvehModel;
  //   return acc;
  // }, {} as Record<string, keyof RvehModel>);

