import { Component } from "@angular/core";
import { Router, Routes } from "@angular/router";

import { FormBuilder, Validators } from "@angular/forms";
import { ControlMessageComponent } from "../control-message/control-message.component";
import { ValidationService } from "./../validation.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  userForm: any;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.userForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, ValidationService.passwordValidator]]
    });
  }

  connectUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      if (
        this.userForm.value.username == "Lisa" &&
        this.userForm.value.password == "pouet5"
      ) {
        alert("Lisa est connectée");
        this.router.navigate(["/quick", { connect: true }]);
      }
    }
  }
}
