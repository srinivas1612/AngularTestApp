import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'No-Auth': 'True',
  });

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseAPIUrl + '/api/users';

  getUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(this.baseUrl);
  }

  createUser(user: UserDetails) {
    let options = { headers: this.headers };
    return this.http.post(this.baseUrl, user, options);
  }
  
  getUserDetails(): Observable<UserDetails> {
    return this.http.get<UserDetails>(this.baseUrl + "/getuserdetails") ;
  }

  saveUser(user: UserDetails) {
    return this.http.post(this.baseUrl + "/saveuser", user);
  }

  changePassword(user: UserDetails) {
    return this.http.post(this.baseUrl + "/changepassword", user);
  }
} 