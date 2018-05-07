import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from "../_services/index";
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        if (request.url.match("access_token")) {
            return next.handle(request);
        }

        request = request.clone({
            setHeaders: {
                Authorization: "Bearer " + this.auth.token,
                "Content-type": "x-www-form-urlencoded",
            }
        });
        return next.handle(request);
    }
}