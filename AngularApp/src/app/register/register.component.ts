import {Component } from '@angular/core';
import {document} from "ngx-bootstrap/utils";
import {AppUserService} from "../appUser.service";
import {AppUser} from "../appUser";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({templateUrl: 'register.component.html' })
export class RegisterComponent {

  constructor(private appUserService: AppUserService){
  }

  url: any;
  msg = "";
  public remover: boolean | undefined;

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


//checking if a professor
  check_for_professor(){
    this.remover = false;
    if(document.getElementById("professor_checkbox").checked == false){
      document.getElementById('reg_professor').setAttribute("disabled", "false");
      document.getElementById('reg_professor').setAttribute("placeholder","Are you professor? Check the box;");
    } else {
      document.getElementById('reg_professor').removeAttribute("disabled")
      document.getElementById('reg_professor').setAttribute("placeholder","Enter the proffesor code!");
      //checking if the password is correct
      if(document.getElementById('reg_professor').value=="password"){
        this.remover = true;}
    }
  }


  onClickSubmit(data: any) {

    let appUserRole: string;
    if (this.remover) { // @ts-ignore
      appUserRole = "Professor";
    } else { // @ts-ignore
      appUserRole = "Student";
    }


    const appUser: AppUser = {
      // @ts-ignore
      id: null,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      appUserRole: appUserRole,
      locked: false,
      enabled: false,
      birthday: data.birthday,
      county: data.county,
      college: data.college,
      phone: data.phone,
      pictureURL: data.pictureURL,
      studyType: data.studyType,
      specialization: data.specialization,
      serialNumber: data.serialNumber,
      tax: data.tax,
      cnp: data.cnp,
      ci: data.ci,
      year: data.year,
      gender: data.gender
    };

    this.appUserService.addAppUser(appUser);
  }
}
