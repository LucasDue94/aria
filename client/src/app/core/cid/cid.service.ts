import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Cid} from "./cid";


@Injectable()
export class CidService{

    private baseUrl = environment.serverUrl;
    getDefaultHttpOptions() {
        return new HttpHeaders({
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            "X-Auth-Token": localStorage.getItem('token')
        })
    }

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Cid[]> {
        let subject = new Subject<Cid[]>();
        this.http.get(this.baseUrl + `cid?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new Cid(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Cid[]>(this.baseUrl + `cid/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Cid> {
        let subject = new Subject<Cid>();
        this.http.get(this.baseUrl + `cid/` + id, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any) => {
                subject.next(new Cid(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Cid[]>();
        this.http.get(this.baseUrl + `cid/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new Cid(obj)))
        });
        return subject.asObservable();
    }

    save(cid: Cid): Observable<Cid> {
        if (cid.id) {
            return this.http.put<Cid>(this.baseUrl + `cid/` + cid.id, cid, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        } else {
            return this.http.post<Cid>(this.baseUrl + `cid/`, cid, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        }
    }


    destroy(cid: Cid): Observable<Object> {
        return this.http.delete(this.baseUrl + `cid/` + cid.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        });
    }
}
