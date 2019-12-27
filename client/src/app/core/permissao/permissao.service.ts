import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, of, Subject} from "rxjs";
import {HeadersHelper} from "../headersHelper";
import {Permissao} from "./permissao";
import {catchError} from 'rxjs/operators';


@Injectable()
export class PermissaoService extends HeadersHelper {

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

  list(max?: any, offset?: any): Observable<Permissao[]> {
    let subject = new Subject<Permissao[]>();
    this.http.get(this.baseUrl + `permissao?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Permissao[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }
}
