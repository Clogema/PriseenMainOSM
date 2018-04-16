import { Component } from "@angular/core";

import { FormBuilder, Validators } from "@angular/forms";
import { ControlMessageComponent } from "../control-message/control-message.component";
import { ValidationService } from "./../validation.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent {
  userForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", Validators.required],
      email: ["", [Validators.required, ValidationService.emailValidator]],
      password: ["", [Validators.required, ValidationService.passwordValidator]]
    });
  }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      alert(
        `Name : ${this.userForm.value.firstname} Email: ${
          this.userForm.value.email
        }`
      );
    }
  }
}
