import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { AuthenticationService } from "../_services/index";
import { User } from "../_models/index";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getUsers(): Observable<Response> {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + this.authenticationService.token);
    
    let opts = new RequestOptions();
    opts.headers = headers;

    // get users from api
    return this.http
      .get("http://localhost/oauth/examples/public/api.php/users")
      .map((response: Response) => response);
  }
}
