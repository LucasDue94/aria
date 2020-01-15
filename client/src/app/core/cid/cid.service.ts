import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Cid} from "./cid";


@Injectable()
export class CidService{

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Cid[]> {
        let subject = new Subject<Cid[]>();
        this.http.get(this.baseUrl + `cid?offset=` + offset + '&max=' + max)
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
        this.http.get(this.baseUrl + `cid/` + id)
            .subscribe((json: any) => {
                subject.next(new Cid(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Cid[]>();
        this.http.get(this.baseUrl + `cid/` + '?offset=' + offset + '&max=' + max, {
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new Cid(obj)))
        });
        return subject.asObservable();
    }

    save(cid: Cid): Observable<Cid> {
        if (cid.id) {
            return this.http.put<Cid>(this.baseUrl + `cid/` + cid.id, cid, {
                responseType: 'json'
            });
        } else {
            return this.http.post<Cid>(this.baseUrl + `cid/`, cid, {
                responseType: 'json'
            });
        }
    }


    destroy(cid: Cid): Observable<Object> {
        return this.http.delete(this.baseUrl + `cid/` + cid.id, {
            observe: 'response'
        });
    }
}
