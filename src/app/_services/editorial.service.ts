import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { User, Testimony } from "../_models";

@Injectable()
export class EditorialService {
  user: User;

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  upload(file: any): Observable<boolean> {
    return this.http
      .post("http://localhost/oauth/examples/public/upload.php", file)
      .map((response:any) => response.status == "success");
  }

  getTestimoniesToValidate(): Observable<Testimony[]> {
    return this.http
      .get(
        "http://localhost/oauth/examples/public/api.php/testimonies/validate"
      )
      .map((response: Testimony[]) => response);
  }

  validate(testimony: any) {
    console.log(testimony);
    return this.http
      .post(
        "http://localhost/oauth/examples/public/api.php/testimony/validate",
        { id: testimony.id_testimony }
      )
      .map((response: any) => response);
  }

  delete(testimony: any) {
    return this.http
      .post("http://localhost/oauth/examples/public/api.php/testimony/delete", {
        id: testimony.id_testimony
      })
      .map((response: any) => response);
  }

  post(testimony): Observable<boolean> {
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/x-www-form-urlencoded");

    const form_data = "";

    const data = {
      title: testimony.title,
      description: testimony.description,
      longitude: testimony.longitude,
      latitude: testimony.latitude,
      username: this.user.username,
      anonym: testimony.anonym,
      annee: testimony.date,
      url: testimony.url
    };

    return this.http
      .post(
        "http://localhost/oauth/examples/public/api.php/editorial/add",
        data,
        { headers, observe: "response" }
      )
      .map((response: any) => {
        if (response.status) {
          return true;
        } else {
          return false;
        }
      });
  }

  get(): any {
    return this.http.get(
      "http://localhost/oauth/examples/public/editorial/get.php"
    );
  }
}
