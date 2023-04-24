import { ChangeDetectorRef, inject, ViewRef } from '@angular/core';
import { Observable, ReplaySubject, Subject, UnaryFunction } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export function untilDestroyed<T>(): UnaryFunction<Observable<T>, Observable<T>> {
  const subject = new Subject<void>();

  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => {
    subject.next();
    subject.complete()
  });

  return takeUntil(subject.asObservable())
} 
export function takeUntilDestroy<T>(): UnaryFunction<Observable<T>, Observable<T>> {
  const viewRef = inject(ChangeDetectorRef) as ViewRef;
  const destroyer$ = new ReplaySubject<void>(1);

  viewRef.onDestroy(() => {
    destroyer$.next();
    destroyer$.complete();
  })

  return (observable: Observable<T>) => observable.pipe(takeUntil(destroyer$));
}