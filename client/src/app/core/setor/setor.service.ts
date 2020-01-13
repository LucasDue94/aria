import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";
import {Setor} from "./setor";


@Injectable()
export class SetorService {

  private baseUrl = environment.apiUrl;

  getDefaultHttpOptions() {
    return new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem('token')
    })
  }

  constructor(private http: HttpClient) {
  }

  list(tipoSetor?: string, offset?: any, max?: any): Observable<Setor[]> {
    let subject = new Subject<Setor[]>();
    let url = this.baseUrl + 'setor?' + 'offset=' + offset + '&max=' + max;
    if(tipoSetor != null && tipoSetor != '') {
      url += '&tipoSetor=' + tipoSetor
    }
    this.http.get<Setor[]>(url,
      {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  get(id: number): Observable<any> {
    let subject = new Subject<Setor>();
    this.http.get(this.baseUrl + `setor/` + id, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(new Setor(json));
      }
    });
    return subject.asObservable();
  }

  save(setor: Setor): Observable<any> {
    let subject = new Subject<Setor>();
    if (setor.id) {
      this.http.put<Setor>(this.baseUrl + `setor/` + setor.id, setor, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    } else {
      this.http.post<Setor>(this.baseUrl + `setor/`, setor, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    }
    return subject.asObservable()
  }
}
