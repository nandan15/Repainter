import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { Observable } from "rxjs";
import { Login, token } from "../../models/login";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    baseUrl: string = environment.backend.baseURL;
    private loginMethod = this.baseUrl + "api/Authenticate/login";
    constructor(private httpClient: HttpClient) { }
    public login(login: Login): Observable<token> {
        return this.httpClient.post<token>(this.loginMethod, login);
    }
}