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
  AsyncValidator,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, debounceTime, forkJoin, from, map, of, tap } from 'rxjs';

function customValidatorsFactory(
  validatorFns: ((value: any) => (string | true) | Observable<string | true>)[]
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> => {
    const validatorFns$ = validatorFns.map((fn) => {
      const $fn = fn(control.value);
      return $fn instanceof Observable ? $fn : of($fn);
    });

    return forkJoin(validatorFns$).pipe(
      map((results) => {
        if (results.every((x) => x === true)) {
          return null;
        }

        const validatorError = results.reduce((obj, item, i) => {
          if (item !== true) {
            obj[`custom_${i}`] = item;
          }
          return obj;
        }, <Record<string, any>>{});

        return validatorError;
      })
    );
  };
}

@Directive({
  selector: '[appValidatorRules]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidatorRulesDirective,
      multi: true,
    },
  ],
  standalone: true,
})
export class ValidatorRulesDirective implements AsyncValidator, OnChanges {
  @Input('appValidatorRules') validatorFns: ((
    value: any
  ) => (string | true) | Observable<string | true>)[] = [];

  private onChange!: () => void;
  private validator!: AsyncValidatorFn;
  private errorMessagesContainer: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.errorMessagesContainer = this.renderer.createElement('div');
    this.renderer.addClass(
      this.errorMessagesContainer,
      'error-messages-container'
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('validatorFns' in changes) {
      this.validator = customValidatorsFactory(this.validatorFns);
      if (this.onChange) {
        this.onChange();
      }
    }
  }

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    if (!this.validator) {
      return of();
    }

    const result = this.validator(control);
    const result$ = result instanceof Observable ? result : from(result);
    return result$.pipe(
      debounceTime(100),
      tap((validateResult) => {
        if (validateResult && control.dirty) {
          this.renderer.setProperty(
            this.errorMessagesContainer,
            'innerHTML',
            ''
          ); // Clear previous messages
          for (const errorMessage of Object.values(validateResult)) {
            const errorMessageDiv = this.renderer.createElement('div');
            this.renderer.addClass(errorMessageDiv, 'error-message');
            this.renderer.setProperty(
              errorMessageDiv,
              'textContent',
              errorMessage
            );
            this.renderer.setProperty(errorMessageDiv, 'title', errorMessage);
            this.renderer.appendChild(
              this.errorMessagesContainer,
              errorMessageDiv
            );
          }
          this.renderer.appendChild(
            this.el.nativeElement.parentNode,
            this.errorMessagesContainer
          );
        } else {
          this.renderer.removeChild(
            this.el.nativeElement.parentNode,
            this.errorMessagesContainer
          );
        }
      })
    );
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }
}
