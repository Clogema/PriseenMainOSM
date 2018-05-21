import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../_services/index";

@Component({
  moduleId: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = "";

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService
      .login(this.model.username, this.model.password)
      .subscribe(
        (result: boolean) => {
          console.log(result);
          if (result === true) {
            // login successful
            this.authenticationService.getUser(this.model.username);
            this.router.navigate(["/quick"]);
          } else {
            // login failed
            this.error = "Username ou mot de passe incorrect";
            this.loading = false;
          }
        },
        error => {
          console.error(error);
          this.error = "Username ou mot de passe incorrect";
          this.loading = false;
        }
      );
  }
}
