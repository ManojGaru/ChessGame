import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  tournaments: any = [1,2]
  token: string;
  user:any;

  constructor(private router: Router, private api: ApiService, private util: UtilService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
   
  }
  ionViewWillEnter(){
    this.util.presentLoading()
    this.api.UserDetails(this.token).subscribe((res: any) => {
      console.log(res);
      this.util.dismissLoading()
      this.user = res;
    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
  }

  users() {

    this.router.navigate(['users'])
  }
  profile() {
    this.router.navigate(['update-profile'])
  }
}
