import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDetails } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'No-Auth': 'True',
  });
  
  constructor(private http: HttpClient, private router: Router) {
   
   }

  baseUrl: string = environment.baseAPIUrl + '/api/users';

  loginUser(user: UserDetails) {
    let options = { headers: this.headers };
    return this.http.post(this.baseUrl + "/login", user, options);
  }
 
   public isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    // Check whether the token is expired and return true or false
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(token);
   }


  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['login']);
  }
} 