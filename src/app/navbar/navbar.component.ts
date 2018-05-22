import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  currentUser: any = null;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // console.log("USER = " + this.currentUser.username);
    console.log("JE PASSE ICI");
  }
}
