import {Injectable} from '@angular/core';
import {Admissao} from './admissao';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdmissaoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  list(): Observable<Admissao[]> {
    let subject = new Subject<Admissao[]>();
    this.http.get<Admissao[]>(this.baseUrl + `admissao`)
      .subscribe((json: any[]) => {
        subject.next(json.map((propertyName: any) => new Admissao(propertyName)));
      });
    return subject.asObservable();
  }

  get(id: number): Observable<Admissao> {
    let subject = new Subject<any>();
    this.http.get<Admissao>(this.baseUrl + `admissao/${id}`)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(new Admissao(json));
      }
    });
    return subject.asObservable();
  }

  save(admissao: Admissao): Observable<Admissao> {
    let subject = new Subject<Admissao>();
    if (admissao.id) {
      this.http.put<Admissao>(this.baseUrl + 'admissao/' + admissao.id, admissao, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json);
      });
    } else {
      this.http.post<Admissao>(this.baseUrl + 'admissao/', admissao, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json);
      });
    }
    return subject.asObservable();
  }
}
