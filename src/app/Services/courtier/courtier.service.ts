import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectTiers } from "../../store/features/courtiers/courtier.selector";
import { SessionStorage } from "../../Model/Model-SessionStorage/SessionStorage";



@Injectable({ providedIn: 'root' })
export class CourtierService {
  baseUrl = "http://localhost:3000/api"
  BasSecurityContext = JSON.parse(localStorage.getItem("BasSecurityContext")!)

  constructor(private http: HttpClient, private store: Store) {
  }

  public mergeObjects(data: any[]): any {
    const result: any = {};

    for (const item of data) {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (result[key] === undefined || result[key] === null || result[key] === "") {
            result[key] = item[key];
          } else if (result[key] !== item[key] && item[key] !== null && item[key] !== "") {
            // Merge into an array if values conflict and are not null or empty
            if (!Array.isArray(result[key])) {
              result[key] = [result[key]];
            }
            if (!result[key].includes(item[key])) {
              result[key].push(item[key]);
            }
          }
        }
      }
    }

    return result;
  }

  getDossiers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courtiers/Dossiers`);
  }

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courtiers/produits`);
  }

  getCommissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courtiers/commissions`);
  }

  getRisque(contrat: number, piece: number): Observable<any[]> {
    const payload = {
      "BasSecurityContext": this.BasSecurityContext,
      contrat, piece
    };
    return this.http.post<any[]>(`${this.baseUrl}/risk/risk_listitems`, payload);
  }



  getAjoutPieceAuContrat(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ajout_piece_au_contrat`, payload);
  }

  getCheckSession(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/check_session`, payload);
  }

  getCreateContrat(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_contrat`, payload);
  }

  getCreateQuittance(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_quittance`, payload);
  }

  getCreateReglement(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_reglement`, payload);
  }

  getCreateTier(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_tier`, payload);
  }

  getDetailContrat(contrat: number): Observable<any> {
    let payload = {
      "BasSecurityContext": this.BasSecurityContext,
      "contrat": contrat,
      "Allpieces": true,
      "DetailAdh": true,
      "Garanties": true,
      "Extensions": true,
      "infosCieProd": true
    }
    return this.http.post(`${this.baseUrl}/detail_contrat`, payload);
  }

  getDetailAdhesion(adh: number): Observable<any> {
    console.log("adhesion : " + adh);

    let payload = {
      "BasSecurityContext": this.BasSecurityContext,
      "adhesion": adh,

    }
    return this.http.post(`${this.baseUrl}/detail_adhesion`, payload);
  }

  getDetailProduit(code: string): Observable<any> {
    let payload = {
      BasSecurityContext: this.BasSecurityContext,
      code: code,

    };
    return this.http.post(`${this.baseUrl}/detail_produit`, payload);
  }

  getDetailQuittance(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/detail_quittance`, payload);
  }

  getDetailTier(id: number): Observable<Object> {
    let payload = {
      BasSecurityContext: this.BasSecurityContext,
      Dossier: id
    };
    return this.http.post(`${this.baseUrl}/detail_tier`, payload);
  }

  getListeDesContrats(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/liste_des_contrats`, payload);
  }

  getListeDesContratsDUnTier(id: number): Observable<any> {
    let payload = {
      BasSecurityContext: this.BasSecurityContext,
      dossier: id,
      IncludeAll: true

    };
    return this.http.post(`${this.baseUrl}/liste_des_contrats_d_un_tier`, payload);
  }

  getListeDesProduits(): Observable<any> {
    let payload = {
      BasSecurityContext: this.BasSecurityContext,

    }; return this.http.post(`${this.baseUrl}/liste_des_produits`, payload);
  }

  getListeDesQuittances(dossier: number, contrat: number): Observable<any> {
    let payload = {
      BasSecurityContext: this.BasSecurityContext,
      dossier: dossier,
      contrat: contrat
    }
    return this.http.post(`${this.baseUrl}/liste_des_quittances`, payload);
  }

  getProjects(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects`, payload);
  }

  getTabs(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tabs`, payload);
  }

  getLogout(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, payload);
  }

  getProfil(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/profile`, payload);
  }

  getTiersSearch(): Observable<any> {
    let payload = {
      BasSecurityContext: this.BasSecurityContext,
      reference: "default"
    }
    return this.http.post(`${this.baseUrl}/Tiers_Search`, payload);
  }

  getContratUpdate(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update_contrat`, payload);
  }


  postupdateRisk(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Risk/risk_update`, payload);
  }

  postcreateeRisk(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Risk/risk_create`, payload);
  }

  getTiersUpdate(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Tiers_Update`, payload);
  }

  getUpdatePieceDuContrat(payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update_piece_contrat`, payload);
  }
}



