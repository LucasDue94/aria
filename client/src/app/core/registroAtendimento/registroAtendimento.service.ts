import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {RegistroAtendimento} from "./registroAtendimento";


@Injectable()
export class RegistroAtendimentoService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    list(setorId: number, max?: any, offset?: any): Observable<RegistroAtendimento[]> {
        let subject = new Subject<RegistroAtendimento[]>();
        this.http.get<RegistroAtendimento[]>(this.baseUrl + 'registroAtendimento?'+'setorId=' + setorId + '&offset=' + offset + '&max=' + max)
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new RegistroAtendimento(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<RegistroAtendimento[]>(this.baseUrl + `registroAtendimento/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: string): Observable<any> {
      let subject = new Subject<any>();
      this.http.get<RegistroAtendimento>(this.baseUrl + 'registroAtendimento/' + id)
        .pipe(
          catchError(error => of({error})
          )).subscribe((json: any) => {
        if (json.hasOwnProperty('error')) {
          subject.next(json);
        } else {
          subject.next(new RegistroAtendimento(json));
        }
      });
      return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<RegistroAtendimento[]>();
        this.http.get(this.baseUrl + `registroAtendimento/` + '?offset=' + offset + '&max=' + max, {
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new RegistroAtendimento(obj)))
        });
        return subject.asObservable();
    }

    save(registroAtendimento: RegistroAtendimento): Observable<RegistroAtendimento> {
        if (registroAtendimento.id) {
            return this.http.put<RegistroAtendimento>(this.baseUrl + `registroAtendimento/` + registroAtendimento.id, registroAtendimento, {
                responseType: 'json'
            });
        } else {
            return this.http.post<RegistroAtendimento>(this.baseUrl + `registroAtendimento/`, registroAtendimento, {
                responseType: 'json'
            });
        }
    }


    destroy(registroAtendimento: RegistroAtendimento): Observable<Object> {
        return this.http.delete(this.baseUrl + `registroAtendimento/` + registroAtendimento.id, {
            observe: 'response'
        });
    }
}
