import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService, UserService } from "../_services";
import { User } from "../_models";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  public user: User;
  newuser: User = new User();
  error = "";

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {}

  signup() {
    console.log("Signup called");
    const data = {
      username: this.newuser.username,
      password: this.newuser.password,
      email: this.newuser.email,
      firstname: this.newuser.firstname,
      lastname: this.newuser.lastname
    };
  }
}
