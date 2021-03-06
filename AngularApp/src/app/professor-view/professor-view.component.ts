import {Component, OnInit} from '@angular/core';
import { AppUser } from '../appUser';
import { AppUserService } from '../appUser.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from "@angular/forms";
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './professor-view.component.html',
  styleUrls: ['../app.component.css'],
})

export class ProfessorViewComponent implements OnInit {
  public appUsers: AppUser[] | undefined;
  public appUser: AppUser | undefined;
  public editAppUser: AppUser | undefined;
  public deleteAppUser: AppUser | undefined;
  public viewAppUser: AppUser | undefined;
  public loggedInUser: Observable<AppUser> | undefined;
  closeResult: string | undefined;

  constructor(private modalService: NgbModal, private appUserService: AppUserService, public authenticationService: AuthenticationService) {}

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-title', size: 'lg'}).result.then((result) => {
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
    this.getAppUsers("Student");
    this.loggedInUser=this.appUserService.getAppUserByEmail(sessionStorage.getItem('username'));
  }

  public getAppUsers(role: string): void {
    this.appUserService.getAppUsers(role).subscribe(
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
    this.appUserService.getAppUserById(id).subscribe(
      (response: AppUser) =>{
        this.appUser = response;
        console.log(this.appUser);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAppUser(addForm: NgForm): void {
    this.appUserService.addAppUser(addForm.value);
    this.getAppUsers("Student");
    addForm.reset();
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  }

  public onUpdateAppUser(appUser: AppUser): void {
    this.appUserService.updateAppUser(appUser).subscribe(
      (response: AppUser) => {
        console.log(response);
        this.getAppUsers("Student");
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
        this.getAppUsers("Student");
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
        || appUser.phone.indexOf(key) !== -1)
        {
        results.push(appUser);
      }
    }
    this.appUsers = results;
    if (results.length === 0 || !key) {
      this.getAppUsers("Student");
    }
  }

  public onOpenModal(appUser: AppUser, mode: string): void {
    if (mode === 'view') {
      this.viewAppUser = appUser;
    }
    if (mode === 'edit') {
      this.editAppUser = appUser;
    }
    if (mode === 'delete') {
      this.deleteAppUser = appUser;
    }
  }

}
