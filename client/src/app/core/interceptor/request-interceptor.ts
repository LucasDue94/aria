import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private router?: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq = req;
    if(!req.url.includes('login')) {
      cloneReq = req.clone({
        headers: new HttpHeaders({
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem('token')
        })
      })
    }
    return next.handle(cloneReq).pipe(
      catchError((error: HttpErrorResponse) => {
        debugger
        if(error.status == 401) {
          localStorage.clear();
          this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );
  }
}
