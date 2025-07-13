import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectTiers } from "../../store/features/courtiers/courtier.selector";
import { SessionStorage } from "../../Model/Model-SessionStorage/SessionStorage";



@Injectable({ providedIn: 'root' })
export class CourtierService {
    baseUrl = "http://localhost:3000/api"

  constructor(private http: HttpClient, private store: Store) {
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



  postAjoutPieceAuContrat(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ajout_pièce_au_contrat`, payload);
  }

  postCheckSession(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/check_session`, payload);
  }

  postCreateContrat(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_contrat`, payload);
  }

  postCreateQuittance(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_quittance`, payload);
  }

  postCreateReglement(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_reglement`, payload);
  }

  postCreateTier(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create_tier`, payload);
  }

  postDetailContrat(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/detail_contrat`, payload);
  }

  postDetailProduit(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/detail_produit`, payload);
  }

  postDetailQuittance(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/detail_quittance`, payload);
  }

  postDetailTier(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/detail_tier`, payload);
  }

  postListeDesContrats(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/liste_des_contrats`, payload);
  }

  postListeDesContratsDUnTier(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/liste_des_contrats_d_un_tier`, payload);
  }

  postListeDesProduits(payload: any): Observable<any> {
    // You mentioned this one without a /api prefix
    return this.http.post(`/liste_des_produits`, payload);
  }

  postListeDesQuittances(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/liste_des_quittances`, payload);
  }

  postProjects(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects`, payload);
  }

  postTabs(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tabs`, payload);
  }

  postLogin(payload: any): Observable<any> {
    // No /api prefix in your registration
    return this.http.post(`/login`, payload);
  }

  postLogout(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, payload);
  }

  getProfil(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/profile`, payload);
  }

  postTiersSearch(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Tiers_Search`, payload);
  }

  postContratUpdate(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Contrat_Update`, payload);
  }

  postTiersUpdate(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Tiers_Update`, payload);
  }

  postUpdatePieceDuContrat(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update_pièce_contrat`, payload);
  }
}



