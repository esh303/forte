import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
@Component({
  selector: 'app-error-message',
  template: `<span *ngIf="errorMessage !== null" style="color:red;">{{errorMessage}}</span>`
/*style="color:red; padding: 5px; border-radius: 20px; background: rgba(12, 12, 12, 0.36);"*/
})
export class ErrorMessageComponent {
  @Input() control: FormControl = new FormControl;
  constructor() { }
  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
