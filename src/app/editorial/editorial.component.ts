import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthenticationService, EditorialService } from "../_services";
import { User } from "../_models";
import { Router } from "@angular/router";

@Component({
  selector: "app-editorial",
  templateUrl: "./editorial.component.html",
  styleUrls: ["./editorial.component.css"]
})
export class EditorialComponent implements OnInit {
  public user: User;
  testimony: any = {};
  error = "";

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private editorial: EditorialService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.testimony.longitude = "43.2853647";
    this.testimony.latitude = "5.4535821";
  }

  ngOnInit() {}

  getTestimony() {
    console.log("getTestimony");
    this.editorial.post(this.testimony).subscribe(
      (response: boolean) => {
        if (response) {
          this.router.navigate(["/quick"]);
        } else {
          this.error = "Erreur lors de l'ajout du témoignage";
        }
      },
      error => {
        console.error(error);
        this.error = "Erreur lors de l'ajout du témoignage";
      }
    );
  }
}
