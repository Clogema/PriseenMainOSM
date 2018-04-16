import { Component } from "@angular/core";

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

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      birthdate: ["", Validators.required],
      email: ["", [Validators.required, ValidationService.emailValidator]],
      password: ["", [Validators.required, ValidationService.passwordValidator]]
    });
  }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      alert(
        `Name : ${this.userForm.value.name} Email: ${this.userForm.value.email}`
      );
    }
  }
}
