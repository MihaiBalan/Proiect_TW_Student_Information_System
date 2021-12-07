import {Component, OnInit} from '@angular/core';
import {AppUser} from "../appUser";
import {AppUserService} from "../appUser.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "../services/authentication.service";

@Component({  selector: 'app-root',
  templateUrl: './student-view.component.html',
  styleUrls: ['../app.component.css'], })
export class StudentViewComponent implements OnInit {
  public appUser: AppUser | undefined;

  constructor(private appUserService: AppUserService, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.getAppUserByEmail(this.authenticationService.appUser?.email);
  }

  public getAppUserByEmail(email: string | undefined): void{
      if(email!=null)
      {this.appUserService.getAppUserByEmail(email).subscribe(
        (response: AppUser) =>{
          this.appUser = response;
          console.log(this.appUser);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );}}

}
