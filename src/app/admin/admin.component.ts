import { Component, OnInit } from "@angular/core";
import { UserService, EditorialService } from "../_services";
import { User, Testimony } from "../_models";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  users: User[];
  testimonies: any;

  error = "";
  success = "";

  constructor(private user: UserService, private editorial: EditorialService) {
    this.users = [];
    this.testimonies = [];
  }

  ngOnInit() {
    this.getUsersToValidate();
    this.getTestimoniesToValidate();
  }

  validateTestimony(testimony: any) {
    this.editorial.validate(testimony).subscribe((response: any) => {
      if (response.status === "success") {
        this.success = "Témoignage validé avec succès";
        this.testimonies = this.testimonies.filter(
          x => x.id_testimony !== testimony.id_testimony
        );
      } else {
        this.error = "Echec de la validation du témoignage";
      }
    });
  }

  deleteTestimony(testimony: any) {
    this.editorial.delete(testimony).subscribe((response: any) => {
      if (response.status === "success") {
        this.testimonies = this.testimonies.filter(
          x => x.id_testimony !== testimony.id_testimony
        );
        this.success = "Témoignage supprimé avec succès";
      } else {
        this.error = "Echec de la suppression du témoignage";
      }
    });
  }

  getTestimoniesToValidate() {
    this.editorial
      .getTestimoniesToValidate()
      .subscribe((response: Testimony[]) => {
        this.testimonies = response;
      });
  }

  validateUser(user: User) {
    this.user.validate(user).subscribe((response: any) => {
      if (response.status === "success") {
        this.success = "Utilisateur validé avec succès";
        this.users = this.users.filter(x => x.id !== user.id);
      } else {
        this.error = "Echec de la validation de l'utilisateur";
      }
    });
  }

  deleteUser(user: User) {
    this.user.delete(user).subscribe((response: any) => {
      if (response.status === "success") {
        this.users = this.users.filter(x => x.id !== user.id);
        this.success = "Utilisateur supprimé avec succès";
      } else {
        this.error = "Echec de la suppression de l'utilisateur";
      }
    });
  }

  getUsersToValidate() {
    this.user.getUsersToValidate().subscribe((response: User[]) => {
      console.log("Getting users...");
      this.users = response;
    });
  }
}
