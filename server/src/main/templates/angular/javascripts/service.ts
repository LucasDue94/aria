import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {HeadersHelper} from "../headersHelper";


@Injectable()
export class ${className}Service extends  HeadersHelper{

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

    list(max?: any, offset?: any): Observable<${className}[]> {
        let subject = new Subject<${className}[]>();
        this.http.get(this.baseUrl + `${propertyName}?offset=` + offset + '&max=' + max, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any[]) => {
                subject.next(json.map((propertyName: any) => new ${className}(propertyName)))
            });
        return subject.asObservable();
    }

    count() {
        let quantity: number;
        return this.http.get<${className}[]>(this.baseUrl + `${propertyName}/`).pipe(
            map(
                data => {
                    quantity = data['total'];
                    return quantity;
                }
            )
        )
    }

    get(id: number): Observable<${className}> {
        let subject = new Subject<${className}>();
        this.http.get(this.baseUrl + `${propertyName}/` + id, {headers: this.getDefaultHttpOptions()})
            .subscribe((json: any) => {
                subject.next(new ${className}(json));
            });
        return subject.asObservable();
    }

    search(searchTerm, offset?: any, max?): Observable<any[]> {
        let subject = new Subject<${className}[]>();
        this.http.get(this.baseUrl + `${propertyName}/` + '?offset=' + offset + '&max=' + max, {
            headers: this.getDefaultHttpOptions(),
            params: {termo: searchTerm}
        }).subscribe((json: any) => {
            subject.next(json.map((obj: any) => new ${className}(obj)))
        });
        return subject.asObservable();
    }

    save(${propertyName}: ${className}): Observable<${className}> {
        if (${propertyName}.id) {
            return this.http.put<${className}>(this.baseUrl + `${propertyName}/` + ${propertyName}.id, ${propertyName}, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        } else {
            return this.http.post<${className}>(this.baseUrl + `${propertyName}/`, ${propertyName}, {
                headers: this.getDefaultHttpOptions(),
                responseType: 'json'
            });
        }
    }


    destroy(${propertyName}: ${className}): Observable<Object> {
        return this.http.delete(this.baseUrl + `${propertyName}/` + ${propertyName}.id, {
            headers: this.getDefaultHttpOptions(),
            observe: 'response'
        });
    }
}