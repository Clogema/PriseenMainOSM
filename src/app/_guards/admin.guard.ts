import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { User } from "../_models";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const user: User = JSON.parse(localStorage.getItem("currentUser"));

    if (user.role === "ADMIN") {
      return true;
    } else {
      // Not an admin
      this.router.navigate(["/quick"]);
      return false;
    }
  }
}
