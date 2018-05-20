import { Component, OnInit } from "@angular/core";

import { User } from "../_models/index";
import { UserService, AuthenticationService } from "../_services/index";
import { Router } from "@angular/router";

@Component({
  moduleId: "app-home",
  templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    // get users from secure api end point
    this.userService.getUsers().subscribe(
      (response: any) => {
        const users = new Array<User>();
        response.forEach((user: User) => {
          users.push(user);
        });
        this.users = users;
      },
      error => {
        console.log(error);
        this.auth.logout();
        // tslint:disable-next-line:no-unused-expression
        this.router.navigate["/login"];
      }
    );
  }
}
