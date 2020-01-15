import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable()
export class SetorWpdService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  list(offset?: any, max?: any): Observable<any[]> {
    let subject = new Subject<any>();
    this.http.get(this.baseUrl + `setorWpd?` + 'offset=' + offset + '&max=' + max)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  search(termo: string, offset?: any, max?: any): Observable<any[]> {
    let subject = new Subject<any>();
    this.http.get(this.baseUrl + `setorWpd?` + 'offset=' + offset + '&max=' + max + '&termo=' + termo)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }
}
