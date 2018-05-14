import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "../_services";
import { User } from "../_models";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  public user: User;
  newuser: any = {};

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {}

  signup() {
    const headers = new HttpHeaders();
    headers.append("Content-type", "application/x-www-form-urlencoded");

    let form_data = "";

    const data = {
      username: this.newuser.username,
      password: this.newuser.password,
      email: this.newuser.email
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
