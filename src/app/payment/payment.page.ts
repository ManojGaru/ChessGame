import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stripe } from '@ionic-native/stripe/ngx';
import { ApiService } from '../api.service';
import { UtilService } from '../util.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  email: any;
  exp: any;
  card_number: any;
  cvv: any;
  amount: any;
  name: any;
  token: string;
  expy:any;

  constructor(private router: Router, private stripe: Stripe, private api: ApiService,private util:UtilService) {
    this.token = localStorage.getItem('token');
    this.stripe.setPublishableKey('pk_test_51IyYnbH85QdelsK4O7uWVjTMQK7Ne1EUcWXXtgiANq1WEdwuwzKXQgllWV8RiIljuEesv0Gxt3LVrXyoOHCKPBfX00x9ZseBMq');

  }

  ngOnInit() {
    this.amount = parseFloat(localStorage.getItem('amount'))
  }

  checkout() {
    //  this.router.navigate(['checkout'])
    let card = {
      number: this.card_number,
      expMonth: this.exp,
      expYear: this.expy,
      cvc: this.cvv.toString()
    }

    console.log(card);

this.util.presentLoading()
     this.stripe.createCardToken(card)
        .then(token => {
          console.log(token.id)
          if(token.id){
            let data = {
              amount:this.amount,
              token: token.id

            }

            console.log(data,'....................');

            this.api.buyMembership(this.token,data).subscribe(res=>{
              console.log(res);
              this.router.navigate(['membership'])
              this.util.dismissLoading()
            },(err:HttpErrorResponse)=>{
              console.log(err);
              alert(err.message)
              this.util.dismissLoading()
            })
          }
        })
        .catch(error => {
          this.util.dismissLoading()
          console.error(error)
        });
  }

}
