import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private subject = new Subject<boolean>();
  private status: boolean;

  constructor() {
  }

  hide() {
    this.status = false;
    this.subject.next(this.status);

  }

  show() {
    this.status = true;
    this.subject.next(this.status);
  }

  listen(): Observable<boolean> {
    return this.subject.asObservable();
  }

}
