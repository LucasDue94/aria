import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Ecg} from "./ecg";


@Injectable()
export class EcgService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<Ecg[]> {
        let subject = new Subject<Ecg[]>();
        this.http.get(this.baseUrl + `ecg?offset=` + offset + '&max=' + max)
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new Ecg(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Ecg[]>(this.baseUrl + `ecg/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<Ecg> {
        let subject = new Subject<Ecg>();
        this.http.get(this.baseUrl + `ecg/` + id)
            .subscribe((json: any) => {
                subject.next(new Ecg(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Ecg[]>();
        this.http.get(this.baseUrl + `ecg/` + '?offset=' + offset + '&max=' + max, {
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new Ecg(obj)))
        });
        return subject.asObservable();
    }

    save(ecg: Ecg): Observable<Ecg> {
        if (ecg.id) {
            return this.http.put<Ecg>(this.baseUrl + `ecg/` + ecg.id, ecg, {
                responseType: 'json'
            });
        } else {
            return this.http.post<Ecg>(this.baseUrl + `ecg/`, ecg, {
                responseType: 'json'
            })
        }
    }


    destroy(ecg: Ecg): Observable<Object> {
        return this.http.delete(this.baseUrl + `ecg/` + ecg.id, {
            observe: 'response'
        });
    }
}
