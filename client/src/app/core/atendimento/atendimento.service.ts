import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of, Subject} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Atendimento} from './atendimento';


@Injectable()
export class AtendimentoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  list(filterParams?, offset?: number, max?: number, tipoRegistro?: string): Observable<Atendimento[]> {
    let subject = new Subject<Atendimento[]>();
    this.http.get<Atendimento[]>(this.baseUrl + `atendimento?tipoRegistro=${tipoRegistro ? tipoRegistro : ''}&setorId=${filterParams.setorId ? filterParams.setorId : ''}&termo=${filterParams.termo ? filterParams.termo : ''}&dataEntradaInicio=${filterParams.inicio ? filterParams.inicio : ''}&dataEntradaFim=${filterParams.fim ? filterParams.fim : ''}&offset=${offset ? offset : ''}&max=${max ? max : ''}&internos=${filterParams.internos ? filterParams.internos : false}`)
      .subscribe((json: any[]) => {
        subject.next(json.map((propertyName: any) => new Atendimento(propertyName)));
      });

    return subject.asObservable();
  }

  count() {
    let quantity: number;
    return this.http.get<Atendimento[]>(this.baseUrl + `registroAtendimento/`).pipe(
      map(
        data => {
          quantity = data['total'];
          return quantity;
        }
      )
    );
  }

  get(id: string): Observable<any> {
    let subject = new Subject<any>();
    this.http.get<Atendimento>(this.baseUrl + 'atendimento?termo=' + id)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(new Atendimento(json));
      }
    });
    return subject.asObservable();
  }

  getRegistroAtendimetoLeito(registroId?: string, leitoId?: any, dataEntrada?: any): Observable<any[]> {
    let subject = new Subject<any[]>();
    this.http.get(this.baseUrl + 'registroLeito/show?registro=' + registroId + '&leito=' + leitoId + '&dataEntrada=' + dataEntrada)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }


  save(registroAtendimento: Atendimento): Observable<Atendimento> {
    if (registroAtendimento.id) {
      return this.http.put<Atendimento>(this.baseUrl + `registroAtendimento/` + registroAtendimento.id, registroAtendimento, {
        responseType: 'json'
      });
    } else {
      return this.http.post<Atendimento>(this.baseUrl + `registroAtendimento/`, registroAtendimento, {
        responseType: 'json'
      });
    }
  }


  destroy(registroAtendimento: Atendimento): Observable<Object> {
    return this.http.delete(this.baseUrl + `registroAtendimento/` + registroAtendimento.id, {
      observe: 'response'
    });
  }
}
