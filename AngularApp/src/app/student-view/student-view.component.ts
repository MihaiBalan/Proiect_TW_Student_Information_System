import {Component, OnInit} from '@angular/core';
import {AppUser} from "../appUser";
import {AppUserService} from "../appUser.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({  selector: 'app-root',
  templateUrl: './student-view.component.html',
  styleUrls: ['../app.component.css'], })
export class StudentViewComponent implements OnInit {
  public appUser: AppUser | undefined;

  constructor(private appUserService: AppUserService) {}

  ngOnInit() {
    // @ts-ignore
    //TODO: Get the current logged in user
    this.getAppUser(2);
  }

  public getAppUser(id: number): void{
      this.appUserService.getAppUser(id).subscribe(
        (response: AppUser) =>{
          this.appUser = response;
          console.log(this.appUser);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );}




}
