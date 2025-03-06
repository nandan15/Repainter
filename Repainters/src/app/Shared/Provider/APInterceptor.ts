import { Inject, Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class APInterceptor implements HttpInterceptor {
  static toaster: ToastrService;
  static router: Router;
  constructor(toaster: ToastrService, router: Router) {
    APInterceptor.toaster = toaster;
    APInterceptor.router = router;
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Original Request URL:', httpRequest.url);
    
    // Check if the URL contains localhost:7149 with any protocol
    if (httpRequest.url.includes('localhost:7149')) {
        // Force HTTP protocol 
        const httpUrl = httpRequest.url.replace(/^https?:\/\//, 'http://');
        
        // Create a new request with the modified URL
        const modifiedRequest = httpRequest.clone({
            url: httpUrl
        });
        
        console.log('Modified Request URL:', modifiedRequest.url);
        httpRequest = modifiedRequest;
    }
    if (localStorage.getItem('Token')) {
        return next.handle(httpRequest.clone({ 
            setHeaders: { 
                "Authorization": localStorage.getItem('TokenType') + " " + localStorage.getItem('Token') 
            } 
        })).pipe(
            catchError(this.handleError)
        );
    }
    return next.handle(httpRequest).pipe(
        catchError(this.handleError)
    );
}

  handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 403:
      case 401:
        APInterceptor.toaster.error("UnAuthorized Request", "Error", {
          timeOut: 10000,
        });
        APInterceptor.router.navigate(['/login/logout']);
        //window.location.href = '/login/logout';
        break;
      case 404:
      case 409:
        APInterceptor.toaster.error(error.error.message, "Error", {
          timeOut: 10000,
        });
        break;
      case 422:
        // console.log(Object.getOwnPropertyNames(error.error));
        Object.getOwnPropertyNames(error.error).forEach(m => {
          APInterceptor.toaster.error(error.error[m], "Error", {
            timeOut: 5000,
          });
        });
        break;
      case 500:
        APInterceptor.toaster.error("Something went wrong. Please try again later", "Error", {
          timeOut: 10000,
        });
        break;
      default:
        APInterceptor.toaster.error("Something went wrong. Please try again later", "Error", {
          timeOut: 10000,
        });
        break;
    }
    return throwError(error);
  }
}