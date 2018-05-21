import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { AuthenticationService } from "../_services/index";
import { User } from "../_models/index";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  validate(user: User) {
    return this.http
      .post("http://localhost/oauth/examples/public/api.php/user/validate", {
        id: user.id
      })
      .map((response: any) => response);
  }

  delete(user: User) {
    return this.http
      .post("http://localhost/oauth/examples/public/api.php/user/delete", {
        id: user.id
      })
      .map((response: any) => response);
  }

  getUsers(): Observable<Response> {
    const headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + this.authenticationService.token
    );

    const opts = new RequestOptions();
    opts.headers = headers;

    // get users from api
    return this.http
      .get("http://localhost/oauth/examples/public/api.php/users")
      .map((response: Response) => response);
  }

  getUsersToValidate(): Observable<User[]> {
    return this.http
      .get("http://localhost/oauth/examples/public/api.php/users/validate")
      .map((response: User[]) => response);
  }

  signup(user:any): Observable<any> {
    return this.http
      .post("http://localhost/oauth/examples/public/register.php", user)
      .map((response: any) => { return response });
  }
}
