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

  validateUser(user:User){
    this.user.validate(user).subscribe((response:any) => {
      console.log(response);
      if (response.status == "success"){
        this.users = this.users.filter(x => (x.id != user.id));
      }
    });
  }

  deleteUser(user:User){
    this.user.delete(user).subscribe((response: any) => {
      console.log(response);
      if (response.status == "success") {
        this.users = this.users.filter(x => (x.id != user.id));
      }
    });
  }

  getUsersToValidate(){
    this.user.getUsersToValidate().subscribe((response:User[])=>{
      console.log("Getting users...");
      this.users = response;
    });
  }
}
