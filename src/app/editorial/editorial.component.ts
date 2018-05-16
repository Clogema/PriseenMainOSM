import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthenticationService } from "../_services";
import { User } from "../_models";

@Component({
  selector: "app-editorial",
  templateUrl: "./editorial.component.html",
  styleUrls: ["./editorial.component.css"]
})
export class EditorialComponent implements OnInit {
  public user: User;
  testimony: any = {};
  error = "";

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.testimony.longitude = "43.2853647";
    this.testimony.latitude = "5.4535821";
  }

  ngOnInit() {}

  getTestimony() {
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/x-www-form-urlencoded");

    let form_data = "";

    const data = {
      title: this.testimony.title,
      description: this.testimony.description,
      longitude: this.testimony.longitude,
      latitude: this.testimony.latitude,
      username: this.user.username,
      url: "http://localhost/img.png",
    };

    // tslint:disable-next-line:forin
    for (const key in data) {
      form_data += key + "=" + data[key] + "&";
    }

    form_data = form_data.substring(0, form_data.length - 1);
    let body = new HttpParams();
    body.set("title", this.testimony.title);
    body.set("description", this.testimony.description);
    body.set("longitude", this.testimony.longitude);
    body.set("latitude", this.testimony.latitude);
    body.set("username", this.user.username);
    body.set("url", "http://localhost/img.png");
    
    console.log(body.toString());

    return this.http
      .post(
        "http://localhost/oauth/examples/public/api.php/editorial/add",
        data, {params:body},
      )
      .subscribe((response: any) => {
        console.log("ET DONC ?");
        if (response.testimony){
          this.error = "Et alors ?"
        } else {
          this.error = "Erreur lors de l'ajout du témoignage";
        }
      });
  }
}
