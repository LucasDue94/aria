import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private subject: Subject<boolean> = new Subject();

  constructor() {}

  getStatus(): Observable<boolean> {
    return this.subject.asObservable()
  }

  setStatus(status) {
    this.subject.next(status);
  }
}
