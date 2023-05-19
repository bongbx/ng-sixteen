// custom-validator.directive.ts
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

function customValidatorsFactory(
  validatorFns: ((value: any) => any)[]
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const results = validatorFns.map((fn) => fn(control.value));
    if (results.every((x) => x === true)) {
      return null;
    }

    const validatorError = results.reduce((obj, item, i) => {
      if (item !== true) {
        obj[`custom_${i}`] = item;
      }
      return obj;
    }, {});

    return validatorError;
  };
}

@Directive({
  selector: '[appValidatorRules]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidatorRulesDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class ValidatorRulesDirective implements Validator, OnChanges {
  @Input('appValidatorRules') validatorFns: ((value: any) => any)[] = [];

  private onChange!: () => void;
  private validator!: ValidatorFn;
  private errorMessagesContainer: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.errorMessagesContainer = this.renderer.createElement('div');
    this.renderer.addClass(this.errorMessagesContainer, 'error-messages-container');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('validatorFns' in changes) {
      this.validator = customValidatorsFactory(this.validatorFns);
      if (this.onChange) {
        this.onChange();
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const result = this.validator(control);
    if (result && control.dirty) {
      this.renderer.setProperty(this.errorMessagesContainer, 'innerHTML', ''); // Clear previous messages

      for (const errorMessage of Object.values(result)) {
        const errorMessageDiv = this.renderer.createElement('div');
        this.renderer.addClass(errorMessageDiv, 'error-message');
        this.renderer.setProperty(errorMessageDiv, 'textContent', errorMessage);
        this.renderer.setProperty(errorMessageDiv, 'title', errorMessage);
        this.renderer.appendChild(this.errorMessagesContainer, errorMessageDiv);
      }

      this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorMessagesContainer);
    } else {
      this.renderer.removeChild(this.el.nativeElement.parentNode, this.errorMessagesContainer);
    }
    return result;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }
}
