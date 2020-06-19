import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private status: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  open = () => this.status.next(true);

  close = () => this.status.next(false);

  listen = () => this.status.asObservable();
}
