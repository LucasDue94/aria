import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Modal} from './entities/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject: Subject<Modal> = new Subject<Modal>();
  modal: Modal;
  answer: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  open(modal: Modal) {
    this.answer = new Subject<boolean>();
    this.modal = new Modal(modal);
    this.modalSubject.next(this.modal);
    return this.answer.asObservable();
  }

  listen(): Observable<Modal> {
    return this.modalSubject.asObservable();
  }

  send(answer: boolean) {
    this.answer.next(answer);
  }

}
