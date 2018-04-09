import { Component, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ValidationService } from "./../validation.service";

@Component({
  selector: "app-control-message",
  template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`,
  styleUrls: ["./control-message.component.css"]
})
export class ControlMessageComponent {
  @Input() control: FormControl;
  constructor() {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
