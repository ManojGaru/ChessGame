import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentPopPageRoutingModule } from './tournament-pop-routing.module';

import { TournamentPopPage } from './tournament-pop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentPopPageRoutingModule
  ],
  declarations: [TournamentPopPage]
})
export class TournamentPopPageModule {}
