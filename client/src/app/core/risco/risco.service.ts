import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";
import {Risco} from "./risco";


@Injectable()
export class RiscoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  list(max?: any, offset?: any): Observable<Risco[]> {
    let subject = new Subject<Risco[]>();
    this.http.get(this.baseUrl + `risco?offset=` + offset + '&max=' + max)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Risco[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  get(id: number): Observable<any> {
    let subject = new Subject<Risco>();
    this.http.get(this.baseUrl + `risco/` + id)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Risco) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    let subject = new Subject<Risco[]>();
    this.http.get(this.baseUrl + `risco/` + '?offset=' + offset + '&max=' + max, {
      params: {termo: searchTerm}
    }).pipe(
      catchError(error => of({error})
      )).subscribe((json: Risco[]) => {
      subject.next(json);
    });

    return subject.asObservable();
  }

  save(risco: Risco): Observable<Risco> {
    let subject = new Subject<Risco>();
    if (risco.id) {
      this.http.put<Risco>(this.baseUrl + 'risco/' + risco.id, risco, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    } else {
      this.http.post<Risco>(this.baseUrl + 'risco/',  risco, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    }
    return subject.asObservable()

  }

  destroy(risco: Risco): Observable<Object> {
    return this.http.delete(this.baseUrl + `risco/` + risco.id, {
      observe: 'response'
    });
  }
}
