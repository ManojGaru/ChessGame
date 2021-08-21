import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';
import { Stripe } from '@ionic-native/stripe/ngx';
import { HttpClient } from "@angular/common/http";

declare var stripCheckout;
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  tournamentUsers: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  token: string;
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

    }, (err: HttpErrorResponse) => {
      console.log(err);

    })
  }

  payment() {
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
    this.router.navigate(['payment-stripe']);

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
