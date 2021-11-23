import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import {Router} from "@angular/router";

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  invalidLogin: boolean = false;
  password: string = "";
  email: string = "";

  constructor(private router: Router,
              public loginService: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin(email: string, password: string) {
    this.email = email;
    this.password = password;
    if (this.loginService.authenticate(this.email, this.password)
    ) {
      this.router.navigate([''])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }

}
