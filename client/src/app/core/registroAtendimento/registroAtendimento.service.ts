import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {RegistroAtendimento} from "./registroAtendimento";


@Injectable()
export class RegistroAtendimentoService {

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

    list(max?: any, offset?: any): Observable<RegistroAtendimento[]> {
        let subject = new Subject<RegistroAtendimento[]>();
        this.http.get(this.baseUrl + `registroAtendimento?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new RegistroAtendimento(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<RegistroAtendimento[]>(this.baseUrl + `registroAtendimento/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<RegistroAtendimento> {
        let subject = new Subject<RegistroAtendimento>();
        this.http.get(this.baseUrl + `registroAtendimento/` + id, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any) => {
                subject.next(new RegistroAtendimento(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<RegistroAtendimento[]>();
        this.http.get(this.baseUrl + `registroAtendimento/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new RegistroAtendimento(obj)))
        });
        return subject.asObservable();
    }

    save(registroAtendimento: RegistroAtendimento): Observable<RegistroAtendimento> {
        if (registroAtendimento.id) {
            return this.http.put<RegistroAtendimento>(this.baseUrl + `registroAtendimento/` + registroAtendimento.id, registroAtendimento, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        } else {
            return this.http.post<RegistroAtendimento>(this.baseUrl + `registroAtendimento/`, registroAtendimento, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        }
    }


    destroy(registroAtendimento: RegistroAtendimento): Observable<Object> {
        return this.http.delete(this.baseUrl + `registroAtendimento/` + registroAtendimento.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        });
    }
}
