import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of, Subject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {RegistroLeito} from './registroLeito';


@Injectable()
export class RegistroLeitoService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = environment.apiUrl;

  private static buildQueryParams(params): string {
    let queryParams = '';
    for (const key in params) {
      queryParams += key === Object.keys(params)[0] ? `?${key}=${params[key]}` : `&${key}=${params[key]}`;
    }
    return queryParams;
  }

  /**
   * @param params (
   * tipoSetor : string
   * setorId : string
   * dataEntradaInicio : string
   * dataEntradaFim : string
   * offset : number
   * max : number
   * internos: boolean )
   */
  list(params?: object): Observable<RegistroLeito[]> {
    const subject = new Subject<RegistroLeito[]>();
    this.http.get<RegistroLeito[]>(`${this.baseUrl}registroLeito${RegistroLeitoService.buildQueryParams(params)}`).pipe(
      catchError(error => of({error})
      )).subscribe((registrosLeito: RegistroLeito[]) => {
      subject.next(registrosLeito.map((registroLeito: RegistroLeito) => new RegistroLeito(registroLeito)));
    });

    return subject.asObservable();
  }

  get(id: string): Observable<RegistroLeito> {
    const subject = new Subject<RegistroLeito>();
    this.http.get(this.baseUrl + `registroLeito/${id}`)
      .pipe(
        catchError(error => of({error})
        )).subscribe((registroLeito: RegistroLeito) => {
      subject.next(registroLeito);
    });

    return subject.asObservable();
  }

}
