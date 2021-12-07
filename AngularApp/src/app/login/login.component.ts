import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {Router} from "@angular/router";

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  invalidLogin: boolean = false;
  authRouteVals: number = 10;

  constructor(private router: Router,
              public loginService: AuthenticationService) {
  }

  ngOnInit() {
  }


  checkLogin(email: string, password: string) {
    this.authRouteVals = this.loginService.authenticate(email, password);
    if(this.authRouteVals == 10)
        setTimeout(() => {
          this.checkLogin(email,password);
        }, 2000);

      else if (this.authRouteVals == 0) {
        this.invalidLogin = true;
      } else {
        if (this.authRouteVals == 1)
          this.router.navigate(['student-view']);
        else if (this.authRouteVals == 2)
          this.router.navigate(['professor-view']);
        else if (this.authRouteVals == 3)
          this.router.navigate(['admin-view']);
      }
  }

}
