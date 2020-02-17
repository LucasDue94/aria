import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Nas} from "./nas";


@Injectable()
export class NasService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Nas[]> {
        let subject = new Subject<Nas[]>();
        this.http.get(this.baseUrl + `nas?offset=` + offset + '&max=' + max)
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new Nas(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Nas[]>(this.baseUrl + `nas/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Nas> {
        let subject = new Subject<Nas>();
        this.http.get(this.baseUrl + `nas/` + id)
            .subscribe((json: any) => {
                subject.next(new Nas(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Nas[]>();
        this.http.get(this.baseUrl + `nas/` + '?offset=' + offset + '&max=' + max, {
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new Nas(obj)))
        });
        return subject.asObservable();
    }

    save(nas: Nas): Observable<Nas> {
        if (nas.id) {
            return this.http.put<Nas>(this.baseUrl + `nas/` + nas.id, nas, {
                responseType: 'json'
            });
        } else {
            return this.http.post<Nas>(this.baseUrl + `nas/`, nas, {
                responseType: 'json'
            });
        }
    }


    destroy(nas: Nas): Observable<Object> {
        return this.http.delete(this.baseUrl + `nas/` + nas.id, {
            observe: 'response'
        });
    }
}
