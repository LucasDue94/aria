import {HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class BaseService {
  getDefaultHttpOptions() {
    return new HttpHeaders({
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem('token')
    })
  }
}
