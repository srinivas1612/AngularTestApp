import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {

        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;

        const token = localStorage.getItem('userToken');

        // decode the token to get its payload
        const helper = new JwtHelperService();
        const tokenPayload = helper.decodeToken(token);
        if (!this.auth.isAuthenticated() || tokenPayload.role !== expectedRole) {
            this.auth.logout();
            return false;
        }
        return true;
    }
}