import { Injectable } from '@angular/core';
import {AppUserService} from "../appUser.service";
import {AppUser} from "../appUser";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public appUser: AppUser | undefined;
  public cryptedPassword: string = "";

  constructor(private appUserService: AppUserService, private router: Router){};

  public getLoggingInfo(email: string, password: string): void{
    this.appUserService.getAppUserByEmail(email).subscribe(
      (response: AppUser) =>{
        this.appUser = response;
        console.log(this.appUser);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    this.appUserService.cryptPassword(password).subscribe(
      (response: any) =>{
        this.cryptedPassword = response.toString();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  authenticate(username: string, password: string) {
    // @ts-ignore
    this.getLoggingInfo(username,password)
    // @ts-ignore
    if (username === this.appUser.email && this.cryptedPassword === this.appUser.password) {
      sessionStorage.setItem('username', username)
      // @ts-ignore
      if(this.appUser.appUserRole === "Student")
        {alert("Este");
        this.router.navigate(['/student-view']);}
      return true;
    } else {
      alert("No user");
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
