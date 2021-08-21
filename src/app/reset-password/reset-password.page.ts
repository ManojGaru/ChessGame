import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  isMailSent: any = false;
  old_password: any;
  password: any;
  password2: any;
  token: string;
  email: any;


  constructor(private router: Router, private api: ApiService, private util: UtilService) {
   // this.token = localStorage.getItem('token');
  }

  ngOnInit() {

  }

  sendMail() {
    this.util.presentLoading()
    let data = {
      email: this.email
    }
    this.api.sendmail(data).subscribe((res: any) => {
      console.log(res);
      this.util.presentToast('Mail sent successfully')
      this.isMailSent = true;
    }, err => {
      console.log(err);

    })

  }

  reset() {
    if ((this.token == '' || this.token == undefined) && (this.password == '' || this.password == undefined)) {
      this.util.presentAlert('please fill all the fields')
    } else {
      this.util.presentLoading();
      let data = {
        token: this.token,
        password: this.password
      }
      // console.log(data);

      this.api.resetPassword(this.token, data).subscribe((res) => {
        console.log(res);
        if (res) {
          this.router.navigate(['login'])
        }

      }, (err: HttpErrorResponse) => {
        console.log(err);

      })
    }

  }

}
