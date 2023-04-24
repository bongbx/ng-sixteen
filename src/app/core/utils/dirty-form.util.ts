import { combineLatest, fromEvent, Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  finalize,
  map,
  shareReplay,
  startWith,
  tap,
} from 'rxjs/operators';
import { simpleEqual } from './object.util';

export function dirtyCheck<U>(source: Observable<U>) {
  let subscription: Subscription;
  let isDirty = false;

  return function <T>(valueChanges: Observable<T>): Observable<boolean> {
    const isDirty$ = combineLatest([source, valueChanges]).pipe(
      debounceTime(100),
      // tap(([a,b]) => console.log(a,b)),
      map(([a, b]) => (isDirty = simpleEqual(a, b) === false)),
      finalize(() => subscription.unsubscribe()),
      startWith(false),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

    subscription = fromEvent(window, 'beforeunload').subscribe(event => {
      isDirty && (event.returnValue = false);
    });

    return isDirty$;
  };
}
