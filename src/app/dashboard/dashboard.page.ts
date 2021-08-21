import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';

import * as moment from 'moment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tournaments: any = []
  tournamentss: any = [1];
  token: any = ''

  constructor(private router: Router, private api: ApiService, private util: UtilService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {

    let options = {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
      formatter = new Intl.DateTimeFormat([], options);

    let sd = new Date('2021-02-02' + ' ' + "05:30:00")

    console.log(formatter.format(sd));



    // console.log(sd,'111111111111111111');

    this.util.presentLoading()
    this.api.Dashboard(this.token).subscribe((res: any) => {
      console.log(res, 'Dashboard data');
      this.tournaments = res;
      this.util.dismissLoading()
    }, (err: HttpErrorResponse) => {
      console.log(err);

    })

  }

  ionViewWillEnter() {

  }
  logout() {
    localStorage.clear();
    this.router.navigate(['home'])
  }

  board(item) {
    this.router.navigate(['chess-board', item.id])
  }

}
