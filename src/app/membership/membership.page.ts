import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
//import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ActionSheetController, Platform, PopoverController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import * as moment from 'moment';
import { Stripe } from '@ionic-native/stripe/ngx';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {
  tournamentUsers: any = [1, 2, 3]
  token: string;
  memberShips: any = [];
  balance: any;
  isHigher:any=false;
  constructor(
    private router: Router,
    private api: ApiService,
    private util: UtilService,
    private activatedRoute: ActivatedRoute,
    public popoverController: PopoverController,
    private stripe: Stripe,
    private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {

    this.api.membershipList(this.token).subscribe((res: any) => {
      console.log(res);

      this.memberShips = res
      this.getCurrentMembership()
    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
    

  }

  getCurrentMembership() {
    this.api.getMyMemberShip(this.token).subscribe((res: any) => {
      console.log(res);
      this.balance = res.balance


     let bbb =  this.memberShips.filter(e=>e.level === res.membership_level)[0]

     if(res.balance > bbb.price){
       this.balance = res.balance-bbb.price
     }

      switch (res.membership_level) {
        case 0:
          this.memberShips[0].active = true;
          this.memberShips[1].active = false
          this.memberShips[2].active = false;
          this.memberShips[3].active = false
          this.isHigher = false;
          break;
        case 1:
          this.memberShips[0].active = true;
          this.memberShips[1].active = true
          this.memberShips[2].active = false;
          this.memberShips[3].active = false
          this.isHigher = false;
          break;
        case 2:
          this.memberShips[0].active = true;
          this.memberShips[1].active = true
          this.memberShips[2].active = true;
          this.memberShips[3].active = false
          this.isHigher = false;
          break;
        case 3:
          this.memberShips.forEach(element => element.active = true);
          this.isHigher = true;
          break;
        default:
          break;
      }
      console.log(this.memberShips, '...................');


    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
  }
  payment(mem) {
    console.log(mem);
    
    // this.stripe.setPublishableKey('pk_test_51IKT8PHDo9SE7xB1KUWHPVT0udBoei0OBsFLfOkTzXDmNqEPxUgSJ0i66Z0vS3wxbYA6PYqIw9CFcTVN1KIv40TD00KjRVT1lL');

    // let card = {
    //   number: '4242424242424242',
    //   expMonth: 6,
    //   expYear: 2021,
    //   cvc: '220',
    // }
    // this.stripe.createCardToken(card)
    //   .then(token => {
    //     console.log(token)
    //     this.makePayment(token.id)
    //    // console.log(token)
    //   })
    //   .catch(error => console.error(error));
    if(mem.active === true){
      localStorage.setItem('amount',mem.price)
      this.router.navigate(['payment']);
    }else{
      alert('You already bought this membership')
    }
    

  }
  makePayment(token) {
    this.http
      .post('https://us-central1-shoppr-c97a7.cloudfunctions.net/payWithStripe', {
        token: token.id
      })
      .subscribe(data => {
        console.log(data);

      });
  }

}
