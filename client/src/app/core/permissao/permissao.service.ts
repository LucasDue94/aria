import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {Permissao} from "./permissao";
import {catchError} from 'rxjs/operators';


@Injectable()
export class PermissaoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  list(max?: any, offset?: any): Observable<Permissao[]> {
    let subject = new Subject<Permissao[]>();
    this.http.get(this.baseUrl + `permissao?offset=` + offset + '&max=' + max)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Permissao[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }
}
