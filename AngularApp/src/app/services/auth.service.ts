import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn())
      {const userRole = sessionStorage.getItem('role');
        if(!(route.data['roles'] && route.data['roles'].indexOf(userRole) === -1))
          return true;}
    this.authService.logOut();
    this.router.navigate(['login']);
    return false;

  }

}
