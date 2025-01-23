import { Injectable } from "@angular/core";
import { LoginService } from "../Service/Login/login.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {Base64} from 'js-base64';
import {Login,ParsedAccessToken,token} from "../models/login";
@Injectable({
    providedIn: 'root'
})
export class LoginProvider{
    get  isUserLoggedIn(){
        return localStorage.getItem("LoggedIn")==="True";
    }
    get isAdmin(){
        return localStorage.getItem("Role")==="User";
    }
    constructor(private loginService:LoginService,
        private router:Router,
        private toaster:ToastrService
    ){}
    login(username:string,password:string){
        let userLogin:Login=new Login();
        userLogin.username=username;
        userLogin.password=password;

        this.loginService.login(userLogin).subscribe((data: token) => {
            const parsedToken = this.getParsedToken(data.token);
            this.toaster.success("Logged In Successfully", "Success");
            localStorage.setItem("Token", data.token);
            localStorage.setItem("LoggedIn", "True");
            localStorage.setItem("User", JSON.stringify(parsedToken));
            localStorage.setItem("Role", data.role);
            localStorage.setItem("TokenType", "bearer");
            localStorage.setItem("Expiration", data.expiration);

            console.log("Navigating to /dashboard/dashboard");
            this.router.navigate(["/dashboard/dashboard"]);
        });
    }
    public getParsedToken(token: string): ParsedAccessToken {
        return this.getPayloadJson(token);
    }

    public getPayloadJson(token: string): ParsedAccessToken {
        return JSON.parse(Base64.decode(token.split('.')[1]));
    }
}