import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";
import {Grupo} from "./grupo";


@Injectable()
export class GrupoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  list(max?: any, offset?: any): Observable<Grupo[]> {
    let subject = new Subject<Grupo[]>();
    this.http.get(this.baseUrl + `grupo?offset=` + offset + '&max=' + max)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Grupo[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  get(id: number): Observable<any> {
    let subject = new Subject<Grupo>();
    this.http.get(this.baseUrl + `grupo/` + id)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Grupo) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  search(searchTerm, offset?: any, max?): Observable<any[]> {
    let subject = new Subject<Grupo[]>();
    this.http.get(this.baseUrl + `grupo/` + '?offset=' + offset + '&max=' + max, {
      params: {termo: searchTerm}
    }).pipe(
      catchError(error => of({error})
      )).subscribe((json: Grupo[]) => {
      subject.next(json);
    });

    return subject.asObservable();
  }

  save(grupo: Grupo): Observable<Grupo> {
    if (grupo.id) {
      return this.http.put<Grupo>(this.baseUrl + `grupo/` + grupo.id, grupo, {
        responseType: 'json'
      });
    } else {
      return this.http.post<Grupo>(this.baseUrl + `grupo/`, grupo, {
        responseType: 'json'
      });
    }
  }

  destroy(grupo: Grupo): Observable<Object> {
    return this.http.delete(this.baseUrl + `grupo/` + grupo.id, {
      observe: 'response'
    });
  }
}
