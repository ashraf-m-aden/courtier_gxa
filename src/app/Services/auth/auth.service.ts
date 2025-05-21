import { AuthenticationHelper } from '../../Model/Model-BasAuth/BasAuthHelper';
import { BasSoapClient } from '../../Model/Model-BasSoapClient/BasSoapClient';
import { SessionStorage } from '../../Model/Model-SessionStorage/SessionStorage';
//import { login } from '../../store/features/auth/auth.actions';
import { AppConfigService } from '../AppConfigService/app-config.service';
import { BasSecurityContext } from '../../Model/BasSoapObject/BasSecurityContext';
import { BasAction } from '../../Model/Model-BasAction/BasAction';
import { BasParams } from '../../Model/BasSoapObject/BasParams';
import { DataAccessService } from '../data-access.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
//import { select, Store } from '@ngrx/store';
//import { AuthState } from '../../store/features/auth/auth.state';
//import { toSignal } from '@angular/core/rxjs-interop';


@Injectable({ providedIn: 'root' })
export class AuthService {
 // private store =  inject<Store<AuthState>>(Store);
    private _authenticationHelper: AuthenticationHelper;
    private sessionStorage: SessionStorage;
    public isLoading$!: Observable<boolean>;
    baseUrl: any;
  private _basAction: BasAction;
  constructor(private da:DataAccessService,private http: HttpClient,private basSoapClient: BasSoapClient,  private appConfigService: AppConfigService ) {
    this.sessionStorage = new SessionStorage();
    this.isLoading$=of(false)
     this._basAction = new BasAction(this.basSoapClient, this.http, this.appConfigService);
      this._authenticationHelper = new AuthenticationHelper(this.sessionStorage, this.http, this.basSoapClient, this.appConfigService);
    }

 // _login(username: string, password: string): Observable<any> {
   // return this.http.post(`${this.baseUrl}/auth/login`, { username, password });
 // }

 // _logout(): Observable<any> {
   // return this.http.post(`${this.baseUrl}/auth/logout`, {});
 // }
 getUserProfile(username: string, domain: string) {
  let actionName: string = "Xtlog_Get";
  console.log("Debut fonction Xtlog_Get-profile() .....:")
  let basParams = new BasParams();
  basParams.AddStr('login', username);
  basParams.AddStr('domain', domain);
return this.da.getUserProfile(username,domain)
  return this._basAction.New_RunAction(actionName, basParams, this._authenticationHelper.getSecurityContext).pipe(map((res: string)=>{
  console.log("RESULTAT........:"+ res)
      return this._basAction.parseToJsonobj(res, "xtlog")

  }))
}

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/me`);
  }

  login(username: string, password: string, domain?:string): Observable<BasSecurityContext> {
    this.isLoading$=of(true)
    console.log("FROM authService.login After .... this.isLoading$=of(true) ")
    return this._authenticationHelper.New_AuthenticateUser(username, password, domain).pipe(
      map((response: BasSecurityContext) => {
        console.log("FROM authService.login .New_AuthenticateUser .... response== "+response.GetSessionId)
      //  user: response.SessionId,
       return response
      }),catchError((error: string | undefined) => {
        return throwError(() => new Error(error))
      }
    ))
  }

  logout(){
    this._authenticationHelper.LogOut()
  }
}
