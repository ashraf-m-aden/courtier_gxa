import { Observable, tap, map, catchError, throwError } from "rxjs";
import { AppConfigService } from "../../Services/AppConfigService/app-config.service";
import { BasAppInfo } from "../BasSoapObject/BasAppInfo";
import { BaseSecurityContext } from "../BasSoapObject/BasSecurityContext";
import { BasSysInfo } from "../BasSoapObject/BasSysInfo";
import { BasSoapClient } from "../Model-BasSoapClient/BasSoapClient";

export class BasAuth {

    constructor(private BasSoapCLient: BasSoapClient, private appConfigService: AppConfigService) { }

    async OpenSession(BasLogin: string, BasPassword: string): Promise<BaseSecurityContext> {
        let body = `<ns1:OpenSession><logon xsi:type="xsd:string">${BasLogin}</logon><password xsi:type="xsd:string">${BasPassword}</password></ns1:OpenSession>`;
        let result: string = await this.BasSoapCLient.SoapRequest(this.appConfigService.GetURlAuthService(), body);
        let baseSecurityContext = new BaseSecurityContext();
        console.log("Rettour de l'API du LOGIN Direct...."+ result )
        console.log("=================================================================...." )
        console.log("Rettour de l'API du LOGIN avec JSON.stringify(...."+ JSON.stringify(result) )
        baseSecurityContext.LoadFromXml(result);
        return baseSecurityContext;
    }

    New_OpenSession(BasLogin: string, BasPassword: string, BasDomain?:string): Observable<BaseSecurityContext> {
        const body = `<ns1:OpenSession><logon xsi:type="xsd:string">${BasLogin}</logon><password xsi:type="xsd:string">${BasPassword}</password><domain xsi:type="xsd:string">${BasDomain}</domain></ns1:OpenSession>`;

        return this.BasSoapCLient.New_SoapRequest(this.appConfigService.GetURlAuthService(), body).pipe(
            map(result => {
                const baseSecurityContext = new BaseSecurityContext();
                baseSecurityContext.LoadFromXml(result);
                return baseSecurityContext;
            }),
            catchError((error: Error) => {
              return throwError(() => error);
            })
        );
    }

    async CloseSession(baseSecurityContext: BaseSecurityContext): Promise<void> {
        let body = "<ns1:CloseSession>" + baseSecurityContext.ToSoapVar() + "</ns1:CloseSession>";
         await this.BasSoapCLient.SoapVoidRequest(this.appConfigService.GetURlAuthService(), body);
        baseSecurityContext.Clean();
    }

    async CheckSession(baseSecurityContext: BaseSecurityContext): Promise<boolean> {
        let body = "<ns1:CheckSession>" + baseSecurityContext.ToSoapVar() + "</ns1:CheckSession>";
        await this.BasSoapCLient.SoapVoidRequest(this.appConfigService.GetURlAuthService(), body);
        return true
    }

    async Echo(message: string): Promise<string> {
        let body = `<ns1:Echo><message xsi:type="xsd:string">${message}</message></ns1:Echo>`;
        let result: string = await this.BasSoapCLient.SoapRequest(this.appConfigService.GetURlAuthService(), body);
        return result;
    }

    async GetAppInfo(baseSecurityContext: BaseSecurityContext): Promise<string> {
        let body = "<ns1:GetAppInfo>" + baseSecurityContext.ToSoapVar() + "</ns1:GetAppInfo>";
        let result: string = await this.BasSoapCLient.SoapRequest(this.appConfigService.GetURlAuthService(), body);
        let basAppInfo = new BasAppInfo();
        basAppInfo.LoadFromXml(result)
        return basAppInfo.ToString();
    }

    async GetSysInfo(): Promise<string> {
        let result: string = await this.BasSoapCLient.SoapRequest(this.appConfigService.GetURlAuthService(), "<ns1:GetSysInfo/>");
        let basSysInfo = new BasSysInfo();
        basSysInfo.LoadFromXml(result)
        return basSysInfo.ToString();
    }

}
