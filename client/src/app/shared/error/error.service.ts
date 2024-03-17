import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  apiError$$ = new BehaviorSubject<null | string>(null);
  error$ = this.apiError$$.asObservable();

  constructor() {}

  setError(err: string) {
    this.apiError$$.next(err);

    setTimeout(() => {
      this.clearError();
    }, 3000);
  }

  clearError() {
    this.apiError$$.next(null);
  }
}
