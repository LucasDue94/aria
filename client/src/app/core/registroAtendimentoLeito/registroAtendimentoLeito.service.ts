import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";
import {RegistroAtendimentoLeito} from "./registroAtendimentoLeito";


@Injectable()
export class RegistroAtendimentoLeitoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  list(filterParams?, offset?: number, max?: number): Observable<RegistroAtendimentoLeito[]> {
    let subject = new Subject<RegistroAtendimentoLeito[]>();

    this.http.get<RegistroAtendimentoLeito[]>(this.baseUrl + `registroAtendimentoLeito?setorId=${filterParams.setorId ? filterParams.setorId : ''}&termo=${filterParams.termo ? filterParams.termo : ''}&dataEntradaInicio=${filterParams.inicio ? filterParams.inicio : ''}&dataEntradaFim=${filterParams.fim ? filterParams.fim : ''}&offset=${offset ? offset : ''}&max=${max ? max : ''}`)
      .subscribe((json: any[]) => {
        subject.next(json.map((propertyName: any) => new RegistroAtendimentoLeito(propertyName)))
      });

    return subject.asObservable();
  }

  get(registroId?: string, leitoId?: any, dataEntrada?: any): Observable<RegistroAtendimentoLeito> {
    let subject = new Subject<RegistroAtendimentoLeito>();
    this.http.get(this.baseUrl + 'registroAtendimentoLeito/show?registro=' + registroId + '&leito=' + leitoId + '&dataEntrada=' + dataEntrada)
      .pipe(
        catchError(error => of({error})
        )).subscribe((registroAtendimentoLeito : RegistroAtendimentoLeito) => {
      subject.next(registroAtendimentoLeito);
    });
    return subject.asObservable();
  }
}
