import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Alert} from "./alert";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject: Subject<Alert> = new Subject<Alert>();
  private alert: Alert = new Alert();

  constructor() {}

  receive(): Observable<Alert> {
    this.subject.next(this.alert);
    return this.subject.asObservable()
  }

  send(params) {
    this.alert = new Alert(params);
  }
}
