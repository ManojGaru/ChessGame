import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: any = '';
  password: any = '';

  constructor(private router: Router, private api: ApiService, private util: UtilService) { }

  ngOnInit() {

  }

  signin() {
    this.util.presentLoading()
    if (this.username === '' || this.password === '') {
      console.log('Invalid login credentials');

    } else {
      let data = new FormData();
      data.append('username', this.username);
      data.append('password', this.password);
      this.api.login(data).subscribe((res: any) => {
        console.log(res);
        if (res.user.length === 0) {
          console.log(res.message);
          this.util.dismissLoading()
          this.util.presentAlert(res.message)
        } else {
          this.util.presentToast('Logged In Successfully')
          localStorage.setItem('token', res.key);
          localStorage.setItem('user', JSON.stringify(res.user))
          localStorage.setItem('loggedIn', 'true');
          this.util.dismissLoading()
          this.router.navigate(['dashboard'])
        }


      }, err => {
        console.log(err);
        this.util.dismissLoading()
      })


    }
  }

  signUp() {
    this.router.navigate(['signup'])
  }

  resetPassword() {
    this.router.navigate(['reset-password'])

  }

}
