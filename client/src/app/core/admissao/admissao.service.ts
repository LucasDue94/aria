import {Injectable} from '@angular/core';
import {Admissao} from './admissao';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of, Subject} from 'rxjs';
import {Incidente} from '../incidente/incidente';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdmissaoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  save(admissao: Admissao): Observable<Admissao> {
    let subject = new Subject<Admissao>();
    if (admissao.id) {
      this.http.put<Admissao>(this.baseUrl + 'incidente/' + admissao.id, admissao, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json);
      });
    } else {
      this.http.post<Admissao>(this.baseUrl + 'incidente/',  admissao, {
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
