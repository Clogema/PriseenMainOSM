import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/x-www-form-urlencoded");

    var form_data = "";

    let data = {
      "grant_type": 'client_credentials',
      "username": username,
      "password": password,
      "client_id": username,
      "client_secret": password,
      "scope": 'basic email',
    };

    for (var key in data) {
      form_data += key + "=" + data[key] + "&";
    }

    form_data = form_data.substring(0, form_data.length - 1);

    return this.http
      .post("http://localhost/oauth/examples/public/client_credentials.php/access_token", encodeURI(form_data), { headers: { "Content-type": "application/x-www-form-urlencoded" } })
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        console.info(response);
        const token = response && response.access_token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ username: username, token: token })
          );

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
