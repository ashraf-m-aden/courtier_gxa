import { AuthenticationHelper } from '../../Model/Model-BasAuth/BasAuthHelper';
import { BasSoapClient } from '../../Model/Model-BasSoapClient/BasSoapClient';
import { SessionStorage } from '../../Model/Model-SessionStorage/SessionStorage';
//import { login } from '../../store/features/auth/auth.actions';
import { AppConfigService } from '../AppConfigService/app-config.service';
import { BasSecurityContext } from '../../Model/BasSoapObject/BasSecurityContext';
import { BasAction } from '../../Model/Model-BasAction/BasAction';
import { BasParams } from '../../Model/BasSoapObject/BasParams';
import { DataAccessService } from '../data-access.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { CourtierService } from '../courtier/courtier.service';
//import { select, Store } from '@ngrx/store';
//import { AuthState } from '../../store/features/auth/auth.state';
//import { toSignal } from '@angular/core/rxjs-interop';


@Injectable({ providedIn: 'root' })
export class AuthService {
  // private store =  inject<Store<AuthState>>(Store);
  private sessionStorage: SessionStorage;
  public isLoading$!: Observable<boolean>;
  // baseUrl = "http://ec2-51-44-168-49.eu-west-3.compute.amazonaws.com:3000/api"
  baseUrl = "http://localhost:3000/api"

  private _basAction: BasAction;
  constructor(private courtierService: CourtierService, private http: HttpClient, private basSoapClient: BasSoapClient, private appConfigService: AppConfigService) {
    this.sessionStorage = new SessionStorage();
    this.isLoading$ = of(false)
    this._basAction = new BasAction(this.basSoapClient, this.http, this.appConfigService);
  }

  setHeader() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest')
  }
  // _login(login: string, password: string): Observable<any> {
  // return this.http.post(`${this.baseUrl}/auth/login`, { login, password });
  // }

  // _logout(): Observable<any> {
  // return this.http.post(`${this.baseUrl}/auth/logout`, {});
  // }
  getUserProfile(login: string, domain: string) {
    let actionName: string = "Xtlog_Get";
    console.log("Debut fonction Xtlog_Get-profile() .....:")
    let basParams = new BasParams();
    let body = {
      login: login,
      domain: domain,
      BasSecurityContext: JSON.parse(sessionStorage.getItem("BasSecurityContext")!),

    }
    return this.courtierService.getProfil(body)

  }

  getProfileile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/me`);
  }

  login(login: string, password: string, domain?: string): Observable<BasSecurityContext> {
    this.isLoading$ = of(true)
    console.log("FROM authService.login After .... this.isLoading$=of(true) ")
    return this.http.post<BasSecurityContext>(`${this.baseUrl}/login`, { login, password, domain }).pipe(
      map((response: BasSecurityContext) => {
        console.log("FROM authService.login .New_AuthenticateUser .... response== " + response.SessionId)
        //  user: response.SessionId,
        return response
      }), catchError((error: string | undefined) => {
        return throwError(() => new Error(error))
      }
      ))
  }

  //   login(login: string, password: string, domain?:string): Observable<BasSecurityContext> {
  //   this.isLoading$=of(true)
  //   console.log("FROM authService.login After .... this.isLoading$=of(true) ")
  //   return this._authenticationHelper.New_AuthenticateUser(login, password, domain).pipe(
  //     map((response: BasSecurityContext) => {
  //       console.log("FROM authService.login .New_AuthenticateUser .... response== "+response.GetSessionId)
  //     //  user: response.SessionId,
  //      return response
  //     }),catchError((error: string | undefined) => {
  //       return throwError(() => new Error(error))
  //     }
  //   ))
  // }

  logout() {
    sessionStorage.removeItem("BasSecurityContext");
    localStorage.removeItem("BasSecurityContext");
  }
}
