import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  isMailSent: any = false;
  old_password: any;
  password1:any;
  password2: any;
  token: string;
  email: any;


  constructor(private router: Router, private api: ApiService, private util: UtilService) {
   // this.token = localStorage.getItem('token');
  }

  ngOnInit() {

  }

 

  reset() {
    if ((this.old_password == '' || this.old_password == undefined) && (this.password1 == '' || this.password1 == undefined) && (this.password2 == '' || this.password2 == undefined)) {
      this.util.presentAlert('please fill all the fields')
    } else {
      this.util.presentLoading();
      let data = {
        old_password: this.old_password,
        password1: this.password1,
        password2: this.password2
      }
      // console.log(data);

      this.api.changePassword(this.token, data).subscribe((res) => {
        console.log(res);
        if (res) {
          this.router.navigate(['dashboard'])
        }

      }, (err: HttpErrorResponse) => {
        console.log(err);

      })
    }

  }
}
