import {Injectable} from '@angular/core';
import {AppUserService} from "../appUser.service";
import {AppUser} from "../appUser";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public appUser: AppUser | undefined;
  public valueRoute: number = 10;

  // public cryptedPassword: string = "";

  constructor(private appUserService: AppUserService) {
  };

   public getLoggingInfo(email: string, password: string) {
     this.appUserService.getAppUserByEmail(email).subscribe(
       (response: AppUser) => {
         this.appUser= response;
         this.valueRoute = 0;
         console.log(response);
       },(error: HttpErrorResponse) => {
        console.log(error.message);
       }
       );

     /* this.appUserService.cryptPassword(password).subscribe(
       (response: any) =>{
         this.cryptedPassword = response.toString();
       },
       (error: HttpErrorResponse) => {
         alert(error.message);
       }
     ); */
   }

  authenticate(email: string, password: string) {
     this.getLoggingInfo(email,password);
     if(this.valueRoute == 10)
       setTimeout(() => {
         this.authenticate(email, password);
       }, 2000);

     else{
     if (password === this.appUser?.password) {
        if (this.appUser?.enabled && !this.appUser?.locked) {
          sessionStorage.setItem('username', this.appUser?.email);
          sessionStorage.setItem('role', this.appUser?.appUserRole);
          if (this.appUser?.appUserRole === "Student")
            this.valueRoute = 1;
          else if(this.appUser?.appUserRole === "Professor")
            this.valueRoute = 2;
          else if (this.appUser?.appUserRole === "Admin")
            this.valueRoute = 3;
        } else {
          alert("This account is locked or email was not confirmed");
          this.valueRoute = 0;
        }
      } else {
       alert("This user is not found");
       this.valueRoute = 0;
     }}
    return this.valueRoute;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
  }
}
