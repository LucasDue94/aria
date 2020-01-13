import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable()
export class PerfilService {

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

  list(perfil?): Observable<any[]> {
    let tipo = '';
    let setor = '';
    let fullUrl = '';

    if (perfil == undefined) {
      fullUrl = this.baseUrl + `perfilEpidemiologico?inicio=` + '&fim=' +
        '&setores=' + '&tipo=' + tipo + '&perfilGeral=true';
    } else {
      if (perfil.tipoAtendimento != undefined) tipo = perfil.tipoAtendimento.join('&tipo=');
      if (perfil.setores != undefined){
        setor = perfil.setores.join('&setores=');
      }

      fullUrl = this.baseUrl + `perfilEpidemiologico?inicio=` + perfil.dataInicio + '&fim=' +
        perfil.dataFinal + '&setores=' + setor + '&tipo=' + tipo + '&perfilGeral=' +
        perfil.perfilGeral;
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
