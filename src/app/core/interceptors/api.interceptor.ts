import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only intercept requests to our API
    if (request.url.startsWith(environment.apiUrl)) {
      const apiReq = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
      });
      return next.handle(apiReq);
    }
    return next.handle(request);
  }
}