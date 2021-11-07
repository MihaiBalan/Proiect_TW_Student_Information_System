import { Component, OnInit } from '@angular/core';
import { AppUser } from './appUser';
import { AppUserService } from './appUser.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public appUsers: AppUser[] | undefined;
  public appUser: AppUser | undefined;

  constructor(private appUserService: AppUserService){}

  ngOnInit() {
    this.getAppUsers();
  }

  public getAppUsers(): void {
    this.appUserService.getAppUsers().subscribe(
      (response: AppUser[]) => {
        this.appUsers = response;
        console.log(this.appUsers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAppUser(id: number): void{
      this.appUserService.getAppUser(id).subscribe(
        (response: AppUser) =>{
          this.appUser = response;
          console.log(this.appUsers);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

}
