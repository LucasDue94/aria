import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Paciente} from "./paciente";
import {Setor} from "../setor/setor";


@Injectable()
export class PacienteService {

    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    list(max: any = '', offset: any = '', termo: any = '', setor: any = ''): Observable<any[]> {
        let subject = new Subject<Paciente[]>();
        this.http.get(this.baseUrl + `paciente?offset=` + offset + '&max=' + max + '&termo=' + termo + '&setor=' + setor)
            .subscribe((json: any[]) => {
              subject.next(json);
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<Paciente[]>(this.baseUrl + `paciente/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: any): Observable<Paciente> {
        let subject = new Subject<Paciente>();
        this.http.get(this.baseUrl + `paciente/` + id)
            .subscribe((json: any) => {
                subject.next(new Paciente(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<Paciente[]>();
        this.http.get(this.baseUrl + `paciente/` + '?offset=' + offset + '&max=' + max, {
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new Paciente(obj)))
        });
        return subject.asObservable();
    }

    save(paciente: Paciente): Observable<Paciente> {
        if (paciente.id) {
            return this.http.put<Paciente>(this.baseUrl + `paciente/` + paciente.id, paciente, {
                responseType: 'json'
            });
        } else {
            return this.http.post<Paciente>(this.baseUrl + `paciente/`, paciente, {
                responseType: 'json'
            });
        }
    }


    destroy(paciente: Paciente): Observable<Object> {
        return this.http.delete(this.baseUrl + `paciente/` + paciente.id, {
            observe: 'response'
        });
    }
}
