import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {EstratificacaoRisco} from "./estratificacaoRisco";


@Injectable()
export class EstratificacaoRiscoService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<EstratificacaoRisco[]> {
        let subject = new Subject<EstratificacaoRisco[]>();
        this.http.get(this.baseUrl + `estratificacaoRisco?offset=` + offset + '&max=' + max)
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new EstratificacaoRisco(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<EstratificacaoRisco[]>(this.baseUrl + `estratificacaoRisco/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<EstratificacaoRisco> {
        let subject = new Subject<EstratificacaoRisco>();
        this.http.get(this.baseUrl + `estratificacaoRisco/` + id)
            .subscribe((json: any) => {
                subject.next(new EstratificacaoRisco(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<EstratificacaoRisco[]>();
        this.http.get(this.baseUrl + `estratificacaoRisco/` + '?offset=' + offset + '&max=' + max, {
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new EstratificacaoRisco(obj)))
        });
        return subject.asObservable();
    }

    save(estratificacaoRisco: EstratificacaoRisco): Observable<EstratificacaoRisco> {
        if (estratificacaoRisco.id) {
            return this.http.put<EstratificacaoRisco>(this.baseUrl + `estratificacaoRisco/` + estratificacaoRisco.id, estratificacaoRisco, {
                responseType: 'json'
            });
        } else {
            return this.http.post<EstratificacaoRisco>(this.baseUrl + `estratificacaoRisco/`, estratificacaoRisco, {
                responseType: 'json'
            });
        }
    }


    destroy(estratificacaoRisco: EstratificacaoRisco): Observable<Object> {
        return this.http.delete(this.baseUrl + `estratificacaoRisco/` + estratificacaoRisco.id, {
            observe: 'response'
        });
    }
}
