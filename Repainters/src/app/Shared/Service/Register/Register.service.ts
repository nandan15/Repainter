import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { Observable } from "rxjs";
import { RegisterModel } from "../../models/register";
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl: string = environment.backend.baseURL;
  private registerUrl = this.baseUrl + "api/Authenticate/register";

  constructor(private httpClient: HttpClient) { }

  register(registerData: RegisterModel): Observable<any> {
    return this.httpClient.post(this.registerUrl, registerData);
  }
}