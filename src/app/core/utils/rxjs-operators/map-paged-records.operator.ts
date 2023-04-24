import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedModel } from '../../models';

export function mapPagedRecords<SourceRecord, TargetRecord>(
  mapper: (records: SourceRecord[]) => TargetRecord[],
): (
  source$: Observable<PagedModel<SourceRecord>>,
) => Observable<PagedModel<TargetRecord>> {
  return source$ =>
    source$.pipe(
      map<PagedModel<SourceRecord>, PagedModel<TargetRecord>>(result => ({
        Data: mapper(result.Data),
        Total: result.Total,
      })),
    );
}
