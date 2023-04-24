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

export function customValidatorsFactory(
  validatorFn: ((value: any) => any)[]
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const results = validatorFn.map((fn) => fn(control.value));
    if (results.every((x) => x === true)) {
      return null;
    }

    const validatorError = results.reduce((obj, item, i) => {
      obj[i] = item;
      return obj;
    }, {});
    return validatorError;
  };
}

export function customValidatorFactory(
  validatorFn: (value: any) => any
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = validatorFn(control.value);
    return result === true ? null : { custom: result };
  };
}

@Directive({
  selector: '[appCustomValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class CustomValidatorDirective implements Validator, OnChanges {
  @Input('appCustomValidator') rules!: ((value: any) => any)[];

  private onChange!: () => void;
  private validator!: ValidatorFn;
  private errorMessage: HTMLElement | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.errorMessage = this.renderer.createElement('div');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('rules' in changes) {
      this.validator = customValidatorsFactory(this.rules);
      if (this.onChange) {
        this.onChange();
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const result = this.validator && this.validator(control);
    if (
      result &&
      Object.values(result).some((x: any) => x != true) &&
      control.dirty
    ) {
      for (const key in result) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
          const element = result[key];
          if (element !== true) {
            if (
              !this.errorMessage?.querySelector(`[data-error="${element}"]`)
            ) {
              const errorContent = document.createElement('div');
              errorContent.textContent = element;
              errorContent.style.color = 'red';
              errorContent.style.whiteSpace = 'nowrap';
              errorContent.style.overflow = 'hidden';
              errorContent.style.textOverflow = 'ellipsis';
              errorContent.setAttribute('data-error', element);
              this.renderer.appendChild(this.errorMessage, errorContent);
            }
          } else {
            if (this.errorMessage?.querySelector(`[data-error="${element}"]`)) {
              this.renderer.removeChild(
                this.errorMessage,
                this.errorMessage?.querySelector(`[data-error="${element}"]`)
              );
            }
          }
        }
      }
      this.renderer.appendChild(
        this.el.nativeElement.parentNode.parentNode.parentNode,
        this.errorMessage
      );
    } else {
      this.renderer.removeChild(
        this.el.nativeElement.parentNode.parentNode.parentNode,
        this.errorMessage
      );
      this.errorMessage = this.renderer.createElement('div');
    }
    return result;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }
}
