import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { AuthenticationService } from "../_services/index";
import { Observable } from 'rxjs/Observable';
import { tap, catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthenticationService,
        private router: Router
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.match("access_token")) {
            return next.handle(request);
        }

        if (request.url.match("upload.php")) {
            return next.handle(request);
        }

        if (request.url.match("editorial/add.php")){
            return next.handle(request);
        }

        if (request.url.match("editorial/get.php")) {
            return next.handle(request);
        }
        
        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + this.auth.token,
                "Content-type": "x-www-form-urlencoded",
            }
        });

        return next.handle(request).do((e:HttpEvent<any>) => {
            if (e instanceof HttpResponse){
                console.log(e);
            }
        }, (err: any) => {
            if (err.status == 401){
                // Token expired
                this.router.navigate(["/login",{"msg" : "La session a expiré"}]);
            }
        });
    }
}