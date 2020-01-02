import {Injectable} from '@angular/core';
import {Error} from './error';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private BAD_REQUEST: Error = new Error({
    cod: 400,
    message: 'Desculpe... Não é sua culpa. O servidor apresentou um erro de sintaxe.'
  });
  private UNAUTHORIZED: Error = new Error({cod: 401, message: 'Você precisa se autenticar para realizar esta ação.'});
  private FORBIDDEN: Error = new Error({
    cod: 403,
    message: 'Desculpe...Você não tem permissão para acessar esta página.'
  });
  private NOT_FOUND: Error = new Error({
    cod: 404,
    message: 'Nos perdoe...Ocorreu um erro e não encontramos o que você procurava.'
  });
  private INTERNAL_SERVER_ERROR: Error = new Error({
    cod: 500,
    message: 'Desculpe... Não é sua culpa. O servidor apresentou um erro.'
  });
  private BAD_GATEWAY: Error = new Error({
    cod: 502,
    message: 'Desculpe... Não é sua culpa. O servidor se perdeu no caminho e obteve uma resposta inválida.'
  });
  private SERVICE_UNAVAILABLE: Error = new Error({
    cod: 503,
    message: 'Desculpe... Não é sua culpa. Mas o servidor pode estar sobrecarregado. Tente novamente em breve'
  });
  private GATEWAY_TIMEOUT: Error = new Error({
    cod: 504,
    message: 'Desculpe... Não é sua culpa. O servidor demorou demais para responder.'
  });
  private UNKNOW: Error = new Error({
    cod: 123,
    message: 'Desculpe... Não é sua culpa. O servidor apresentou um erro desconhecido. Contate o administrador - RAMAL: 4779'
  });
  errorsList = [this.BAD_REQUEST, this.UNAUTHORIZED, this.FORBIDDEN, this.NOT_FOUND,
    this.INTERNAL_SERVER_ERROR, this.BAD_GATEWAY, this.SERVICE_UNAVAILABLE, this.GATEWAY_TIMEOUT];


  constructor(private router: Router, private route: ActivatedRoute) {
  }

  hasError = (httpResponse) => httpResponse.hasOwnProperty('error');

  sendError(httpResponse) {
    let error = this.errorsList.find((el) => el.cod == httpResponse.error.status);
    if (error == undefined) error = this.UNKNOW;
    if (error == this.UNAUTHORIZED) {
      // this.authService.logout(localStorage.getItem('token'));
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['error'], {state: {cod: error.cod, message: error.message}});
    }
  }
}

