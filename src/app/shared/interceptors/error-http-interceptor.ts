import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, catchError, of, throwError } from "rxjs";


@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor{

    constructor(private router : Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(request.url.endsWith ("login") || request.url.endsWith ("changepassword") || request.url.endsWith ("setnewpassword")){
            return next.handle(request);
        }

        return next.handle(this.addBearer(request)).pipe(
            catchError((error:HttpErrorResponse) => {
                if(error && error.status == 401){
                    this.router.navigateByUrl('');
                }
                return throwError(() => new Error(error.message));
            })
        )
    }

    private addBearer(request : HttpRequest<any>):HttpRequest<any>{
        return request.clone({
            setHeaders : {
                Authorization : `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
    }
}
