import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    if(request.headers.get('No-Auth') == "True"){
        return next.handle(request.clone());
    }

    if(this.auth.isAuthenticated()) {
        return next.handle(
            request.clone(
                { headers: request.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))}
            )
        );
    }
    else{
        this.router.navigate(['login']);
    }
  }
}