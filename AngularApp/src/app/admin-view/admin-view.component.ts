import {Component, OnInit} from '@angular/core';
import { AppUser } from '../appUser';
import { AppUserService } from '../appUser.service';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './admin-view.component.html',
  styleUrls: ['../app.component.css'],
})

export class AdminViewComponent implements OnInit {
  public appUserStudents: AppUser[] | undefined;
  public appUserProfessors: AppUser[] | undefined;
  public appUser: AppUser | undefined;
  public editAppUser: AppUser | undefined;
  public deleteAppUser: AppUser | undefined;
  public viewAppUser: AppUser | undefined;
  closeResult: string | undefined;
  public loggedInUser: Observable<AppUser> | undefined;

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
    this.getAppUsers("Professor");
    this.getAppUsers("Student");
    this.loggedInUser=this.appUserService.getAppUserByEmail(sessionStorage.getItem('username'));
  }

  public getAppUsers(role: string): void {
    this.appUserService.getAppUsers(role).subscribe(
      (response: AppUser[]) => {
        if(role=="Student")
          {this.appUserStudents = response;
          console.log(this.appUserStudents);}
        else if(role=="Professor")
          {this.appUserProfessors = response;
          console.log(this.appUserProfessors);}
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

  public onUpdateAppUser(appUser: AppUser | undefined): void {
    this.appUserService.updateAppUser(appUser).subscribe(
      (response: AppUser) => {
        console.log(response);
        this.getAppUsers("Professor");
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
        this.getAppUsers("Professor");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchAppUsers(role: string, key: string): void {
    console.log(key);
    const results: AppUser[] = [];

    if(role="Professor"){
      for (const appUser of this.appUserProfessors!) {
        if (appUser.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || appUser.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || appUser.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || appUser.phone.indexOf(key) !== -1)
        {
          results.push(appUser);
        }
      }
      this.appUserProfessors = results;
      if (results.length === 0 || !key) {
        this.getAppUsers("Professor");
      }
    }
    else if(role="Student"){
      for (const appUser of this.appUserStudents!) {
        if (appUser.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || appUser.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || appUser.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || appUser.phone.indexOf(key) !== -1)
        {
          results.push(appUser);
        }
      }
      this.appUserStudents = results;
      if (results.length === 0 || !key) {
        this.getAppUsers("Student");
      }
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


  url: any;
  msg = "";

  selectFile(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }

}
