import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
  }

  ngOnInit() {}

  getTestimony() {
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/x-www-form-urlencoded");

    let form_data = "";

    const data = {
      title: this.testimony.title,
      description: this.testimony.description
    };

    // tslint:disable-next-line:forin
    for (const key in data) {
      form_data += key + "=" + data[key] + "&";
    }

    form_data = form_data.substring(0, form_data.length - 1);

    console.log(data);

    return this.http
      .post(
        "http://localhost/oauth/examples/public/api.php/editorial/add",
        encodeURI(form_data),
        { headers: { "Content-type": "application/x-www-form-urlencoded" } }
      )
      .map((response: any) => {});
  }
}
