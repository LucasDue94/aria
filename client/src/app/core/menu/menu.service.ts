import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private subject: Subject<any> = new Subject();
  private status: boolean;

  constructor() {}

  getStatus(): Observable<boolean> {
    this.subject.next(this.status);
    return this.subject.asObservable()
  }

  setStatus(status) {
    this.status = status;
  }
}
