import { Injectable } from "@angular/core";
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class EditorialService {

    constructor(private http: HttpClient, private auth: AuthenticationService) {
    }

    post(){

    }

    get() : any{
        return this.http.get("http://localhost/oauth/examples/public/editorial/get.php").subscribe((response:any) => {
            return response;
        });
    }
}
