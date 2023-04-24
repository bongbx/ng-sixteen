import { AbstractControl, ValidationErrors } from "@angular/forms";
import { MAX_NUMBER } from "../common";

export const maxNumberValidate = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    if (control.value > MAX_NUMBER) {
      control.markAsDirty();
      return { overMaxValue: true };
    }
    return null;
  }