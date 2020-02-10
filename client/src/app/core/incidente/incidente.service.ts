import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";
import {Incidente} from "./incidente";


@Injectable()
export class IncidenteService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  list(max: any = '', offset: any = '', termo: any = ''): Observable<Incidente[]> {
    let subject = new Subject<Incidente[]>();
    this.http.get(this.baseUrl + `incidente?offset=` + offset + '&max=' + max + '&termo=' + termo)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Incidente[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  get(id: number): Observable<any> {
    let subject = new Subject<Incidente>();
    this.http.get(this.baseUrl + `incidente/` + id)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Incidente) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  save(incidente: any): Observable<any> {
    let subject = new Subject<Incidente>();
    if (incidente.id) {
      this.http.put<Incidente>(this.baseUrl + 'incidente/' + incidente.id, incidente, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    } else {
      this.http.post<Incidente>(this.baseUrl + 'incidente/',  incidente, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    }
    return subject.asObservable()
  }

  destroy(incidente: Incidente): Observable<Object> {
    return this.http.delete(this.baseUrl + `incidente/` + incidente.id, {
      observe: 'response'
    });
  }
}
