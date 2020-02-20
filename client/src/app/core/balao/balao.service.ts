import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of, Subject} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Balao} from "./balao";
import {Incidente} from "../incidente/incidente";

@Injectable()
export class BalaoService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Balao[]> {
        let subject = new Subject<Balao[]>();
        this.http.get(this.baseUrl + `balao?offset=` + offset + '&max=' + max)
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new Balao(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Balao[]>(this.baseUrl + `balao/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Balao> {
        let subject = new Subject<Balao>();
        this.http.get(this.baseUrl + `balao/` + id)
            .subscribe((json: any) => {
                subject.next(new Balao(json));
            });
        return subject.asObservable();
    }


    /*save(balao: Balao): Observable<any> {
        if (balao.id) {
           this.http.put<any>(this.baseUrl + `balao/` + balao.id, balao, {
                responseType: 'json'
            });
        } else {
          this.http.post<any>(this.baseUrl + `balao/`, balao, {
              responseType: 'json'
            })
        }
    }*/


  save(balao: any): Observable<any> {
    let subject = new Subject<Balao>();
    if (balao.id) {
      this.http.put<Balao>(this.baseUrl + 'balao/' + balao.id, balao, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    } else {
      this.http.post<Balao>(this.baseUrl + 'balao/',  balao, {
        responseType: 'json'
      }).pipe(
        catchError(error => of({error}))
      ).subscribe((json: any) => {
        subject.next(json)
      });
    }
    return subject.asObservable()
  }


    destroy(balao: Balao): Observable<Object> {
        return this.http.delete(this.baseUrl + `balao/` + balao.id, {
            observe: 'response'
        });
    }
}
