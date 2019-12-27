import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {HeadersHelper} from "../headersHelper";


@Injectable()
export class GrupoService extends  HeadersHelper{

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

    list(max?: any, offset?: any): Observable<Grupo[]> {
        let subject = new Subject<Grupo[]>();
        this.http.get(this.baseUrl + `grupo?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new Grupo(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Grupo[]>(this.baseUrl + `grupo/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Grupo> {
        let subject = new Subject<Grupo>();
        this.http.get(this.baseUrl + `grupo/` + id, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any) => {
                subject.next(new Grupo(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Grupo[]>();
        this.http.get(this.baseUrl + `grupo/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new Grupo(obj)))
        });
        return subject.asObservable();
    }

    save(grupo: Grupo): Observable<Grupo> {
        if (grupo.id) {
            return this.http.put<Grupo>(this.baseUrl + `grupo/` + grupo.id, grupo, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        } else {
            return this.http.post<Grupo>(this.baseUrl + `grupo/`, grupo, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        }
    }


    destroy(grupo: Grupo): Observable<Object> {
        return this.http.delete(this.baseUrl + `grupo/` + grupo.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        });
    }
}