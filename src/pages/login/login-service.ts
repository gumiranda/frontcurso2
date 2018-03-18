import { Usuario } from './../../entity/Usuario';
import { Observable } from 'rxjs/Observable';
import { Utils } from './../../entity/Utils';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {
  private loginUrl: string;
  private refreshUrl: string;
  public handleError: any;
  public userUrl:string;
  public cadastroUrl:string;

  constructor(public http: Http, public requestOptions:RequestOptions) {
    this.loginUrl = Utils.getUrlBackend() + "oauth/token?grant_type=password&username=";
    this.refreshUrl = Utils.getUrlBackend() + "oauth/token?grant_type=refresh_token&refresh_token=";
    this.userUrl  = Utils.getUrlBackend() + "usuario/logado";
    this.cadastroUrl  = Utils.getUrlBackend() + "usuario";

  }
  public cadastro(usuario: Usuario): Observable<any> {
  let headers = new Headers({'Content-Type' : 'application/json',
  "Authorization": "Basic " + btoa("cliente" + ':' + "123")
  });
 
   // headers.append('Content-Type', 'application/json')

    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.cadastroUrl,JSON.stringify(usuario), options)
      .map(res => res.json());

  }

  public login(usuario: Usuario): Observable<any> {

    this.loginUrl + usuario.email + "&password=" + encodeURIComponent(usuario.senha);

    let headers = new Headers({
      "Authorization": "Basic " + btoa("cliente" + ':' + "123")
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.loginUrl + usuario.email + "&password=" +
      encodeURIComponent(usuario.senha), {}, options)
      .map(res => res.json());

  }

  public getUsuarioAtual(token: any) {

    let headers = new Headers({ 'Authorization': "Bearer " + token });

    let options = new RequestOptions({ headers: headers });
    this.requestOptions.headers.set('Authorization', "Bearer " + token);
    return this.http.get(this.userUrl, options)
      .map(res => res.json());
  }

  public getAccessToken(refreshToken){
    let headers = new Headers({
      "Authorization": "Basic " + btoa("cliente" + ':' + "123")
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.refreshUrl + refreshToken, {},  options)
      .map(res => res.json());

  }


}
