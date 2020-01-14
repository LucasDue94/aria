import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Leito} from "./leito";


@Injectable()
export class LeitoService {

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

    list(max?: any, offset?: any): Observable<Leito[]> {
        let subject = new Subject<Leito[]>();
        this.http.get(this.baseUrl + `leito?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new Leito(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Leito[]>(this.baseUrl + `leito/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Leito> {
        let subject = new Subject<Leito>();
        this.http.get(this.baseUrl + `leito/` + id, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any) => {
                subject.next(new Leito(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Leito[]>();
        this.http.get(this.baseUrl + `leito/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new Leito(obj)))
        });
        return subject.asObservable();
    }

    save(leito: Leito): Observable<Leito> {
        if (leito.id) {
            return this.http.put<Leito>(this.baseUrl + `leito/` + leito.id, leito, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        } else {
            return this.http.post<Leito>(this.baseUrl + `leito/`, leito, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        }
    }


    destroy(leito: Leito): Observable<Object> {
        return this.http.delete(this.baseUrl + `leito/` + leito.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        });
    }
}
