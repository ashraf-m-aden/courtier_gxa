import { HttpClient } from "@angular/common/http";
import { BaseSecurityContext } from "../BasSoapObject/BasSecurityContext";
import { BasSoapClient } from "../Model-BasSoapClient/BasSoapClient";
import { SessionStorage } from "../Model-SessionStorage/SessionStorage";
import { BasAuth } from "./BasAuth";
import { AppConfigService } from "../../Services/AppConfigService/app-config.service";
//import { SecurityContext } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { AuthService } from "../../Services/auth/auth.service";
import { inject } from "@angular/core";

export class AuthenticationHelper {

    private baseSecurityContext!: BaseSecurityContext;
    private basAuth: BasAuth;
    private authService = inject(AuthService);   // Your custom Auth API service

    constructor(private sessionStorage: SessionStorage, private httpClient: HttpClient, private basSoapClient: BasSoapClient, private appConfigService: AppConfigService) {
      this.basAuth = new BasAuth(this.basSoapClient, this.appConfigService);
    }



    public New_AuthenticateUser(username: string, password: string, domain?:string): Observable<BaseSecurityContext> {
      return this.authService.login(username, password, domain).pipe(
       map(res =>{
        console.log("HTTP RESPONSES in BASHELPER:!!!=="+JSON.stringify(res))
         this.baseSecurityContext =res

       this.sessionStorage.Set(this.sessionStorage.SESSION_ID_TOKEN, this.baseSecurityContext.SessionId);
       this.sessionStorage.Set(this.sessionStorage.SESSION_AUTHENTICATED, String(this.baseSecurityContext.IsAuthenticated));
       this.sessionStorage.SetContext(this.baseSecurityContext);
       return this.baseSecurityContext
     }
     ),catchError((error: Error) => {
      return throwError(() => error);
    }) );
     }

    public async LogOut(): Promise<void>
    {
      let baseSecurityContext: BaseSecurityContext = this.sessionStorage.GetContext();
      if (baseSecurityContext.SessionId != undefined && baseSecurityContext.SessionId != null && baseSecurityContext.SessionId != "" && baseSecurityContext.SessionId != "null") {
        await this.basAuth.CloseSession(baseSecurityContext);
      }
      this.sessionStorage.Clear();
    }

    //Method For Restoring the token values to session storage service — — -//
    private SetSessionToken(): void {
      let baseSecurityContext: BaseSecurityContext = this.sessionStorage.GetContext();
      if (baseSecurityContext.SessionId != undefined && baseSecurityContext.SessionId != null && baseSecurityContext.SessionId != "" && baseSecurityContext.SessionId != "null") {
        this.sessionStorage.Set(this.sessionStorage.SESSION_ID_TOKEN, this.baseSecurityContext.SessionId);
        this.sessionStorage.Set(this.sessionStorage.SESSION_AUTHENTICATED, String(this.baseSecurityContext.IsAuthenticated));
      } else {

        baseSecurityContext = this.getSecurityContext;
        this.sessionStorage.Set(this.sessionStorage.SESSION_ID_TOKEN, this.baseSecurityContext.SessionId);
        this.sessionStorage.Set(this.sessionStorage.SESSION_AUTHENTICATED, String(this.baseSecurityContext.IsAuthenticated));
      }
      this.sessionStorage.SetContext(baseSecurityContext)
    }
    //Method for getting access token from session model
    public get getSecurityContext(): BaseSecurityContext {
      let accessToken;
      accessToken = this.sessionStorage.GetContext();
      return accessToken;
    }

    public  ClearSessions(): void {
      this.sessionStorage.Clear();
    }

    public SessionsIsEmpty(): boolean
    {
      return !this.sessionStorage.TokenExists();
    }

    //Method for checking login state from auth guard
    async LoginState(): Promise<boolean> {
      let _baseSecurityContext: BaseSecurityContext = this.sessionStorage.GetContext();
      if (_baseSecurityContext.IsAuthenticated)
      {
        try {
          let result = await this.basAuth.CheckSession(_baseSecurityContext);
          return result;
        }
        catch (error) {
          this.sessionStorage.Clear();
          return false;
        }
      }
      else
      {
        this.sessionStorage.Clear();
        return false;
      }
    }

  }
