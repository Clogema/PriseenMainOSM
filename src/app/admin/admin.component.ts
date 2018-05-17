import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services";
import { User } from "../_models";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  users:User[];
  
  constructor(private user:UserService) {
    this.users = [];
  }

  ngOnInit() {
    this.getUsersToValidate();
  }

  getUsersToValidate(){
    this.user.getUsersToValidate().subscribe((response:User[])=>{
      console.log(response);
      this.users = response;
    });
  }
}
