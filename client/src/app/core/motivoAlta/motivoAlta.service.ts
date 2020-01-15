import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {MotivoAlta} from "./motivoAlta";


@Injectable()
export class MotivoAltaService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<MotivoAlta[]> {
        let subject = new Subject<MotivoAlta[]>();
        this.http.get(this.baseUrl + `motivoAlta?offset=` + offset + '&max=' + max)
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new MotivoAlta(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<MotivoAlta[]>(this.baseUrl + `motivoAlta/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<MotivoAlta> {
        let subject = new Subject<MotivoAlta>();
        this.http.get(this.baseUrl + `motivoAlta/` + id)
            .subscribe((json: any) => {
                subject.next(new MotivoAlta(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<MotivoAlta[]>();
        this.http.get(this.baseUrl + `motivoAlta/` + '?offset=' + offset + '&max=' + max, {
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new MotivoAlta(obj)))
        });
        return subject.asObservable();
    }

    save(motivoAlta: MotivoAlta): Observable<MotivoAlta> {
        if (motivoAlta.id) {
            return this.http.put<MotivoAlta>(this.baseUrl + `motivoAlta/` + motivoAlta.id, motivoAlta, {
                responseType: 'json'
            });
        } else {
            return this.http.post<MotivoAlta>(this.baseUrl + `motivoAlta/`, motivoAlta, {
                responseType: 'json'
            });
        }
    }


    destroy(motivoAlta: MotivoAlta): Observable<Object> {
        return this.http.delete(this.baseUrl + `motivoAlta/` + motivoAlta.id, {
            observe: 'response'
        });
    }
}
