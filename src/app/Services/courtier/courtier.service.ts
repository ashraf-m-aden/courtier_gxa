import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectTiers } from "../../store/features/courtiers/courtier.selector";



@Injectable({ providedIn: 'root' })
export class CourtierService {
  private readonly baseUrl = 'https://api.gxa.com';

  constructor(private http: HttpClient, private store: Store) { }

  getDossiers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courtiers/Dossiers`);
  }

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courtiers/produits`);
  }

  getCommissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courtiers/commissions`);
  }

    getTiers(): Observable<any[]> {
      return this.store.select(selectTiers)
    }
}
