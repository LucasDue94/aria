import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject, of} from "rxjs";
import {map, catchError} from "rxjs/operators";
import {HeadersHelper} from "../headersHelper";
import {Apache} from "./apache";
import {Admissao} from "../setor/admissao";
import {RegistroAtendimento} from "../registroAtendimento/registroAtendimento";
import {RegistroAtendimentoLeito} from "../registroAtendimentoLeitos/registroAtendimentoLeito";


@Injectable()
export class ApacheService extends HeadersHelper {

  private baseUrl = environment.serverUrl;

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

  list(setorId: number, termo?: string, offset?: any, max?: any): Observable<Admissao[]> {
    let subject = new Subject<RegistroAtendimentoLeito[]>();
    this.http.get<RegistroAtendimentoLeito[]>(this.baseUrl + `setor/admissoes?` + 'setorId=' + setorId + '&termo=' + termo + '&offset=' + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Admissao[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  report(dataInicio?: string, dataFim?: string, setorId?: number, offset?: any, max?: any): Observable<Apache[]> {
    let subject = new Subject<Apache[]>();
    this.http.get<Apache[]>(this.baseUrl + `apache/relatorio?` + 'dataInicio=' + dataInicio + '&dataFim=' + dataFim + '&setorId='+ setorId +'&offset=' + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Apache[]) => {
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

  get(id: string): Observable<any> {
    let subject = new Subject<RegistroAtendimento>();
    this.http.get(this.baseUrl + `registroAtendimento/` + id, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(new RegistroAtendimento(json));
      }
    });
    return subject.asObservable();
  }


  search(setorId: number, termo?: string, offset?: any, max?: any): Observable<Admissao[]> {
    let subject = new Subject<Admissao[]>();
    this.http.get(this.baseUrl + `setor/admissoes?` + 'setorId=' + setorId + '&termo=' + termo + '&offset=' + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Admissao[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  save(apache: Apache): Observable<any> {
    let subject = new Subject<Apache>();
    if (apache.id) {
      this.http.put<Apache>(this.baseUrl + `apache/` + apache.id, apache, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    } else {
      this.http.post<Apache>(this.baseUrl + `apache/`, apache, {
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


  destroy(apache: Apache): Observable<Object> {
    return this.http.delete(this.baseUrl + `apache/` + apache.id, {
      headers: this.getDefaultHttpOptions(),
      observe: 'response'
    });
  }
}
