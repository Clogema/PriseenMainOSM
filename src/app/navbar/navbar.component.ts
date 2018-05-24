import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../_services";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  currentUser: any = null;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  logout() {
    this.auth.logout();
  }
}
