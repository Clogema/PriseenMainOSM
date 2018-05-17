import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { catchError, map, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../_models";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient, private router:Router) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.token = currentUser && currentUser.token;
  }

  getUser(username:string):any{
    return this.http.post("http://localhost/oauth/examples/public/api.php/user", { username: username }).subscribe((response: any) => {
      const user: User = response;
      user.token = this.token;
      if (user.id) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(user)
        );
      }
      console.log(response);
      this.router.navigate(["/"]);
      return (user.id != undefined);
    });
  }

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/x-www-form-urlencoded");

    let form_data = "";

    const data = {
      grant_type: "client_credentials",
      username: username,
      password: password,
      client_id: username,
      client_secret: password,
      scope: "basic email"
    };

    // tslint:disable-next-line:forin
    for (const key in data) {
      form_data += key + "=" + data[key] + "&";
    }

    form_data = form_data.substring(0, form_data.length - 1);

    return this.http
      .post(
        "http://localhost/oauth/examples/public/client_credentials.php/access_token",
        encodeURI(form_data),
        { headers: { "Content-type": "application/x-www-form-urlencoded" } }
      )
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        // tslint:disable-next-line:no-console
        const token = response && response.access_token;
        if (token) {
          // set token property
          this.token = token;

          /* 
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ username: username, token: token })
          ); */

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem("currentUser");
  }
}
