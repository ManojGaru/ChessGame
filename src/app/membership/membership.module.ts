import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembershipPageRoutingModule } from './membership-routing.module';

import { MembershipPage } from './membership.page';
import { Stripe } from '@ionic-native/stripe/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembershipPageRoutingModule
  ],
  providers:[Stripe],
  declarations: [MembershipPage]
})
export class MembershipPageModule {}
