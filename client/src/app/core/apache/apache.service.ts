import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Apache} from "./apache";

@Injectable()
export class ApacheService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  list(setorId?: any, termo?: string, offset?: any, max?: any): Observable<any[]> {
    let subject = new Subject<any[]>();
    this.http.get<any[]>(this.baseUrl + `registroAtendimentoLeito/admissoes?` + 'setorId=' + setorId + '&termo=' + termo + '&offset=' + offset + '&max=' + max)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  report(dataInicio?: string, dataFim?: string, setorId?: number, offset?: any, max?: any): Observable<any[]> {
    let subject = new Subject<any[]>();
    this.http.get<any[]>(this.baseUrl + `apache/relatorio?` + 'dataInicio=' + dataInicio + '&dataFim=' + dataFim + '&setorId='+ setorId +'&offset=' + offset + '&max=' + max)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  count() {
    let quantity: number;
    return this.http.get<Apache[]>(this.baseUrl + `apache/`).pipe(
      map(
        data => {
          quantity = data['total'];
          return quantity;
        }
      )
    )
  }

  get(id): Observable<any> {
    let subject = new Subject<any>();
    this.http.get(this.baseUrl + `apache/` + id)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(json);
      }
    });
    return subject.asObservable();
  }

  save(apache: Apache): Observable<any> {
    let subject = new Subject<Apache>();
    if (apache.id) {
      this.http.put<Apache>(this.baseUrl + `apache/` + apache.id, apache, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    } else {
      this.http.post<Apache>(this.baseUrl + `apache/`, apache, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    }
    return subject.asObservable()
  }


  destroy(apache: Apache): Observable<Object> {
    return this.http.delete(this.baseUrl + `apache/` + apache.id, {
      observe: 'response'
    });
  }
}
