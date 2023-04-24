import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { TableModule } from 'src/app/shared';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomValidatorDirective } from 'src/app/core/directive/validator-rule.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [
    WelcomeRoutingModule,
    CommonModule,
    TableModule,
    TranslateModule,
    CustomValidatorDirective,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
