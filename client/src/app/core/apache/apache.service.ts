import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, Subject} from 'rxjs';
import {environment} from "../../../environments/environment.prod";
import {catchError} from 'rxjs/operators';
import {Admissao} from "../setor/admissao";

@Injectable({
  providedIn: 'root'
})
export class ApacheService {

  private baseUrl = environment.serverUrl;

  getDefaultHttpOptions() {
    return new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json"
    })
  }


  constructor(private http: HttpClient) {
  }

  get(id: number): Observable<Admissao[]> {
    let subject = new Subject<Admissao[]>();
    this.http.get<Admissao[]>(`${this.baseUrl}setor/admissoes?setorId=${id}`, {headers: this.getDefaultHttpOptions()})
      .pipe(
        catchError(error => of({error})
        )).subscribe((json: Admissao[]) => {
      subject.next(json);
    });
    return subject.asObservable();
  }

}

