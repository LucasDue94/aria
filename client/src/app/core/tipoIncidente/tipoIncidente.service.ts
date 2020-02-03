import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {TipoIncidente} from "./tipoIncidente";
import {Risco} from "../risco/risco";


@Injectable()
export class TipoIncidenteService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    list(max: any = '', offset: any = '', termo: any = ''): Observable<TipoIncidente[]> {
        let subject = new Subject<TipoIncidente[]>();
        this.http.get(this.baseUrl + `tipoIncidente?offset=` + offset + '&max=' + max + '&termo=' + termo)
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new TipoIncidente(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<TipoIncidente[]>(this.baseUrl + `tipoIncidente/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<TipoIncidente> {
        let subject = new Subject<TipoIncidente>();
        this.http.get(this.baseUrl + `tipoIncidente/` + id)
            .subscribe((json: any) => {
                subject.next(new TipoIncidente(json));
            });
        return subject.asObservable();
    }

    save(tipoIncidente: TipoIncidente): Observable<any> {
      let subject = new Subject<TipoIncidente>();
      if (tipoIncidente.id) {
        this.http.put<Risco>(this.baseUrl + 'tipoIncidente/' + tipoIncidente.id, tipoIncidente, {
          responseType: 'json'
        }).pipe(
          catchError(error => of({error}))
        ).subscribe((json: any) => {
          subject.next(json)
        });
      } else {
        this.http.post<TipoIncidente>(this.baseUrl + 'tipoIncidente/',  tipoIncidente, {
          responseType: 'json'
        }).pipe(
          catchError(error => of({error}))
        ).subscribe((json: any) => {
          subject.next(json)
        });
      }
      return subject.asObservable()
    }


    destroy(tipoIncidente: TipoIncidente): Observable<Object> {
        return this.http.delete(this.baseUrl + `tipoIncidente/` + tipoIncidente.id, {
            observe: 'response'
        });
    }
}
