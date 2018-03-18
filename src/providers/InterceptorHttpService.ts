import { LoginServiceProvider } from './login-service/login-service';
import { CookieService } from 'angular2-cookie/core';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';


@Injectable()
export class InterceptorHttpService implements HttpInterceptor {

    constructor(private cookieService: CookieService, private loginService: LoginServiceProvider) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse |
        HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(
            req.clone({
                setHeaders:
                    { Authorization: 'Bearer ' + this.cookieService.get("accessToken") }
            })).catch(error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 401:
                            return this.getAccessToken(req, next);
                        case 0:
                            return this.getAccessToken(req, next);    
                    }
                    Observable.throw(error);
                }else{
                    Observable.throw(error);
                }
            }

            );
    }

    private getAccessToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return this.loginService.getAccessToken(this.cookieService.get("refreshToken")).switchMap(
            resp => {
                this.cookieService.put("accessToken", resp.access_token);
                return next.handle(req.clone({
                    setHeaders:
                        { Authorization: 'Bearer ' + this.cookieService.get("accessToken") }
                }));
            }
        )
    }

}