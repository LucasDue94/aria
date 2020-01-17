import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError} from "rxjs/operators";
import {Usuario} from "./usuario";


@Injectable()
export class UsuarioService {

  private baseUrl = environment.apiUrl + 'usuario';

  constructor(private http: HttpClient) {
  }

  list(offset?: any, max?: any): Observable<Usuario[]> {
    let subject = new Subject<Usuario[]>();
    this.http.get<Usuario[]>(this.baseUrl + '?offset=' + offset + '&max=' + max)
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Usuario[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

  get(id: number): Observable<any> {
    let subject = new Subject<Usuario>();
    this.http.get(this.baseUrl + '/' + id)
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
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    } else {
      this.http.post<Usuario>(this.baseUrl, usuario, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    }
    return subject.asObservable()
  }

  update(usuarioId: number, usuario: Usuario): Observable<any> {
    this.http.put(this.baseUrl + '/' + usuarioId, usuario, {
      responseType: 'json'
    }).pipe(
      catchError(error => of({error})
      )).subscribe((json: any) => {
      if (json.hasOwnProperty('error')) {
        subject.next(json);
      } else {
        subject.next(new Usuario(json));
      }
    });
    let subject = new Subject<Usuario>();
    return subject.asObservable();
  }
}
