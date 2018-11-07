import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { AuthenticationService } from "../_services/index";
import { switchMap } from "rxjs/operators";

@Component({
  moduleId: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = "";
  errMsg = "";

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // reset login status
    // this.authenticationService.logout();
    this.route.params.subscribe(
      (e) => {
        if (e.msg){
          this.errMsg = e.msg;
        }
      }
    );
  }

  login() {
    this.loading = true;
    this.authenticationService
      .login(this.model.username, this.model.password)
      .subscribe(
        (result: boolean) => {
          if (result === true) {
            // login successful
            this.authenticationService.getUser(this.model.username);
            // this.router.navigate([""]);
            // window.location.href = "/quick";
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
