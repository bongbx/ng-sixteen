import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector: 'app-filter-layout',
    templateUrl: './filter-layout.component.html',
    styleUrls: ['./filter-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NzButtonModule,
        NzWaveModule,
        TranslateModule,
    ],
})
export class FilterLayoutComponent {
  @Input() submitTitle = 'TABLE.FILTERS.SEARCH';
  @Input() clearTitle = 'TABLE.FILTERS.CLEAR';

  @Output() readonly submitFilter = new EventEmitter<void>();
  @Output() readonly clearFilter = new EventEmitter<void>();

  onSubmit(): void {
    this.submitFilter.emit();
  }
  onClear(): void {
    this.clearFilter.emit();
  }
}
