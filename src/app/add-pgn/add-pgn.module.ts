import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPGNPageRoutingModule } from './add-pgn-routing.module';

import { AddPGNPage } from './add-pgn.page';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPGNPageRoutingModule,
    SelectDropDownModule
  ],
  declarations: [AddPGNPage]
})
export class AddPGNPageModule {}
