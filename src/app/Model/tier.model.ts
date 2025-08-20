export interface Tier {
  Numtiers: number;
  Typtiers?: number;
  Nattiers?: string;
  Numdpp?: number;
  Titre?: string;
  Rsociale?: string;
  rsociale?: string;
  Referenc?: string;
  Connexe?: string;
  Refext?: string;
  Adr1?: string;
  Adr2?: string;
  Adr3?: string;
  Codp?: string;
  codp?: string;
  Ville?: string;
  ville?: string;
  Codepays?: string;
  Pays?: string;
  Ntel?: string;
  Nfax?: string;
  Numemail?: string;
  Memo?: string;
  Ext?: string;
  Images?: string;
  Titnom?: string;
  Gommette?: string;
  Ole?: string;
  Titrecou?: string;
  Datdermo?: string; // ISO 8601 format date-time
  Modifpar?: string;
  Nbpercha?: number;
  Const?: string;
  Histo?: string;
  Adrinsee?: boolean;
  Adresse1?: string;
  Adresse2?: string;
  Adresse3?: string;
  Grcok?: boolean;
  Nonepur?: boolean;
  Territory?: string;
  Latitude?: number;
  Longitude?: number;
}
export const TierTagMap: Record<keyof Tier, string> = {
  Numtiers: 'N° de tiers',
  Typtiers: 'Type de tiers',
  Nattiers: 'Type de personne (p ou m)',
  Numdpp: 'Numéro de personne physique',
  Titre: 'Titre',
  Rsociale: 'Nom-prénom',
  rsociale: 'Nom-prénom',
  Referenc: 'Référence de classement',
  Connexe: 'Nom connexe',
  Refext: 'Référence externe (cie, etc...)',
  Adr1: 'Numéro et voie',
  Adr2: 'Auxiliaire de voie',
  Adr3: 'Lieu dit',
  Codp: 'Code postal',
  codp: 'Code postal',
  Ville: 'Bureau distributeur',
  ville: 'Bureau distributeur',
  Codepays: 'Code pays',
  Pays: 'Pays',
  Ntel: 'Téléphone domicile',
  Nfax: 'Fax domicile',
  Numemail: 'E mail internet domicile',
  Memo: 'Commentaires',
  Ext: 'Liste des extensions',
  Images: 'Images',
  Titnom: 'Titre, nom, prénom',
  Gommette: 'Gommette',
  Ole: 'Ole',
  Titrecou: 'Titre pour courriers',
  Datdermo: 'Date de dernière modif',
  Modifpar: 'Modifié par',
  Nbpercha: 'Nb de personnes à charge',
  Const: 'Constante : "t"',
  Histo: 'Historique des modifications',
  Adrinsee: 'Adresse au format insee',
  Adresse1: 'Adresse 1',
  Adresse2: 'Adresse 2',
  Adresse3: 'Adresse 3',
  Grcok: 'Grc migrée en volume',
  Nonepur: 'A conserver si épuration',
  Territory: 'Territoire',
  Latitude: 'Latitude',
  Longitude: 'Longitude',
};

