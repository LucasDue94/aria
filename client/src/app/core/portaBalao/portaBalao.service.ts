import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {PortaBalao} from "./portaBalao";


@Injectable()
export class PortaBalaoService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    list(max?: any, offset?: any): Observable<PortaBalao[]> {
        let subject = new Subject<PortaBalao[]>();
        this.http.get(this.baseUrl + `portaBalao?offset=` + offset + '&max=' + max)
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new PortaBalao(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<PortaBalao[]>(this.baseUrl + `portaBalao/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<PortaBalao> {
        let subject = new Subject<PortaBalao>();
        this.http.get(this.baseUrl + `portaBalao/` + id)
            .subscribe((json: any) => {
                subject.next(new PortaBalao(json));
            });
        return subject.asObservable();
    }


    save(portaBalao: PortaBalao): Observable<PortaBalao> {
        if (portaBalao.id) {
            return this.http.put<PortaBalao>(this.baseUrl + `portaBalao/` + portaBalao.id, portaBalao, {
                responseType: 'json'
            });
        } else {
            return this.http.post<PortaBalao>(this.baseUrl + `portaBalao/`, portaBalao, {
                responseType: 'json'
            });
        }
    }


    destroy(portaBalao: PortaBalao): Observable<Object> {
        return this.http.delete(this.baseUrl + `portaBalao/` + portaBalao.id, {
            observe: 'response'
        });
    }
}
