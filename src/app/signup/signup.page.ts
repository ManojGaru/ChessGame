import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: any;
  firstname: any;
  lastname: any;
  email: any;
  password: any;
  confirmpassword: any
  responseError: any;
  constructor(public api: ApiService, public util: UtilService, private router: Router) {

    // this.api.getAnonymousData('').subscribe((res)=>{
    //   console.log(res);

    // },err=>{
    //   console.log(err);

    // })
  }

  ngOnInit() {
  }
  getUserName() {
    console.log(this.username, 'ooooooooooooooooooo');

  }
  submit() {

    console.log(this.username, 'ooooooooooooooooooo');
    if ((this.firstname && this.firstname.length > 0) && (this.username && this.username.length > 0) && (this.lastname && this.lastname.length > 0) && (this.email && this.email.length > 0) && (this.password && this.password.length > 0) && (this.confirmpassword && this.confirmpassword.length > 0)) {
      this.util.presentLoading()
      let form = new FormData();
      form.append('username', this.username)
      form.append('first_name', this.firstname)
      form.append('last_name', this.lastname)
      form.append('email', this.email)
      form.append('password1', this.password)
      form.append('password2', this.confirmpassword)
      console.log(form.get('password2'), 'opopopopoopopopop');
      this.api.register(form).subscribe((data: any) => {
        console.log(data);
        if (data.error) {
          this.util.presentAlert(data.error)
        } else {
          this.util.presentToast('Registration Success')
          this.router.navigate(['login']);
        }

      }, (err: HttpErrorResponse) => {
        console.log(err.error);
        this.util.dismissLoading();
        this.responseError = err.error
      })
    } else {
      this.util.presentAlert('please fill all the field')
    }

  }
}
