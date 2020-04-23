import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {RegistroLeito} from './registroLeito';


@Injectable()
export class RegistroLeitoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * @param params (
   * tipoSetor : string
   * setorId : string
   * dataEntradaInicio : string
   * dataEntradaFim : string
   * offset : number
   * max : number )
   */
  list(params?: object): Observable<RegistroLeito[]> {
    const subject = new Subject<RegistroLeito[]>();
    let queryParams = '';
    for (const key in params) {
      queryParams += key === Object.keys(params)[0] ? `?${key}=${params[key]}` : `&${key}=${params[key]}`;
    }

    this.http.get<RegistroLeito[]>(this.baseUrl + `registroLeito${queryParams}`).pipe(
      catchError(error => of({error})
      )).subscribe((registrosLeito: RegistroLeito[]) => {
      subject.next(registrosLeito.map((registroLeito: RegistroLeito) => new RegistroLeito(registroLeito)));
    });

    return subject.asObservable();
  }

  get(registroId?: string, leitoId?: any, dataEntrada?: any): Observable<RegistroLeito> {
    let subject = new Subject<RegistroLeito>();
    this.http.get(this.baseUrl + 'registroLeito/show?registro=' + registroId + '&leito=' + leitoId + '&dataEntrada=' + dataEntrada)
      .pipe(
        catchError(error => of({error})
        )).subscribe((registroLeito: RegistroLeito) => {
      subject.next(registroLeito);
    });
    return subject.asObservable();
  }
}
