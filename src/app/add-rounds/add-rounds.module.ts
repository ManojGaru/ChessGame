import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRoundsPageRoutingModule } from './add-rounds-routing.module';

import { AddRoundsPage } from './add-rounds.page';
import { SelectDropDownModule } from 'ngx-select-dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddRoundsPageRoutingModule,
    SelectDropDownModule
  ],
  declarations: [AddRoundsPage]
})
export class AddRoundsPageModule {}
