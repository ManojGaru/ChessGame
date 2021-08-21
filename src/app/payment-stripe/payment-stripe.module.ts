import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentStripePageRoutingModule } from './payment-stripe-routing.module';

import { PaymentStripePage } from './payment-stripe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentStripePageRoutingModule
  ],
  declarations: [PaymentStripePage]
})
export class PaymentStripePageModule {}
