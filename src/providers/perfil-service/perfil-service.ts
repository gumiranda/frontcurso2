import { Observable } from 'rxjs/Observable';
import { Utils } from './../../entity/Utils';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PerfilServiceProvider {

    private perfilUrl: string;
    public handleError: any;

    constructor(public http: HttpClient) {
        this.perfilUrl = Utils.getUrlBackend() + "perfil/";
    }

    public getPerfis() {
        return this.http.get(this.perfilUrl);
    }


}