import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, Subject} from 'rxjs';
import {environment} from "../../../environments/environment.prod";
import {catchError} from 'rxjs/operators';
import {Admissao} from "../setor/admissao";
import {RegistroAtendimento} from "../registroAtendimento/registroAtendimento";

@Injectable({
  providedIn: 'root'
})
export class ApacheService {

  private baseUrl = environment.serverUrl;

  getDefaultHttpOptions() {
    return new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem('token')

    });
  }


  constructor(private http: HttpClient) {}

  list(setorId: number, termo?: string, offset?: any, max?: any): Observable<Admissao[]> {
    let subject = new Subject<Admissao[]>();
    this.http.get<Admissao[]>(this.baseUrl + `setor/admissoes?` + 'setorId=' + setorId  + '&termo=' + termo + '&offset=' + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Admissao[]) => {
      subject.next(json);
    });
    return subject.asObservable();
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


  search(setorId:number, termo?: string, offset?: any, max?: any): Observable<Admissao[]> {
    let subject = new Subject<Admissao[]>();
    this.http.get(this.baseUrl + `setor/admissoes?` + 'setorId=' + setorId  + '&termo=' + termo + '&offset=' + offset + '&max=' + max , {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Admissao[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

}

