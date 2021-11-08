import { Component, OnInit } from '@angular/core';
import { AppUser } from './appUser';
import { AppUserService } from './appUser.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from "@angular/forms";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public appUsers: AppUser[] | undefined;
  public appUser: AppUser | undefined;
  public editAppUser: AppUser | undefined;
  public deleteAppUser: AppUser | undefined;
  title = "StudentInformationSystem";
  closeResult: string | undefined;

  constructor(private modalService: NgbModal, private appUserService: AppUserService) {}

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



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

  public onAddAppUser(addForm: NgForm): void {
    this.appUserService.addAppUser(addForm.value).subscribe(
      (response: AppUser) => {
        console.log(response);
        this.getAppUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAppUser(appUser: AppUser): void {
    this.appUserService.updateAppUser(appUser).subscribe(
      (response: AppUser) => {
        console.log(response);
        this.getAppUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAppUser(appUserId: number): void {
    this.appUserService.deleteAppUser(appUserId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAppUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchAppUsers(key: string): void {
    console.log(key);
    const results: AppUser[] = [];

    for (const appUser of this.appUsers!) {
      if (appUser.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || appUser.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || appUser.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || appUser.appUserRole.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(appUser);
      }
    }
    this.appUsers = results;
    if (results.length === 0 || !key) {
      this.getAppUsers();
    }
  }

  public onOpenModal(appUser: AppUser, mode: string): void {
    if (mode === 'add') {
    }
    if (mode === 'edit') {
      this.editAppUser = appUser;
    }
    if (mode === 'delete') {
      this.deleteAppUser = appUser;
    }
  }

}
