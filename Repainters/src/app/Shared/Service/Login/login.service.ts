import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { Observable } from "rxjs";
import { Login, token } from "../../models/login";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loginMethod: string;
    
    constructor(private httpClient: HttpClient) { 
        // Force HTTP protocol with full URL
        this.loginMethod = "http://localhost:7149/api/Authenticate/login";
    }
    
    public login(login: Login): Observable<token> {
        console.log('Login URL being used:', this.loginMethod);
        // Create a new HttpRequest with the explicit URL
        return this.httpClient.post<token>(this.loginMethod, login, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}