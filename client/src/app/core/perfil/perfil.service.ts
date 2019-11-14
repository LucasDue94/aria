import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable()
export class PerfilService {

  private baseUrl = environment.serverUrl;

  getDefaultHttpOptions() {
    return new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    })
  }

  constructor(private http: HttpClient) {
  }

  list(perfil?): Observable<any[]> {
    let tipo = '';
    let fullUrl = '';

    if (perfil == undefined) {
      fullUrl = this.baseUrl + `perfilEpidemiologico?dataInicio=` + '&dataFinal=' +
        '&setores=0032' + '&tipo=' + tipo + '&perfilAdulto=true';
    } else {
      if (perfil.tipoAtendimento != undefined) {
        tipo = perfil.tipoAtendimento.join('&tipo=');
      }
      fullUrl = this.baseUrl + `perfilEpidemiologico?dataInicio=` + perfil.dataInicio + '&dataFinal=' +
        perfil.dataFinal + '&setores=' + perfil.setores + '&tipo=' + tipo + '&perfilAdulto=' +
        perfil.perfilAdulto;
    }

    let subject = new Subject<any>();
    this.http.get(fullUrl, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }
}
