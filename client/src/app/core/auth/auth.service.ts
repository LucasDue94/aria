import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {

  private baseUrl = environment.apiUrl;
  token: string;
  private userLogged: boolean;

  getDefaultHttpOptions() {
    return new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    });
  }

  constructor(private http?: HttpClient, private router?: Router) {
  }

  authentication(user) {
    const url = this.baseUrl + 'login';

    const data = {
      username: user.username,
      password: user.password
    };

    return this.http.post(url, data, {headers: this.getDefaultHttpOptions(), responseType: 'json'});
  }

  logout(auth) {
    const url = this.baseUrl + 'logout';
    if (auth != null) {
      this.token = auth;
    }
    const header = {
      auth: new HttpHeaders({
        'X-Auth-Token': this.token,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(url, {}, {headers: header.auth, responseType: 'json'}).subscribe(
      resp => {
        localStorage.setItem('aria', '{}');
        this.router.navigate(['/']);
      },
      err => {
        if (err.status === '404') {
          localStorage.setItem('aria', '{}');
        }
      }
    );
  }

  hasPermission(value) {
    const aria = JSON.parse(localStorage.getItem('aria')) || {};
    if (aria.roles == null) {  return false; }
    return aria.roles.includes(value) || aria.roles.includes('ROLE_ADMIN');
  }

  isLogged = () => (JSON.parse(localStorage.getItem('aria')) || {}).token != null;

}
