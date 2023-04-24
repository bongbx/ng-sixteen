import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function someTrue<DataType>(): (
  source$: Observable<DataType[]>,
) => Observable<boolean> {
  return source$ =>
    source$.pipe(
      map<DataType[], boolean>(items => items.some(item => !!item)),
    );
}
