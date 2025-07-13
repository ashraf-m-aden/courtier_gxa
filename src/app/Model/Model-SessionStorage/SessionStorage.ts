import { BaseSecurityContext } from "../BasSoapObject/BasSecurityContext";

export class SessionStorage {

    private _SESSION_ID_TOKEN: string = "SessionId";
    public get SESSION_ID_TOKEN(): string {
        return this._SESSION_ID_TOKEN;
    }
    public set SESSION_ID_TOKEN(value: string) {
        this._SESSION_ID_TOKEN = value;
    }
    private _SESSION_AUTHENTICATED: string = "IsAuthenticated";
    public get SESSION_AUTHENTICATED(): string {
        return this._SESSION_AUTHENTICATED;
    }
    public set SESSION_AUTHENTICATED(value: string) {
        this._SESSION_AUTHENTICATED = value;
    }
    constructor() { }

    public Set(key: string, value: string) {
        sessionStorage.setItem(key, value);
    }
    public Get(key: string): string {
        return String(sessionStorage.getItem(key));
    }
    public Remove(key: string): void {
        sessionStorage.removeItem(key);
    }
    public TokenExists(): boolean {
        return (sessionStorage.getItem(this._SESSION_ID_TOKEN) !== null);
    }
    public Clear(): void {
        sessionStorage.removeItem(this._SESSION_ID_TOKEN);
        sessionStorage.removeItem(this._SESSION_AUTHENTICATED);
    }

    public SetContext(baseSecurityContext: BaseSecurityContext): void {

        sessionStorage.setItem(this._SESSION_ID_TOKEN, baseSecurityContext.SessionId);
        sessionStorage.setItem(this._SESSION_AUTHENTICATED, String(baseSecurityContext.IsAuthenticated));
    }

    public GetContext(): BaseSecurityContext {
        let baseSecurityContext: BaseSecurityContext = new BaseSecurityContext();
        baseSecurityContext.SessionId = String(sessionStorage.getItem(this._SESSION_ID_TOKEN));
        baseSecurityContext.IsAuthenticated = Boolean(sessionStorage.getItem(this._SESSION_AUTHENTICATED));
        return baseSecurityContext;
    }
}
