import {Injectable} from '@angular/core';
import {Alert} from '../alert/alert';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  private subject: Subject<any> = new Subject<any>();
  private params;

  constructor() {
  }

  receive(): Observable<any> {
    return this.subject.asObservable();
  }

  send(params) {
    this.params = params;
    this.subject.next(this.params);
  }
}
