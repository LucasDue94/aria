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

  list(perfil): Observable<any[]> {
    let subject = new Subject<any>();
    this.http.get(this.baseUrl + `perfil?dataInicio=` + perfil.dataInicio + '&dataFinal=' + perfil.dataFinal +
      '&setores=' + perfil.setores + '&tipo=' + perfil.tipoAtendimento+ '&perfilAdulto=' + perfil.perfilAdulto, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }
}
