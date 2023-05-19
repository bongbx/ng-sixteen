import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { TableModule } from 'src/app/shared';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ValidatorRulesDirective } from 'src/app/core/directive/validation-rule.directive';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  imports: [
    WelcomeRoutingModule,
    CommonModule,
    TableModule,
    TranslateModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    ValidatorRulesDirective,
    NzSelectModule,
    NzInputNumberModule,
    NzDatePickerModule,
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
