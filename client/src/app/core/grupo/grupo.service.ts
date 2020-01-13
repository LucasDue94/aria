import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";
import {HeadersHelper} from "../headersHelper";
import {Grupo} from "./grupo";


@Injectable()
export class GrupoService extends HeadersHelper {

  private baseUrl = environment.apiUrl;

  getDefaultHttpOptions() {
    return new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem('token')
    })
  }

  constructor(private http: HttpClient) {
    super()
  }

  list(max?: any, offset?: any): Observable<Grupo[]> {
    let subject = new Subject<Grupo[]>();
    this.http.get(this.baseUrl + `grupo?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Grupo[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  get(id: number): Observable<any> {
    let subject = new Subject<Grupo>();
    this.http.get(this.baseUrl + `grupo/` + id, {headers: this.getDefaultHttpOptions()})
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
      headers: this.getDefaultHttpOptions(),
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
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      });
    } else {
      return this.http.post<Grupo>(this.baseUrl + `grupo/`, grupo, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      });
    }
  }

  destroy(grupo: Grupo): Observable<Object> {
    return this.http.delete(this.baseUrl + `grupo/` + grupo.id, {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    });
  }
}
