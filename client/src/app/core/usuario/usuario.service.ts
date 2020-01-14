import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";
import {Usuario} from "./usuario";
import {BaseService} from "../http/baseService.service";


@Injectable()
export class UsuarioService extends BaseService {

  private baseUrl = environment.apiUrl + 'usuario';

  constructor(private http: HttpClient) {
    super();
  }

  list(offset?: any, max?: any): Observable<Usuario[]> {
    let subject = new Subject<Usuario[]>();
    this.http.get<Usuario[]>(this.baseUrl + '?offset=' + offset + '&max=' + max,
      {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Usuario[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  get(id: number): Observable<any> {
    let subject = new Subject<Usuario>();
    this.http.get(this.baseUrl + '/' + id, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(new Usuario(json));
      }
    });
    return subject.asObservable();
  }

  save(usuario: Usuario): Observable<any> {
    let subject = new Subject<Usuario>();
    if (usuario.id) {
      this.http.put<Usuario>(this.baseUrl + '/' + usuario.id, usuario, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    } else {
      this.http.post<Usuario>(this.baseUrl, usuario, {
        headers: this.getDefaultHttpOptions(),
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    }
    return subject.asObservable()
  }
}
