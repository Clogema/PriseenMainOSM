import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  currentUser: any = null;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(val => {
    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
}
