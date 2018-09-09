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
  public newuser: User;
  error = "";
  success = "";
  public displayForm:Boolean = true;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    this.newuser = new User();
  }

  ngOnInit() { }

  signup() {
    return this.userService.signup(this.newuser).subscribe((response: any) => {
      if (response.status == "success") {
        this.success = "Inscription réussie ! Veuillez attendre la validation de votre compte par un administrateur";
        this.displayForm = false;
      } else if (response.msg) {
        this.error = response.msg
      } else {
        this.error = "Erreur lors de l'inscription, veuillez réessayer";
      }
    }, (error) => {
      console.error(error);
    });
  }
}
