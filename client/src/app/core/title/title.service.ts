import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private title: string = 'Default Name';
  private subject: Subject<string> = new Subject<string>();

  constructor() {
  }

  receive(){
    return this.subject.asObservable()
  }

  send(title){
    this.title = title;
    this.subject.next(this.title);
  }
}
